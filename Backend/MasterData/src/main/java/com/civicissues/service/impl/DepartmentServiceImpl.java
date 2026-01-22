package com.civicissues.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.civicissues.dto.DepartmentCreateDto;
import com.civicissues.dto.DepartmentResponseDto;
import com.civicissues.entity.Department;
import com.civicissues.exceptions.ResourceNotFoundException;
import com.civicissues.repository.DepartmentRepository;
import com.civicissues.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DepartmentResponseDto createDepartment(DepartmentCreateDto dto) {
        Department department = new Department();
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());

        Department saved = departmentRepository.save(department);

        DepartmentResponseDto res = new DepartmentResponseDto();
        res.setId(saved.getId());
        res.setName(saved.getName());
        res.setDescription(saved.getDescription());
        return res;
    }

    @Override
    public DepartmentResponseDto updateDepartment(Long id, DepartmentCreateDto dto) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("department not found with id " + id));

        department.setName(dto.getName());
        department.setDescription(dto.getDescription());

        Department updated = departmentRepository.save(department);

        DepartmentResponseDto res = new DepartmentResponseDto();
        res.setId(updated.getId());
        res.setName(updated.getName());
        res.setDescription(updated.getDescription());
        return res;
    }

    @Override
    public DepartmentResponseDto getDepartmentById(Long id) {
        Department d = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("department not found with id " + id));

        DepartmentResponseDto dto = new DepartmentResponseDto();
        dto.setId(d.getId());
        dto.setName(d.getName());
        dto.setDescription(d.getDescription());
        return dto;
    }

    @Override
    public List<DepartmentResponseDto> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(d -> {
                    DepartmentResponseDto dto = new DepartmentResponseDto();
                    dto.setId(d.getId());
                    dto.setName(d.getName());
                    dto.setDescription(d.getDescription());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("department not found with id " + id);
        }
        departmentRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return departmentRepository.existsById(id);
    }
}
