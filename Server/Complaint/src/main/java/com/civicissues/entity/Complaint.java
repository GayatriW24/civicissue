package com.civicissues.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "complaints")
@Setter
@Getter
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 20)
    private String citizenAadhaar;
    
    private Long citizenId;
    private Long departmentId;
    private Long categoryId;

    @Column(length = 2000)
    private String description;

    private String city;
    private String area;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    private Long duplicateOf;
    private Integer reportCount;

    
    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments = new ArrayList<>();
}
