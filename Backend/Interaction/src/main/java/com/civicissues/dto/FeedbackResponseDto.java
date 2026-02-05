package com.civicissues.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class FeedbackResponseDto {

    private Long id;
    private Long complaintId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
