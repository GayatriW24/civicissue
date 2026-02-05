package com.civicissues.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttachmentResponseDto {

    private Long id;
    private Long complaintId;
    private String fileName;
    private String fileType;
    private String fileUrl;
}
