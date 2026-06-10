package com.urbanbite.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(name = "day_of_week", nullable = false, length = 20)
    private String dayOfWeek;

    
    @Column(name = "meal_type", nullable = false, length = 10)
    private String mealType;

    
    @Column(nullable = false, length = 500)
    private String description;
}
