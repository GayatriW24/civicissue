package com.civicissues.client;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;
import com.civicissues.dto.CategoryResponseDto;

@Component
public class MasterDataClientFallback implements MasterDataClient {

    @Override
    public boolean existsById(Long id) {
        return false;
    }

    @Override
    public List<CategoryResponseDto> getCategoriesByDepartment(Long departmentId) {
        return Collections.emptyList();
    }
}
