package com.civicissues.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackResponseDto {
    private Long id;
    private Long complaintId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
