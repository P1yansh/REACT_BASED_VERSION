package com.urbanbite.controller.email;

import com.urbanbite.dto.ApiResponse;
import com.urbanbite.service.email.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/test")
    public ResponseEntity<ApiResponse> sendTestEmail(@RequestBody Map<String, String> request) {
        String to = request.get("to");
        if (to == null || to.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Recipient 'to' email is required"));
        }

        String subject = "Test Email from UrbanBite";
        String body = "Hi there,\n\nThis is a test email to verify the email configuration.\n\nThank you!";
        
        emailService.sendSimpleEmail(to, subject, body);

        return ResponseEntity.ok(new ApiResponse(true, "Test email sent successfully to " + to));
    }
}
