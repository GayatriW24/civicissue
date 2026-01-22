package com.civicissues.user_service.service;



import com.civicissues.user_service.dtos.LoginRequestDTO;
import com.civicissues.user_service.dtos.LoginResponseDTO;
import com.civicissues.user_service.dtos.RegisterAdminDTO;
import com.civicissues.user_service.dtos.RegisterCitizenDTO;

public interface AuthService {

    /**
     * Authenticate user (Admin or Citizen) and generate JWT
     */
    LoginResponseDTO login(LoginRequestDTO request);

    /**
     * Register a new Citizen
     */
    void registerCitizen(RegisterCitizenDTO dto);

    /**
     * Register a new Admin
     */
    void registerAdmin(RegisterAdminDTO dto);
}
