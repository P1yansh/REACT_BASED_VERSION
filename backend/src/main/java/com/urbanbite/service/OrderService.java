package com.urbanbite.service;

import com.urbanbite.dto.OrderRequest;
import com.urbanbite.model.FoodPlan;
import com.urbanbite.model.Order;
import com.urbanbite.model.User;
import com.urbanbite.repository.FoodPlanRepository;
import com.urbanbite.repository.OrderRepository;
import com.urbanbite.repository.UserRepository;
import com.urbanbite.service.email.EmailService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final FoodPlanRepository foodPlanRepository;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepository, 
                        UserRepository userRepository,
                        FoodPlanRepository foodPlanRepository,
                        EmailService emailService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.foodPlanRepository = foodPlanRepository;
        this.emailService = emailService;
    }

    
    public Order createOrder(String email, OrderRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BigDecimal price = getPrice(request.getPlan());
        BigDecimal discount = new BigDecimal("50");
        BigDecimal total = price.subtract(discount).max(BigDecimal.ZERO);

        Order order = Order.builder()
                .userId(user.getId())
                .plan(request.getPlan())
                .address(request.getAddress())
                .amount(price)
                .discount(discount)
                .total(total)
                .status("PENDING")
                .build();

        order = orderRepository.save(order);

        
        LocalDate startDate = LocalDate.now();
        LocalDate expiryDate = startDate;
        switch (request.getPlan()) {
            case "Daily" -> expiryDate = startDate.plusDays(1);
            case "Weekly" -> expiryDate = startDate.plusDays(7);
            case "Monthly" -> expiryDate = startDate.plusDays(30);
        }

        
        FoodPlan foodPlan = foodPlanRepository.findByUserIdAndIsActiveTrue(user.getId())
                .orElse(FoodPlan.builder()
                        .user(user)
                        .build());
        
        foodPlan.setPlan(request.getPlan());
        foodPlan.setStartDate(startDate);
        foodPlan.setExpiryDate(expiryDate);
        foodPlan.setActive(true);
        foodPlanRepository.save(foodPlan);

        
        String subject = "Order Confirmation - UrbanBite ";
        String body = "Hi " + user.getName() + ",\n\n" +
                "Thank you for your order!\n" +
                "Plan: " + request.getPlan() + "\n" +
                "Amount Paid: ₹" + total + "\n" +
                "Your plan is valid until: " + expiryDate + "\n\n" +
                "Enjoy your meals!";
        emailService.sendSimpleEmail(user.getEmail(), subject, body);

        return order;
    }

    
    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    
    private BigDecimal getPrice(String plan) {
        return switch (plan) {
            case "Daily" -> new BigDecimal("120");
            case "Weekly" -> new BigDecimal("800");
            case "Monthly" -> new BigDecimal("3000");
            default -> BigDecimal.ZERO;
        };
    }
}
