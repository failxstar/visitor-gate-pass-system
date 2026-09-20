package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.HostRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GatePassServiceImplTest {

    @Mock
    private GatePassRepository gatePassRepository;

    @Mock
    private VisitorRepository visitorRepository;

    @Mock
    private HostRepository hostRepository;

    @InjectMocks
    private GatePassServiceImpl gatePassService;

    @Test
    void createGatePass_shouldCreatePendingPass() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .phone("9876543210")
                .email("visitor@test.com")
                .build();

        Host host = Host.builder()
                .id(2L)
                .name("Test Host")
                .email("host@test.com")
                .build();

        GatePassRequest request = GatePassRequest.builder()
                .visitorId(1L)
                .hostId(2L)
                .purpose("Meeting")
                .build();

        GatePass savedPass = GatePass.builder()
                .id(100L)
                .visitor(visitor)
                .host(host)
                .purpose("Meeting")
                .status(PassStatus.PENDING)
                .secureToken("test-token")
                .build();

        when(visitorRepository.findById(1L)).thenReturn(Optional.of(visitor));
        when(hostRepository.findById(2L)).thenReturn(Optional.of(host));
        when(gatePassRepository.save(any(GatePass.class))).thenReturn(savedPass);

        GatePassResponse result = gatePassService.createGatePass(request);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Test Visitor", result.getVisitorName());
        assertEquals("Test Host", result.getHostName());
        assertEquals("Meeting", result.getPurpose());
        assertEquals(PassStatus.PENDING, result.getStatus());
        assertNotNull(result.getSecureToken());

        verify(visitorRepository).findById(1L);
        verify(hostRepository).findById(2L);
        verify(gatePassRepository).save(any(GatePass.class));
    }

    @Test
    void createGatePass_shouldThrowWhenVisitorDoesNotExist() {
        GatePassRequest request = GatePassRequest.builder()
                .visitorId(99L)
                .hostId(2L)
                .purpose("Meeting")
                .build();

        when(visitorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> gatePassService.createGatePass(request)
        );

        verify(visitorRepository).findById(99L);
        verify(hostRepository, never()).findById(anyLong());
        verify(gatePassRepository, never()).save(any(GatePass.class));
    }

    @Test
    void getGatePassById_shouldReturnPass() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .build();

        Host host = Host.builder()
                .id(2L)
                .name("Test Host")
                .build();

        GatePass pass = GatePass.builder()
                .id(100L)
                .visitor(visitor)
                .host(host)
                .purpose("Meeting")
                .status(PassStatus.PENDING)
                .secureToken("token-100")
                .build();

        when(gatePassRepository.findById(100L)).thenReturn(Optional.of(pass));

        GatePassResponse result = gatePassService.getGatePassById(100L);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Test Visitor", result.getVisitorName());
        assertEquals("Test Host", result.getHostName());

        verify(gatePassRepository).findById(100L);
    }

    @Test
    void getGatePassById_shouldThrowWhenPassDoesNotExist() {
        when(gatePassRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> gatePassService.getGatePassById(999L)
        );

        verify(gatePassRepository).findById(999L);
    }

    @Test
    void updatePassStatus_shouldUpdateStatus() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .build();

        Host host = Host.builder()
                .id(2L)
                .name("Test Host")
                .build();

        GatePass pass = GatePass.builder()
                .id(100L)
                .visitor(visitor)
                .host(host)
                .purpose("Meeting")
                .status(PassStatus.PENDING)
                .secureToken("token-100")
                .build();

        when(gatePassRepository.findById(100L)).thenReturn(Optional.of(pass));
        when(gatePassRepository.save(pass)).thenReturn(pass);

        GatePassResponse result =
                gatePassService.updatePassStatus(100L, PassStatus.APPROVED);

        assertEquals(PassStatus.APPROVED, result.getStatus());
        verify(gatePassRepository).findById(100L);
        verify(gatePassRepository).save(pass);
    }

    @Test
    void getGatePassByToken_shouldReturnPass() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .build();

        Host host = Host.builder()
                .id(2L)
                .name("Test Host")
                .build();

        GatePass pass = GatePass.builder()
                .id(100L)
                .visitor(visitor)
                .host(host)
                .purpose("Meeting")
                .status(PassStatus.APPROVED)
                .secureToken("secure-token")
                .build();

        when(gatePassRepository.findBySecureToken("secure-token"))
                .thenReturn(Optional.of(pass));

        GatePassResponse result =
                gatePassService.getGatePassByToken("secure-token");

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("secure-token", result.getSecureToken());
        assertEquals(PassStatus.APPROVED, result.getStatus());

        verify(gatePassRepository).findBySecureToken("secure-token");
    }

    @Test
    void getGatePassByToken_shouldThrowWhenTokenIsInvalid() {
        when(gatePassRepository.findBySecureToken("invalid-token"))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> gatePassService.getGatePassByToken("invalid-token")
        );

        verify(gatePassRepository).findBySecureToken("invalid-token");
    }
}
