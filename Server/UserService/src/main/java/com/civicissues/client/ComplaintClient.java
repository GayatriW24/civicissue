package com.civicissues.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.civicissues.dto.UserComplaintDto;

@FeignClient(
	    name = "complaint-service",
	    url = "http://localhost:8081"
	)
	public interface ComplaintClient {

	    @GetMapping("/api/complaints/{id}")
	    List<UserComplaintDto> getComplaints(@PathVariable Long id);
	}
