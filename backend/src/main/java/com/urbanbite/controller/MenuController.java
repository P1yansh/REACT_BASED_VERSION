package com.urbanbite.controller;

import com.urbanbite.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    
    @GetMapping
    public ResponseEntity<Map<String, String>> getMenuByDay(@RequestParam(defaultValue = "Monday") String day) {
        return ResponseEntity.ok(menuService.getMenuByDay(day));
    }

    
    @GetMapping("/all")
    public ResponseEntity<Map<String, Map<String, String>>> getFullMenu() {
        return ResponseEntity.ok(menuService.getFullMenu());
    }
}
