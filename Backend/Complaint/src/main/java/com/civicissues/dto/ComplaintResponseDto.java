package com.civicissues.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import com.civicissues.entity.ComplaintStatus;

@Getter
@Setter
public class ComplaintResponseDto {

    private Long id;
    private Long citizenId;
    private Long departmentId;
    private Long categoryId;
    private String description;
    private ComplaintStatus status;
    private LocalDateTime createdAt;
}
