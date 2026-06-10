package com.urbanbite.service;

import com.urbanbite.model.MenuItem;
import com.urbanbite.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    
    public Map<String, String> getMenuByDay(String day) {
        List<MenuItem> items = menuItemRepository.findByDayOfWeek(day);

        Map<String, String> menu = new HashMap<>();
        for (MenuItem item : items) {
            menu.put(item.getMealType().toLowerCase(), item.getDescription());
        }

        
        menu.putIfAbsent("lunch", "Menu not available");
        menu.putIfAbsent("dinner", "Menu not available");

        return menu;
    }

    
    public Map<String, Map<String, String>> getFullMenu() {
        List<MenuItem> allItems = menuItemRepository.findAll();

        return allItems.stream()
                .collect(Collectors.groupingBy(
                        MenuItem::getDayOfWeek,
                        LinkedHashMap::new,
                        Collectors.toMap(
                                item -> item.getMealType().toLowerCase(),
                                MenuItem::getDescription,
                                (a, b) -> a  
                        )
                ));
    }
}
