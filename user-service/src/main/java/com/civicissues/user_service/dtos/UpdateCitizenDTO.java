package com.civicissues.user_service.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
@Data
public class UpdateCitizenDTO {

    @NotBlank
    private String name;

    @Pattern(regexp = "^[6-9]\\d{9}$")
    private String phone;

    @NotBlank
    private String address;

    // getters & setters
}
