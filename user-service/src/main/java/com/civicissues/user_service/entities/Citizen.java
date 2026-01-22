package com.civicissues.user_service.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
@Table(
    name = "citizens",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "aadhaar_no")
    }
)
public class Citizen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100)
    @Column(nullable = false, length = 100)
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank
    @Column(nullable = false, length = 120)
    private String email;

    @NotBlank
    @Size(min = 8)
    @Column(nullable = false)
    private String password; // Encrypted

    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Invalid Indian mobile number"
    )
    @Column(length = 10)
    private String phone;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false)
    private String address;

    @Pattern(
        regexp = "\\d{12}",
        message = "Aadhaar must be 12 digits"
    )
    @Column(name = "aadhaar_no", length = 12)
    private String aadhaarNo;

    @PastOrPresent
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    /* Auto timestamp */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
