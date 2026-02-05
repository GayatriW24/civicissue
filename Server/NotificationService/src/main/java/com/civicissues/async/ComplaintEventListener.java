package com.civicissues.async;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.async.events.NotificationEvent;
import com.civicissues.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class ComplaintEventListener {
    private final EmailService emailService;

    @RabbitListener(queues = "notification.queue")
    public void handle(NotificationEvent event) {
        log.info("received event: {}", event);
        try {
            switch (event.getType()) {
                case "COMPLAINT_CREATED" -> emailService.sendComplaintCreated(event);
                case "COMPLAINT_RESOLVED" -> emailService.sendComplaintResolved(event);
                case "COMPLAINT_INPROGRESS" -> emailService.sendComplaintInProgress(event);
                case "COMPLAINT_REJECTED" -> emailService.sendComplaintRejected(event);
                default -> log.warn("unknown event type: {}", event.getType());
            }
        } catch (Exception ex) {
            log.error("failed to process notification event: {}, skipping to avoid loop", ex.getMessage());
        }
    }
}
