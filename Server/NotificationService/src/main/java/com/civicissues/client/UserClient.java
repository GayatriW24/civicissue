package com.civicissues.client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-service", url = "http://localhost:8083")
public interface UserClient {

    @GetMapping("/users/internal/aadhaar/{aadhaar}/email")
    String getEmailByAadhaar(@PathVariable String aadhaar);
}


//@FeignClient(name = "user-service", url = "http://localhost:8083")
//public interface UserClient {
//
//    @GetMapping("/users/internal/{id}/email")
//    String getEmailByUserId(
//        @RequestHeader("Authorization") String token,
//        @PathVariable Long id
//    );
//}

