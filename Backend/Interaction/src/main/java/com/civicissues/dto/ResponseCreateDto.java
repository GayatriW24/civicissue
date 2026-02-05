package com.civicissues.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseCreateDto {

    @NotNull
    private Long complaintId;

    @NotBlank
    private String message;
}
