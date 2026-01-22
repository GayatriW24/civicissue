package com.civicissues.user_service.dtos;

import lombok.Data;

@Data
public class CitizenResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;

    // getters & setters
}
