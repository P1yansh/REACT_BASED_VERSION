package com.urbanbite.controller;

import com.urbanbite.dto.ApiResponse;
import com.urbanbite.dto.OrderRequest;
import com.urbanbite.model.Order;
import com.urbanbite.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    
    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderRequest request,
                                         Authentication authentication) {
        try {
            Order order = orderService.createOrder(authentication.getName(), request);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.getUserOrders(authentication.getName()));
    }
}
