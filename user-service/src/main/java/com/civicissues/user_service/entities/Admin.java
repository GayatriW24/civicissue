package com.civicissues.user_service.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
@Data
@Entity
@Table(
    name = "admins",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
    }
)
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 100)
    @Column(nullable = false)
    private String name;

    @Email
    @NotBlank
    @Column(nullable = false, length = 120)
    private String email;

    @NotBlank
    @Size(min = 8)
    @Column(nullable = false)
    private String password; // Encrypted

    @NotNull
    @Column(name = "department_id", nullable = false)
    private Long departmentId; // Reference to Department Service

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
}
