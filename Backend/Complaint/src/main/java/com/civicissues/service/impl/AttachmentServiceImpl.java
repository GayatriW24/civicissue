package com.civicissues.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.civicissues.dto.AttachmentCreateDto;
import com.civicissues.dto.AttachmentResponseDto;
import com.civicissues.entity.Attachment;
import com.civicissues.exception.ResourceNotFoundException;
import com.civicissues.repository.AttachmentRepository;
import com.civicissues.repository.ComplaintRepository;
import com.civicissues.service.AttachmentService;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final ComplaintRepository complaintRepository;

    public AttachmentServiceImpl(AttachmentRepository attachmentRepository, ComplaintRepository complaintRepository) {
        this.attachmentRepository = attachmentRepository;
        this.complaintRepository = complaintRepository;
    }

    @Override
    public AttachmentResponseDto createAttachment(AttachmentCreateDto dto) {
        if (!complaintRepository.existsById(dto.getComplaintId())) {
            throw new ResourceNotFoundException("complaint not found with id " + dto.getComplaintId());
        }

        Attachment attachment = new Attachment();
        attachment.setComplaintId(dto.getComplaintId());
        attachment.setFileName(dto.getFileName());
        attachment.setFileType(dto.getFileType());
        attachment.setFileUrl(dto.getFileUrl());

        Attachment saved = attachmentRepository.save(attachment);

        AttachmentResponseDto res = new AttachmentResponseDto();
        res.setId(saved.getId());
        res.setComplaintId(saved.getComplaintId());
        res.setFileName(saved.getFileName());
        res.setFileType(saved.getFileType());
        res.setFileUrl(saved.getFileUrl());
        return res;
    }

    @Override
    public List<AttachmentResponseDto> getAttachmentsByComplaint(Long complaintId) {
        return attachmentRepository.findByComplaintId(complaintId)
                .stream()
                .map(a -> {
                    AttachmentResponseDto dto = new AttachmentResponseDto();
                    dto.setId(a.getId());
                    dto.setComplaintId(a.getComplaintId());
                    dto.setFileName(a.getFileName());
                    dto.setFileType(a.getFileType());
                    dto.setFileUrl(a.getFileUrl());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
