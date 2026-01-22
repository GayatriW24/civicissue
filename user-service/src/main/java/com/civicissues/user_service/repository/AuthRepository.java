package com.civicissues.user_service.repository;


import com.civicissues.user_service.entities.Admin;
import com.civicissues.user_service.entities.Citizen;

import java.util.Optional;

public interface AuthRepository {

    Optional<Admin> findAdminByEmail(String email);

    Optional<Citizen> findCitizenByEmail(String email);
}
