package com.civicissues.controller;

import org.springframework.web.bind.annotation.*;
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
    public FeedbackResponseDto create(@Valid @RequestBody FeedbackCreateDto dto) {
        return feedbackService.createFeedback(dto);
    }

    @GetMapping("/complaint/{complaintId}")
    public FeedbackResponseDto getByComplaint(@PathVariable Long complaintId) {
        return feedbackService.getFeedbackByComplaint(complaintId);
    }
}
