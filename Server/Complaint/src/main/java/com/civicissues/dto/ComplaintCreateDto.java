package com.civicissues.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintCreateDto {



    @NotNull
    private Long departmentId;

    @NotNull
    private Long categoryId;
    @NotBlank
    private String city;
    @NotBlank
    private String area;
    @NotBlank
    private String description;
}
