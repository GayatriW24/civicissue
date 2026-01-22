

package com.civicissues.user_service.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
@Entity
@Table(
    name = "roles",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "role_name")
    }
)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Role name cannot be empty")
    @Size(max = 30, message = "Role name too long")
    @Column(name = "role_name", nullable = false, length = 30)
    private String roleName; // ROLE_CITIZEN, ROLE_ADMIN
     
}
