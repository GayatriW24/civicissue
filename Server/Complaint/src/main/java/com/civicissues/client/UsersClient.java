package com.civicissues.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://localhost:8083")
public interface UsersClient {

    @GetMapping("/users/internal/aadhaar/{aadhaar}/id")
    Long getUserIdByAadhaar(@PathVariable String aadhaar);
}

