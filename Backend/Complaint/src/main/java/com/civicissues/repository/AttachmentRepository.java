package com.civicissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.civicissues.entity.Attachment;
import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

    List<Attachment> findByComplaintId(Long complaintId);
}
