package com.civicissues.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class ResponseResponseDto {

    private Long id;
    private Long complaintId;
    private String message;
    private LocalDateTime createdAt;
}
