package com.civicissues.service;

import java.util.List;
import com.civicissues.dto.AttachmentCreateDto;
import com.civicissues.dto.AttachmentResponseDto;

public interface AttachmentService {

    AttachmentResponseDto createAttachment(AttachmentCreateDto dto);

    List<AttachmentResponseDto> getAttachmentsByComplaint(Long complaintId);
}
