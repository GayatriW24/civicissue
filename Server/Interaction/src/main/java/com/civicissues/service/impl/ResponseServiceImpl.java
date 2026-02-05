package com.civicissues.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.civicissues.client.ComplaintClient;
import com.civicissues.dto.ResponseCreateDto;
import com.civicissues.dto.ResponseResponseDto;
import com.civicissues.entity.Response;
import com.civicissues.exception.ResourceNotFoundException;
import com.civicissues.repository.ResponseRepository;
import com.civicissues.service.ResponseService;

@Service
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepository responseRepository;
    private final ComplaintClient complaintClient;

    public ResponseServiceImpl(ResponseRepository responseRepository, ComplaintClient complaintClient) {
        this.responseRepository = responseRepository;
        this.complaintClient = complaintClient;
    }

    private void validateComplaintExists(Long complaintId) {
        Boolean exists = complaintClient.existsById(complaintId);
        if (exists == null || !exists) {
            throw new ResourceNotFoundException("Complaint not found with id " + complaintId);
        }
    }

    @Override
    public ResponseResponseDto createResponse(ResponseCreateDto dto) {
        validateComplaintExists(dto.getComplaintId());

        Response response = new Response();
        response.setComplaintId(dto.getComplaintId());
        response.setMessage(dto.getMessage());
        response.setCreatedAt(LocalDateTime.now());

        Response saved = responseRepository.save(response);

        ResponseResponseDto res = new ResponseResponseDto();
        res.setId(saved.getId());
        res.setComplaintId(saved.getComplaintId());
        res.setMessage(saved.getMessage());
        res.setCreatedAt(saved.getCreatedAt());
        return res;
    }

    @Override
    public List<ResponseResponseDto> getResponsesByComplaint(Long complaintId) {
        return responseRepository.findAllByComplaintIdOrderByCreatedAtAsc(complaintId)
                .stream()
                .map(r -> {
                    ResponseResponseDto dto = new ResponseResponseDto();
                    dto.setId(r.getId());
                    dto.setComplaintId(r.getComplaintId());
                    dto.setMessage(r.getMessage());
                    dto.setCreatedAt(r.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
