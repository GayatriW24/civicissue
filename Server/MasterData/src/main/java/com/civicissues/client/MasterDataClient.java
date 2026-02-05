package com.civicissues.client;

import java.util.Collections;
import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.civicissues.dto.CategoryResponseDto;

@FeignClient(
    name = "masterdata-service",
    fallback = MasterDataClientFallback.class
)
public interface MasterDataClient {

    @GetMapping("/api/departments/{id}/exists")
    boolean existsById(@PathVariable("id") Long id);

    @GetMapping("/api/categories/department/{departmentId}")
    List<CategoryResponseDto> getCategoriesByDepartment(@PathVariable("departmentId") Long departmentId);
}
