package com.civicissues.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.civicissues.entity.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

    List<Attachment> findByComplaintId(Long complaintId);
}
