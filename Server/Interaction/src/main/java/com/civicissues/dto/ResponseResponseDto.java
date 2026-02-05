package com.civicissues.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseResponseDto {
    private Long id;
    private Long complaintId;
    private String message;
    private LocalDateTime createdAt;
}
