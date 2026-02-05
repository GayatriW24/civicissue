package com.civicissues.service;

import com.civicissues.dto.AuthResponse;
import com.civicissues.dto.LoginRequest;
import com.civicissues.dto.RegisterCitizenRequest;

public interface AuthService {
    void registerCitizen(RegisterCitizenRequest request);
    AuthResponse login(LoginRequest request);
}

