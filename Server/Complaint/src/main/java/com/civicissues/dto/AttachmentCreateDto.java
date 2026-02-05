package com.civicissues.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttachmentCreateDto {

    @NotNull
    private Long complaintId;

    @NotBlank
    private String fileName;

    @NotBlank
    private String fileType;

    @NotBlank
    private String fileUrl;
}
