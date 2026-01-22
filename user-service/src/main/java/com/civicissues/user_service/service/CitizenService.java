package com.civicissues.user_service.service;


import com.civicissues.user_service.dtos.CitizenResponseDTO;
import com.civicissues.user_service.dtos.UpdateCitizenDTO;
import jakarta.validation.Valid;

public interface CitizenService {

    CitizenResponseDTO getCitizenById(Long id);

    CitizenResponseDTO updateCitizen(Long id, @Valid UpdateCitizenDTO dto);

    void deleteCitizen(Long id);
}
