package com.civicissues.user_service.controller;

import com.civicissues.user_service.dtos.CitizenResponseDTO;
import com.civicissues.user_service.dtos.UpdateCitizenDTO;
import com.civicissues.user_service.service.impl.CitizenServiceImpl;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenServiceImpl citizenService;

    public CitizenController(CitizenServiceImpl citizenService) {
        this.citizenService = citizenService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CITIZEN')")
    public ResponseEntity<CitizenResponseDTO> getCitizen(@PathVariable Long id) {
        return ResponseEntity.ok(citizenService.getCitizenById(id));
    }

    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<CitizenResponseDTO> updateCitizen(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCitizenDTO dto) {

        return ResponseEntity.ok(citizenService.updateCitizen(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCitizen(@PathVariable Long id) {
        citizenService.deleteCitizen(id);
        return ResponseEntity.noContent().build();
    }
}
