package com.civicissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.civicissues.entity.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
