package com.civicissues.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.civicissues.entity.User;

public interface UserRespository extends JpaRepository<User, Long>{

	Optional<User> findByEmail(String email);

}

