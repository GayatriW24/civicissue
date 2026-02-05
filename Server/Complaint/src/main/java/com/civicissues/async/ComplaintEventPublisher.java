package com.civicissues.async;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.async.events.NotificationEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComplaintEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(NotificationEvent event) {

        String routingKey = switch (event.getType()) {
            case "COMPLAINT_CREATED" -> "complaint.created";
            case "STATUS_CHANGED" -> "complaint.status.changed";
            case "COMPLAINT_RESOLVED" -> "complaint.resolved";
            default -> "complaint.unknown";
        };

        rabbitTemplate.convertAndSend(
                RabbitConfig.EXCHANGE,
                routingKey,
                event
        );
    }
}
