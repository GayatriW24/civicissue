package com.civicissues.service;

import java.util.List;
import com.civicissues.dto.ComplaintCreateDto;
import com.civicissues.dto.ComplaintResponseDto;

public interface ComplaintService {

    ComplaintResponseDto createComplaint(ComplaintCreateDto dto);

    ComplaintResponseDto getComplaintById(Long id);

    List<ComplaintResponseDto> getAllComplaints();

    boolean existsById(Long id);
}
