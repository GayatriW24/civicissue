package com.civicissues.user_service.dtos;


import jakarta.validation.constraints.*;
import lombok.Data;
@Data
public class RegisterAdminDTO {

    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @NotNull
    private Long departmentId;

    // getters & setters
}
