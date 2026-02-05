package com.civicissues.service;

import com.civicissues.dto.request.ChangePasswordRequest;
import com.civicissues.dto.response.UserResponse;

public interface UserService {
    UserResponse getCurrentUser();
    void changePassword(ChangePasswordRequest request);
    UserResponse validateToken();
	String getEmailByUserId(Long id);
	String getEmailByAadhaar(String aadhaar);
}
