package com.civicissues.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.civicissues.dto.ComplaintCreateDto;
import com.civicissues.dto.ComplaintResponseDto;
import com.civicissues.service.ComplaintService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ComplaintResponseDto create(@Valid @RequestBody ComplaintCreateDto dto) {
        return complaintService.createComplaint(dto);
    }

    @GetMapping("/{id}")
    public ComplaintResponseDto getById(@PathVariable Long id) {
        return complaintService.getComplaintById(id);
    }

    @GetMapping
    public List<ComplaintResponseDto> getAll() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{id}/exists")
    public boolean exists(@PathVariable Long id) {
        return complaintService.existsById(id);
    }
}
