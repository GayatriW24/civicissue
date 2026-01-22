package com.civicissues.user_service.service;


import com.civicissues.user_service.dtos.AdminResponseDTO;
import java.util.List;

public interface AdminService {

    List<AdminResponseDTO> getAllAdmins();

    AdminResponseDTO getAdminById(Long id);

    void deleteAdmin(Long id);
}
