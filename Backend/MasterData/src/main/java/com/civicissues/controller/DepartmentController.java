package com.civicissues.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.civicissues.dto.DepartmentCreateDto;
import com.civicissues.dto.DepartmentResponseDto;
import com.civicissues.service.DepartmentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public DepartmentResponseDto create(@Valid @RequestBody DepartmentCreateDto dto) {
        return departmentService.createDepartment(dto);
    }

    @PutMapping("/{id}")
    public DepartmentResponseDto update(@PathVariable Long id, @Valid @RequestBody DepartmentCreateDto dto) {
        return departmentService.updateDepartment(id, dto);
    }

    @GetMapping("/{id}")
    public DepartmentResponseDto getById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    @GetMapping
    public List<DepartmentResponseDto> getAll() {
        return departmentService.getAllDepartments();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable Long id) {
        return departmentService.existsById(id);
    }
}
