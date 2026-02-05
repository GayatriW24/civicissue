package com.civicissues;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.civicissues.client")
public class MasterDataApplication {
    public static void main(String[] args) {
        SpringApplication.run(MasterDataApplication.class, args);
    }
}
