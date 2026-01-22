package com.civicissues.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.civicissues.dto.ResponseCreateDto;
import com.civicissues.dto.ResponseResponseDto;
import com.civicissues.entity.Response;
import com.civicissues.exception.ResourceNotFoundException;
import com.civicissues.repository.ResponseRepository;
import com.civicissues.service.ResponseService;

@Service
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepository responseRepository;
    private final RestTemplate restTemplate;

    public ResponseServiceImpl(ResponseRepository responseRepository, RestTemplate restTemplate) {
        this.responseRepository = responseRepository;
        this.restTemplate = restTemplate;
    }

    private void validateComplaintExists(Long complaintId) {
        Boolean exists = restTemplate.getForObject(
            "http://complaint-service/api/complaints/" + complaintId + "/exists", Boolean.class);
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
        return responseRepository.findByComplaintId(complaintId)
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
