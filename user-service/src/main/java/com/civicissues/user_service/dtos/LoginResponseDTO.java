package com.civicissues.user_service.dtos;

import lombok.Data;

@Data
public class LoginResponseDTO {

    private Long userId;
    private String email;
    private String role;
    private String token;

    // getters & setters
}
