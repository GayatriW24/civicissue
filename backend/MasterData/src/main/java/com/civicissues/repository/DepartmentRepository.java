package com.civicissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.civicissues.entity.Department;

public interface DepartmentRepository  extends JpaRepository<Department, Long>{

}
