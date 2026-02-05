package com.civicissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.civicissues.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    boolean existsByComplaintId(Long complaintId);

    Feedback findByComplaintId(Long complaintId);
}
