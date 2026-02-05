package com.civicissues.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.civicissues.dto.ResponseCreateDto;
import com.civicissues.dto.ResponseResponseDto;
import com.civicissues.service.ResponseService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping
    public ResponseResponseDto create(@Valid @RequestBody ResponseCreateDto dto) {
        return responseService.createResponse(dto);
    }

    @GetMapping("/complaint/{complaintId}")
    public List<ResponseResponseDto> getByComplaint(@PathVariable Long complaintId) {
        return responseService.getResponsesByComplaint(complaintId);
    }
}
