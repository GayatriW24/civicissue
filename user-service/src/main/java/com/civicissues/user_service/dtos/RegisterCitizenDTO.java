package com.civicissues.user_service.dtos;


import jakarta.validation.constraints.*;
import lombok.Data;
@Data
public class RegisterCitizenDTO {

    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @Pattern(regexp = "^[6-9]\\d{9}$")
    private String phone;

    @NotBlank
    private String address;

    @Pattern(regexp = "\\d{12}")
    private String aadhaarNo;

    // getters & setters
}
