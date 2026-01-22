package com.civicissues.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.civicissues.dto.AttachmentCreateDto;
import com.civicissues.dto.AttachmentResponseDto;
import com.civicissues.service.AttachmentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {

    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @PostMapping
    public AttachmentResponseDto create(@Valid @RequestBody AttachmentCreateDto dto) {
        return attachmentService.createAttachment(dto);
    }

    @GetMapping("/complaint/{complaintId}")
    public List<AttachmentResponseDto> getByComplaint(@PathVariable Long complaintId) {
        return attachmentService.getAttachmentsByComplaint(complaintId);
    }
}
