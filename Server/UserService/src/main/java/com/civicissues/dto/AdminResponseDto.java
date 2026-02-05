package com.civicissues.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminResponseDto {
    private Long id;
    private String name;
    private String aadhaar;
    private String phone;
    private String email;
    private Long departmentId;
    private boolean active;

    public AdminResponseDto(Long id, String name, String aadhaar, String phone,
                            String email, Long departmentId, boolean active) {
        this.id = id;
        this.name = name;
        this.aadhaar = aadhaar;
        this.phone = phone;
        this.email = email;
        this.departmentId = departmentId;
        this.active = active;
    }

    
}

