package com.civicissues.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civicissues.dto.request.ChangePasswordRequest;
import com.civicissues.dto.response.ApiResponse;
import com.civicissues.dto.response.UserResponse;
import com.civicissues.service.UserService;

import jakarta.validation.Valid;

//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/me")
//    public UserResponse me() {
//        return userService.getCurrentUser();
//    }
//
//    @PutMapping("/change-password")
//    public ApiResponse changePassword(@Valid @RequestBody ChangePasswordRequest request) {
//        userService.changePassword(request);
//        return new ApiResponse("password updated successfully");
//    }
//
//    @GetMapping("/validate")
//    public UserResponse validate() {
//        return userService.validateToken();
//    }
//    
//    @GetMapping("/internal/{id}/email")
//    public String getEmailByUserId(@PathVariable Long id) {
//        return userService.getEmailByUserId(id);
//    }
//    
//    @GetMapping("/internal/aadhaar/{aadhaar}/email")
//    public String getEmailByAadhaar(@PathVariable String aadhaar) {
//        return userService.getEmailByAadhaar(aadhaar);
//    }
//
//
//
//}
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me() {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "User fetched successfully",
                        userService.getCurrentUser()));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Password updated successfully", null));
    }

    @GetMapping("/validate")
    public ResponseEntity<ApiResponse<UserResponse>> validate() {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Token is valid",
                        userService.validateToken()));
    }

    @GetMapping("/internal/{id}/email")
    public String getEmailByUserId(@PathVariable Long id) {
        return userService.getEmailByUserId(id);
    }

    @GetMapping("/internal/aadhaar/{aadhaar}/email")
    public String getEmailByAadhaar(@PathVariable String aadhaar) {
        return userService.getEmailByAadhaar(aadhaar);
    }
}
