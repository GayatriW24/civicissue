package com.civicissues.user_service.repository;

import com.civicissues.user_service.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find admin by email (used during login / validation)
    Optional<Admin> findByEmail(String email);

    // Check if admin exists by email (for registration)
    boolean existsByEmail(String email);
}
