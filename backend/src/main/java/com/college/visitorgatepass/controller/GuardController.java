package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.GuardVerificationDTO;
import com.college.visitorgatepass.dto.VerificationResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.EntryLog;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.entity.Guard;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.repository.EntryLogRepository;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.GuardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guard")
@RequiredArgsConstructor
public class GuardController {

    private final GatePassRepository gatePassRepository;

    private final EntryLogRepository entryLogRepository;
    private final GuardRepository guardRepository;

    @PostMapping("/verify")
    public ResponseEntity<VerificationResponse> verifyPass(@RequestBody GuardVerificationDTO request) {
        String token = request.getToken();

        // 1. Try to find GatePass
        Optional<GatePass> optionalPass = gatePassRepository.findBySecureToken(token);
        if (optionalPass.isPresent()) {
            return verifyGatePass(optionalPass.get());
        }



        return ResponseEntity.ok(VerificationResponse.builder()
                .valid(false)
                .message("Invalid pass — token not found")
                .build());
    }

    private ResponseEntity<VerificationResponse> verifyGatePass(GatePass gatePass) {
        boolean alreadyCheckedIn = entryLogRepository
                .findByGatePassIdAndCheckOutTimeIsNull(gatePass.getId())
                .isPresent();

        if (gatePass.getStatus() == PassStatus.REJECTED) return okResponse(gatePass, false, "Pass has been REJECTED", alreadyCheckedIn);
        if (gatePass.getStatus() == PassStatus.EXPIRED) return okResponse(gatePass, false, "Pass has EXPIRED", alreadyCheckedIn);
        if (gatePass.getStatus() == PassStatus.CHECKED_OUT) return okResponse(gatePass, false, "Visit already completed (CHECKED OUT)", alreadyCheckedIn);
        if (gatePass.getStatus() == PassStatus.PENDING) return okResponse(gatePass, false, "Pass is still PENDING approval", alreadyCheckedIn);
        if (gatePass.getStatus() == PassStatus.CHECKED_IN) return okResponse(gatePass, false, "Visitor is already CHECKED IN", true);

        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        LocalDate passDate = gatePass.getValidFrom().toLocalDate();

        if (today.isBefore(passDate)) return okResponse(gatePass, false, "Pass is not valid yet — valid from " + passDate, alreadyCheckedIn);
        if (today.isAfter(passDate)) return okResponse(gatePass, false, "Pass has expired — was valid on " + passDate, alreadyCheckedIn);

        if (now.isBefore(gatePass.getValidFrom())) return okResponse(gatePass, false, "NOT YET VALID — valid from " + gatePass.getValidFrom().toLocalTime(), alreadyCheckedIn);
        if (now.isAfter(gatePass.getValidTo())) return okResponse(gatePass, false, "EXPIRED — valid until " + gatePass.getValidTo().toLocalTime(), alreadyCheckedIn);

        if (alreadyCheckedIn) return okResponse(gatePass, false, "Visitor is already checked in", true);

        return okResponse(gatePass, true, "✓ Pass is VALID — Entry allowed", false);
    }



    @PostMapping("/check-in")
    public ResponseEntity<Map<String, Object>> checkIn(@RequestBody GuardVerificationDTO request, Authentication authentication) {
        String token = request.getToken();
        Guard guard = getGuard(authentication);

        Optional<GatePass> optionalPass = gatePassRepository.findBySecureToken(token);
        if (optionalPass.isPresent()) {
            return checkInGatePass(optionalPass.get(), request.getEntryPoint(), guard);
        }



        throw new ResourceNotFoundException("Pass not found for token");
    }

    private ResponseEntity<Map<String, Object>> checkInGatePass(GatePass gatePass, String entryPoint, Guard guard) {
        if (entryLogRepository.findByGatePassIdAndCheckOutTimeIsNull(gatePass.getId()).isPresent()) {
            return badRequest("Visitor is already checked in");
        }
        if (gatePass.getStatus() != PassStatus.APPROVED) {
            return badRequest("Pass status is " + gatePass.getStatus() + " — cannot check in");
        }

        EntryLog entryLog = EntryLog.builder().gatePass(gatePass).checkInTime(LocalDateTime.now())
                .entryPoint(entryPoint != null ? entryPoint : "Main Gate").loggedBy(guard).build();
        entryLogRepository.save(entryLog);

        gatePass.setStatus(PassStatus.CHECKED_IN);
        gatePassRepository.save(gatePass);

        return successResponse("Check-in recorded successfully", entryLog.getCheckInTime(), gatePass.getVisitor().getName());
    }



    @PostMapping("/check-out")
    public ResponseEntity<Map<String, Object>> checkOut(@RequestBody GuardVerificationDTO request) {
        String token = request.getToken();

        Optional<GatePass> optionalPass = gatePassRepository.findBySecureToken(token);
        if (optionalPass.isPresent()) {
            return checkOutGatePass(optionalPass.get());
        }



        throw new ResourceNotFoundException("Pass not found for token");
    }

    private ResponseEntity<Map<String, Object>> checkOutGatePass(GatePass gatePass) {
        EntryLog entryLog = entryLogRepository.findByGatePassIdAndCheckOutTimeIsNull(gatePass.getId()).orElse(null);
        if (entryLog == null) return badRequest("No active check-in found for this pass");

        entryLog.setCheckOutTime(LocalDateTime.now());
        entryLogRepository.save(entryLog);
        gatePass.setStatus(PassStatus.CHECKED_OUT);
        gatePassRepository.save(gatePass);

        return successResponse("Check-out recorded successfully", entryLog.getCheckOutTime(), gatePass.getVisitor().getName());
    }



    @GetMapping("/active-visitors")
    public ResponseEntity<List<Map<String, Object>>> getActiveVisitors() {
        List<EntryLog> activeEntries = entryLogRepository.findByCheckOutTimeIsNull();
        
        List<Map<String, Object>> result = activeEntries.stream().map(entry -> {
            Map<String, Object> map = new HashMap<>();
            map.put("entryLogId", entry.getId());
            map.put("checkInTime", entry.getCheckInTime().toString());
            map.put("entryPoint", entry.getEntryPoint());
            
            if (entry.getGatePass() != null) {
                GatePass pass = entry.getGatePass();
                map.put("type", "VISITOR");
                map.put("gatePassId", pass.getId());
                map.put("visitorName", pass.getVisitor().getName());
                map.put("visitorPhone", pass.getVisitor().getPhone());
                map.put("hostName", pass.getHost().getName());
                map.put("purpose", pass.getPurpose());
                map.put("secureToken", pass.getSecureToken());
            }
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // --- Helper Methods ---

    private Guard getGuard(Authentication authentication) {
        String email = authentication.getName();
        return (Guard) guardRepository.findAll().stream()
                .filter(g -> g.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Guard not found"));
    }

    private ResponseEntity<Map<String, Object>> badRequest(String message) {
        Map<String, Object> map = new HashMap<>();
        map.put("success", false);
        map.put("message", message);
        return ResponseEntity.badRequest().body(map);
    }

    private ResponseEntity<Map<String, Object>> successResponse(String message, LocalDateTime time, String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        map.put("message", message);
        map.put("time", time.toString());
        map.put("visitorName", name);
        return ResponseEntity.ok(map);
    }

    private ResponseEntity<VerificationResponse> okResponse(GatePass gatePass, boolean valid, String message, boolean checkedIn) {
        return ResponseEntity.ok(VerificationResponse.builder()
                .valid(valid).message(message).gatePassId(gatePass.getId())
                .visitorName(gatePass.getVisitor().getName()).visitorPhone(gatePass.getVisitor().getPhone())
                .hostName(gatePass.getHost().getName()).purpose(gatePass.getPurpose())
                .validFrom(gatePass.getValidFrom()).validTo(gatePass.getValidTo())
                .status(gatePass.getStatus()).alreadyCheckedIn(checkedIn).build());
    }


}
