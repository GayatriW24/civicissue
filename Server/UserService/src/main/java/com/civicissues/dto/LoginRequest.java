package com.civicissues.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginRequest {
    private String aadhaar;
    private String password;
}

