package com.civicissues.user_service.controller;

import com.civicissues.user_service.dtos.*;
import com.civicissues.user_service.service.impl.*;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthServiceImpl authService;

    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request) {

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register/citizen")
    public ResponseEntity<Void> registerCitizen(
            @Valid @RequestBody RegisterCitizenDTO dto) {

        authService.registerCitizen(dto);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/register/admin")
    public ResponseEntity<Void> registerAdmin(
            @Valid @RequestBody RegisterAdminDTO dto) {

        authService.registerAdmin(dto);
        return ResponseEntity.status(201).build();
    }
}
