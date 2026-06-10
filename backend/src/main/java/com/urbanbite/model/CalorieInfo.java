package com.urbanbite.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "calorie_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalorieInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name", nullable = false, length = 100)
    private String itemName;

    @Column(nullable = false)
    private Integer calories;

    
    @Column(name = "recommended_for", length = 500)
    private String recommendedFor;
}
