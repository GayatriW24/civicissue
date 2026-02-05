package com.civicissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.civicissues.entity.Response;
import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {

    List<Response> findByComplaintId(Long complaintId);
}
