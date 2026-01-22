package com.civicissues.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.civicissues.dto.CategoryCreateDto;
import com.civicissues.dto.CategoryResponseDto;
import com.civicissues.service.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public CategoryResponseDto create(
            @Valid @RequestBody CategoryCreateDto dto) {
        return categoryService.createCategory(dto);
    }

    @PutMapping("/{id}")
    public CategoryResponseDto update(
            @PathVariable Long id,
            @Valid @RequestBody CategoryCreateDto dto) {
        return categoryService.updateCategory(id, dto);
    }

    @GetMapping("/{id}")
    public CategoryResponseDto getById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @GetMapping
    public List<CategoryResponseDto> getAll() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/department/{departmentId}")
    public List<CategoryResponseDto> getByDepartment(
            @PathVariable Long departmentId) {
        return categoryService.getCategoriesByDepartment(departmentId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
