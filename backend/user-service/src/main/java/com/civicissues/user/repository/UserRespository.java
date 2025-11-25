package com.civicissues.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.civicissues.user.entity.User;

public interface UserRespository extends JpaRepository<User, Long>{

	Optional<User> findByEmail(String email);

}
