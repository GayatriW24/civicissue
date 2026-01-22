package com.civicissues.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.civicissues.dto.FeedbackCreateDto;
import com.civicissues.dto.FeedbackResponseDto;
import com.civicissues.entity.Feedback;
import com.civicissues.exception.ResourceNotFoundException;
import com.civicissues.repository.FeedbackRepository;
import com.civicissues.service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final RestTemplate restTemplate;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository, RestTemplate restTemplate) {
        this.feedbackRepository = feedbackRepository;
        this.restTemplate = restTemplate;
    }

    private void validateComplaintExists(Long complaintId) {
        Boolean exists = restTemplate.getForObject(
            "http://complaint-service/api/complaints/" + complaintId + "/exists", Boolean.class);
        if (exists == null || !exists) {
            throw new ResourceNotFoundException("Complaint not found with id " + complaintId);
        }
    }

    @Override
    public FeedbackResponseDto createFeedback(FeedbackCreateDto dto) {
        validateComplaintExists(dto.getComplaintId());

        if (feedbackRepository.existsByComplaintId(dto.getComplaintId())) {
            throw new IllegalArgumentException("Feedback already exists for complaint " + dto.getComplaintId());
        }

        Feedback feedback = new Feedback();
        feedback.setComplaintId(dto.getComplaintId());
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        feedback.setCreatedAt(LocalDateTime.now());

        Feedback saved = feedbackRepository.save(feedback);

        FeedbackResponseDto res = new FeedbackResponseDto();
        res.setId(saved.getId());
        res.setComplaintId(saved.getComplaintId());
        res.setRating(saved.getRating());
        res.setComment(saved.getComment());
        res.setCreatedAt(saved.getCreatedAt());
        return res;
    }

    @Override
    public FeedbackResponseDto getFeedbackByComplaint(Long complaintId) {
        Feedback feedback = feedbackRepository.findByComplaintId(complaintId);
        if (feedback == null) {
            throw new ResourceNotFoundException("Feedback not found for complaint " + complaintId);
        }

        FeedbackResponseDto res = new FeedbackResponseDto();
        res.setId(feedback.getId());
        res.setComplaintId(feedback.getComplaintId());
        res.setRating(feedback.getRating());
        res.setComment(feedback.getComment());
        res.setCreatedAt(feedback.getCreatedAt());
        return res;
    }
}
