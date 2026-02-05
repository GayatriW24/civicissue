package com.civicissues.dto;

import com.civicissues.entity.ComplaintStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusUpdateDto {
    @NotNull
    private ComplaintStatus status;
}
