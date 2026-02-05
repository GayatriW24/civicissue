package com.civicissues.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.civicissues.dto.ApiResponse;
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
    public ResponseEntity<ApiResponse<ResponseResponseDto>> create(
            @Valid @RequestBody ResponseCreateDto dto
    ) {
        ResponseResponseDto response = responseService.createResponse(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Response added", response));
    }

    @GetMapping("/complaint/{complaintId}")
    public ResponseEntity<ApiResponse<List<ResponseResponseDto>>> getByComplaint(
            @PathVariable Long complaintId
    ) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Responses fetched",
                        responseService.getResponsesByComplaint(complaintId)
                )
        );
    }
}
