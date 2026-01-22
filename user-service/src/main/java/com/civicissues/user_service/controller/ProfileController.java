package com.civicissues.user_service.controller;

import com.civicissues.user_service.dtos.CitizenResponseDTO;
import com.civicissues.user_service.dtos.UpdateCitizenDTO;
import com.civicissues.user_service.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // ================= GET PROFILE =================
    @GetMapping("/{citizenId}")
    public ResponseEntity<CitizenResponseDTO> getProfile(
            @PathVariable Long citizenId) {

        CitizenResponseDTO response =
                profileService.getProfileById(citizenId);

        return ResponseEntity.ok(response);
    }

    // ================= UPDATE PROFILE =================
    @PutMapping("/{citizenId}")
    public ResponseEntity<CitizenResponseDTO> updateProfile(
            @PathVariable Long citizenId,
            @Valid @RequestBody UpdateCitizenDTO dto) {

        CitizenResponseDTO response =
                profileService.updateProfile(citizenId, dto);

        return ResponseEntity.ok(response);
    }

    // ================= DELETE PROFILE =================
    @DeleteMapping("/{citizenId}")
    public ResponseEntity<Void> deleteProfile(
            @PathVariable Long citizenId) {

        profileService.deleteProfile(citizenId);

        return ResponseEntity.noContent().build();
    }
}
