package com.civicissues.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "attachments")
@Setter
@Getter
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "complaint_id")
    private Complaint complaint;
}
