package com.civicissues.dto;

import jakarta.validation.constraints.NotBlank;

public class NotificationCreateDto {

    @NotBlank
    private String type;

    @NotBlank
    private String recipient;

    @NotBlank
    private String message;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
