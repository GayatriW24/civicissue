package com.civicissues.user_service.service.impl;

import com.civicissues.user_service.dtos.AdminResponseDTO;
import com.civicissues.user_service.entities.Admin;
import com.civicissues.user_service.exc_handler.GlobalExceptionHandler;
import com.civicissues.user_service.exceptions.*;
import com.civicissues.user_service.repository.AdminRepository;
import com.civicissues.user_service.service.AdminService;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final ModelMapper modelMapper;

    public AdminServiceImpl(AdminRepository adminRepository,
                            ModelMapper modelMapper) {
        this.adminRepository = adminRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<AdminResponseDTO> getAllAdmins() {

        return adminRepository.findAll()
                .stream()
                .map(admin -> modelMapper.map(admin, AdminResponseDTO.class))
                .collect(Collectors.toList());
    }
    

    @Override
    public AdminResponseDTO getAdminById(Long id) {

        Admin admin = adminRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admin not found with id: " + id));

        return modelMapper.map(admin, AdminResponseDTO.class);
    }

    @Override
    public void deleteAdmin(Long id) {

        Admin admin = adminRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admin not found with id: " + id));

        adminRepository.delete(admin);
    }
}
