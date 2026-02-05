package com.async.events;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEvent {
	//private Long userId;
	private String citizenAadhaar;

    private Long complaintId;
    private String type;
   // private NotificationType type;
    private String recipient;
    private String message;
    private LocalDateTime createdAt;
}
