package com.civicissues.dto.response;

import com.civicissues.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String aadhaar;
    private String phone;
    private Role role;
    private boolean active;
}
