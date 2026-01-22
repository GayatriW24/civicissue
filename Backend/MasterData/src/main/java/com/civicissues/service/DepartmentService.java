package com.civicissues.service;

import java.util.List;
import com.civicissues.dto.DepartmentCreateDto;
import com.civicissues.dto.DepartmentResponseDto;

public interface DepartmentService {

    DepartmentResponseDto createDepartment(DepartmentCreateDto dto);

    DepartmentResponseDto updateDepartment(Long id, DepartmentCreateDto dto);

    DepartmentResponseDto getDepartmentById(Long id);

    List<DepartmentResponseDto> getAllDepartments();

    void deleteDepartment(Long id);

    boolean existsById(Long id);
}
