package com.civicissues.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAdminRequest {
	@NotBlank
    private String name;

    @NotBlank
    private String aadhaar;

    @NotBlank
    private String phone;
    
    private Long departmentId;

    @NotBlank
    @Email
    private String email;
}
