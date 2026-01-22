package com.civicissues.user_service.service.impl;

import com.civicissues.user_service.dtos.CitizenResponseDTO;
import com.civicissues.user_service.dtos.UpdateCitizenDTO;
import com.civicissues.user_service.entities.Citizen;
import com.civicissues.user_service.exceptions.ResourceNotFoundException;
import com.civicissues.user_service.repository.CitizenRepository;
import com.civicissues.user_service.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final CitizenRepository citizenRepository;
    private final ModelMapper modelMapper;

    @Override
    public CitizenResponseDTO getProfileById(Long citizenId) {

        Citizen citizen = citizenRepository.findById(citizenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Citizen not found with id: " + citizenId));

        return modelMapper.map(citizen, CitizenResponseDTO.class);
    }

    @Override
    public CitizenResponseDTO updateProfile(Long citizenId, @Valid UpdateCitizenDTO dto) {

        Citizen citizen = citizenRepository.findById(citizenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Citizen not found with id: " + citizenId));

        // update allowed fields only
        citizen.setName(dto.getName());
        citizen.setPhone(dto.getPhone());
        citizen.setAddress(dto.getAddress());

        Citizen updatedCitizen = citizenRepository.save(citizen);

        return modelMapper.map(updatedCitizen, CitizenResponseDTO.class);
    }

    @Override
    public void deleteProfile(Long citizenId) {

        Citizen citizen = citizenRepository.findById(citizenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Citizen not found with id: " + citizenId));

        citizenRepository.delete(citizen);
    }
}
