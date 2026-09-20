package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.VisitorRequestDTO;
import com.college.visitorgatepass.dto.VisitorResponseDTO;
import com.college.visitorgatepass.model.entity.Visitor;
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
class VisitorServiceImplTest {

    @Mock
    private VisitorRepository visitorRepository;

    @InjectMocks
    private VisitorServiceImpl visitorService;

    @Test
    void createVisitor_shouldSaveAndReturnVisitor() {
        VisitorRequestDTO request = VisitorRequestDTO.builder()
                .name("Test Visitor")
                .phone("9876543210")
                .email("visitor@test.com")
                .idProofNumber("ID12345")
                .photoUrl("photo.jpg")
                .build();

        Visitor savedVisitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .phone("9876543210")
                .email("visitor@test.com")
                .idProofNumber("ID12345")
                .photoUrl("photo.jpg")
                .build();

        when(visitorRepository.existsByPhone("9876543210")).thenReturn(false);
        when(visitorRepository.save(any(Visitor.class))).thenReturn(savedVisitor);

        VisitorResponseDTO result = visitorService.createVisitor(request);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test Visitor", result.getName());
        assertEquals("9876543210", result.getPhone());

        verify(visitorRepository).existsByPhone("9876543210");
        verify(visitorRepository).save(any(Visitor.class));
    }

    @Test
    void createVisitor_shouldRejectDuplicatePhone() {
        VisitorRequestDTO request = VisitorRequestDTO.builder()
                .name("Duplicate Visitor")
                .phone("9876543210")
                .email("duplicate@test.com")
                .build();

        when(visitorRepository.existsByPhone("9876543210")).thenReturn(true);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> visitorService.createVisitor(request)
        );

        assertEquals(
                "Visitor with this phone number already exists.",
                exception.getMessage()
        );

        verify(visitorRepository).existsByPhone("9876543210");
        verify(visitorRepository, never()).save(any(Visitor.class));
    }

    @Test
    void getAllVisitors_shouldReturnMappedVisitors() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .phone("9876543210")
                .email("visitor@test.com")
                .build();

        when(visitorRepository.findAll()).thenReturn(List.of(visitor));

        List<VisitorResponseDTO> result = visitorService.getAllVisitors();

        assertEquals(1, result.size());
        assertEquals("Test Visitor", result.get(0).getName());
        assertEquals("9876543210", result.get(0).getPhone());

        verify(visitorRepository).findAll();
    }

    @Test
    void getVisitorById_shouldReturnVisitor() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .phone("9876543210")
                .build();

        when(visitorRepository.findById(1L)).thenReturn(Optional.of(visitor));

        VisitorResponseDTO result = visitorService.getVisitorById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test Visitor", result.getName());

        verify(visitorRepository).findById(1L);
    }

    @Test
    void getVisitorById_shouldThrowWhenVisitorDoesNotExist() {
        when(visitorRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> visitorService.getVisitorById(99L)
        );

        assertEquals("Visitor not found", exception.getMessage());

        verify(visitorRepository).findById(99L);
    }
}
