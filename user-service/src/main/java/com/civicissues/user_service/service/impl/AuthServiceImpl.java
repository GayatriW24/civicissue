package com.civicissues.user_service.service.impl;

import com.civicissues.user_service.dtos.*;
import com.civicissues.user_service.entities.Admin;
import com.civicissues.user_service.entities.Citizen;
import com.civicissues.user_service.entities.Role;
import com.civicissues.user_service.exceptions.ResourceAlreadyExistsException;
import com.civicissues.user_service.exceptions.UnauthorizedException;
import com.civicissues.user_service.repository.AdminRepository;
import com.civicissues.user_service.repository.CitizenRepository;
import com.civicissues.user_service.repository.RoleRepository;
import com.civicissues.user_service.security.JwtUtils;
import com.civicissues.user_service.service.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final CitizenRepository citizenRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final ModelMapper modelMapper;

    public AuthServiceImpl(AdminRepository adminRepository,
                           CitizenRepository citizenRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtils jwtUtils,
                           ModelMapper modelMapper) {
        this.adminRepository = adminRepository;
        this.citizenRepository = citizenRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.modelMapper = modelMapper;
    }

    // ================= LOGIN =================
    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        // Attempt Admin login
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .filter(a -> passwordEncoder.matches(
                        request.getPassword(), a.getPassword()))
                .orElse(null);

        if (admin != null) {
            return buildLoginResponse(
                    admin.getId(),
                    admin.getEmail(),
                    admin.getRole().getRoleName()
            );
        }

        // Attempt Citizen login
        Citizen citizen = citizenRepository.findByEmail(request.getEmail())
                .filter(c -> passwordEncoder.matches(
                        request.getPassword(), c.getPassword()))
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid email or password"));

        return buildLoginResponse(
                citizen.getId(),
                citizen.getEmail(),
                citizen.getRole().getRoleName()
        );
    }

    // ================= REGISTER CITIZEN =================
    @Override
    public void registerCitizen(RegisterCitizenDTO dto) {

        if (citizenRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already registered");
        }

        Role citizenRole = roleRepository
                .findByRoleName("ROLE_CITIZEN")
                .orElseThrow(() ->
                        new RuntimeException("ROLE_CITIZEN not found"));

        Citizen citizen = modelMapper.map(dto, Citizen.class);
        citizen.setPassword(passwordEncoder.encode(dto.getPassword()));
        citizen.setRole(citizenRole);

        citizenRepository.save(citizen);
    }

    // ================= REGISTER ADMIN =================
    @Override
    public void registerAdmin(RegisterAdminDTO dto) {

        if (adminRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceAlreadyExistsException("Admin email already exists");
        }

        Role adminRole = roleRepository
                .findByRoleName("ROLE_ADMIN")
                .orElseThrow(() ->
                        new RuntimeException("ROLE_ADMIN not found"));

        Admin admin = modelMapper.map(dto, Admin.class);
        admin.setPassword(passwordEncoder.encode(dto.getPassword()));
        admin.setRole(adminRole);

        adminRepository.save(admin);
    }

    // ================= PRIVATE =================
    private LoginResponseDTO buildLoginResponse(
            Long userId, String email, String roleName) {

        String token = jwtUtils.generateToken(userId, email, roleName);

        LoginResponseDTO response = new LoginResponseDTO();
        response.setUserId(userId);
        response.setEmail(email);
        response.setRole(roleName);
        response.setToken(token);

        return response;
    }
}
