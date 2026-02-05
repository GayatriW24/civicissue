package com.civicissues.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.civicissues.entity.Role;
import com.civicissues.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAadhaar(String aadhaar);
    boolean existsByAadhaar(String aadhaar);
    boolean existsByEmail(String email);
    boolean existsByRole(Role role);
}

