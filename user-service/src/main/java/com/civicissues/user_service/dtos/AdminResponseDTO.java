package com.civicissues.user_service.dtos;

import lombok.Data;

@Data
public class AdminResponseDTO {

    private Long id;
    private String name;
    private String email;
    private Long departmentId;
    private String role;

    // getters and setters
}
