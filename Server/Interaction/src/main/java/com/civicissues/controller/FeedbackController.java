package com.civicissues.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.civicissues.dto.ApiResponse;
import com.civicissues.dto.FeedbackCreateDto;
import com.civicissues.dto.FeedbackResponseDto;
import com.civicissues.service.FeedbackService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FeedbackResponseDto>> create(
            @Valid @RequestBody FeedbackCreateDto dto
    ) {
        FeedbackResponseDto response = feedbackService.createFeedback(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Feedback submitted", response));
    }

    @GetMapping("/complaint/{complaintId}")
    public ResponseEntity<ApiResponse<FeedbackResponseDto>> getByComplaint(
            @PathVariable Long complaintId
    ) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Feedback fetched",
                        feedbackService.getFeedbackByComplaint(complaintId)
                )
        );
    }
}
