package com.civicissues.user_service.service;

import com.civicissues.user_service.dtos.CitizenResponseDTO;
import com.civicissues.user_service.dtos.UpdateCitizenDTO;
import jakarta.validation.Valid;

public interface ProfileService {

    CitizenResponseDTO getProfileById(Long citizenId);

    CitizenResponseDTO updateProfile(Long citizenId, @Valid UpdateCitizenDTO dto);

    void deleteProfile(Long citizenId);
}
