package com.civicissues.service;

import java.util.List;
import com.civicissues.dto.ResponseCreateDto;
import com.civicissues.dto.ResponseResponseDto;

public interface ResponseService {

    ResponseResponseDto createResponse(ResponseCreateDto dto);

    List<ResponseResponseDto> getResponsesByComplaint(Long complaintId);
}
