package com.civicissues.service;

import com.civicissues.dto.FeedbackCreateDto;
import com.civicissues.dto.FeedbackResponseDto;

public interface FeedbackService {

    FeedbackResponseDto createFeedback(FeedbackCreateDto dto);

    FeedbackResponseDto getFeedbackByComplaint(Long complaintId);
}
