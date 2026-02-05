package com.civicissues.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "complaint-service", url = "http://localhost:8081")
public interface ComplaintClient {

    @GetMapping("/api/complaints/{id}/exists")
    Boolean existsById(@PathVariable("id") Long id);
}
