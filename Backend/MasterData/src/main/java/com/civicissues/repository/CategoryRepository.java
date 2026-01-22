package com.civicissues.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.civicissues.entity.Category;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByDepartmentId(Long departmentId);
}
