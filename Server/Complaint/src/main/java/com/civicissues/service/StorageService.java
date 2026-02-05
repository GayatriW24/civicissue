package com.civicissues.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class StorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // NEW: base URL for API Gateway
    @Value("${gateway.base-url}")
    private String gatewayBaseUrl;

    public String upload(MultipartFile file) {
        try {
            Files.createDirectories(Paths.get(uploadDir));

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename().trim();
            Path targetPath = Paths.get(uploadDir).resolve(filename);

            Files.copy(file.getInputStream(), targetPath);

            // Return URL through the gateway
            return gatewayBaseUrl + "/api/attachments/files/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }
}
