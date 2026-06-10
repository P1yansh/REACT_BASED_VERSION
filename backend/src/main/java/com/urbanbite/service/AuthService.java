package com.urbanbite.service;

import com.urbanbite.dto.AuthResponse;
import com.urbanbite.dto.LoginRequest;
import com.urbanbite.dto.RegisterRequest;
import com.urbanbite.model.Role;
import com.urbanbite.model.User;
import com.urbanbite.repository.UserRepository;
import com.urbanbite.security.JwtUtil;
import com.urbanbite.service.email.EmailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    
    public AuthResponse register(RegisterRequest request) {
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered. Please login instead.");
        }

        
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .plan(request.getPlan())
                .foodType(request.getFoodType())
                .role(Role.USER)
                .build();

        user = userRepository.save(user);

        
        String subject = "Welcome to UrbanBite! ";
        String body = "Hi " + user.getName() + ",\n\n" +
                "Welcome to UrbanBite! We are excited to have you on board.\n" +
                "You have selected the " + user.getPlan() + " plan. Get ready to enjoy chef-crafted, macro-balanced meals.\n\n" +
                "Thank you!";
        emailService.sendSimpleEmail(user.getEmail(), subject, body);

        
        String token = jwtUtil.generateToken(user.getEmail());

        return buildAuthResponse(user, token);
    }

    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return buildAuthResponse(user, token);
    }

    
    public AuthResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return buildAuthResponse(user, null);
    }

    
    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .plan(user.getPlan())
                .phone(user.getPhone())
                .foodType(user.getFoodType())
                .role(user.getRole().name())
                .build();
    }
}
