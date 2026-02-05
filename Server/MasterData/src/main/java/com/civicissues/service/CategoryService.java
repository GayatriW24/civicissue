package com.civicissues.service;

import java.util.List;

import com.civicissues.dto.CategoryCreateDto;
import com.civicissues.dto.CategoryResponseDto;

public interface CategoryService {

    CategoryResponseDto createCategory(CategoryCreateDto dto);

    CategoryResponseDto updateCategory(Long id, CategoryCreateDto dto);

    CategoryResponseDto getCategoryById(Long id);

    List<CategoryResponseDto> getAllCategories();

    List<CategoryResponseDto> getCategoriesByDepartment(Long departmentId);

    void deleteCategory(Long id);
}
