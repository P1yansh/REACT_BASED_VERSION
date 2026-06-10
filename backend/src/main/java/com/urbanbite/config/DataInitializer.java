package com.urbanbite.config;

import com.urbanbite.model.CalorieInfo;
import com.urbanbite.model.MenuItem;
import com.urbanbite.model.Role;
import com.urbanbite.model.User;
import com.urbanbite.repository.CalorieInfoRepository;
import com.urbanbite.repository.MenuItemRepository;
import com.urbanbite.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class DataInitializer implements CommandLineRunner {

    private final MenuItemRepository menuItemRepo;
    private final CalorieInfoRepository calorieInfoRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(MenuItemRepository menuItemRepo,
                           CalorieInfoRepository calorieInfoRepo,
                           UserRepository userRepo,
                           PasswordEncoder passwordEncoder) {
        this.menuItemRepo = menuItemRepo;
        this.calorieInfoRepo = calorieInfoRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedMenuItems();
        seedCalorieInfo();
        seedAdminUser();
    }

    
    private void seedMenuItems() {
        if (menuItemRepo.count() > 0) return;

        
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Monday").mealType("LUNCH").description("Rajma Chawal + Jeera Aloo").build());
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Monday").mealType("DINNER").description("Mix Veg + 4 Rotis + Dal Fry").build());

        
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Tuesday").mealType("LUNCH").description("Kadi Pakoda + Rice").build());
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Tuesday").mealType("DINNER").description("Paneer Butter Masala + Naan").build());

        
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Wednesday").mealType("LUNCH").description("Chole Kulche").build());
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Wednesday").mealType("DINNER").description("Egg Curry / Malai Kofta + Rice").build());

        
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Thursday").mealType("LUNCH").description("Aloo Paratha + Curd + Pickle").build());
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Thursday").mealType("DINNER").description("Dal Makhani + Jeera Rice + Salad").build());

        
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Friday").mealType("LUNCH").description("Pav Bhaji").build());
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Friday").mealType("DINNER").description("Butter Chicken / Shahi Paneer + Naan").build());

        
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Saturday").mealType("LUNCH").description("Biryani + Raita").build());
        menuItemRepo.save(MenuItem.builder().dayOfWeek("Saturday").mealType("DINNER").description("Tandoori Roti + Mix Dal + Aloo Gobi").build());

        System.out.println(" Menu items seeded successfully.");
    }

    
    private void seedCalorieInfo() {
        if (calorieInfoRepo.count() > 0) return;

        calorieInfoRepo.save(CalorieInfo.builder().itemName("Rajma Chawal").calories(350).recommendedFor("Diabetes, High Protein Diet").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Jeera Aloo").calories(180).recommendedFor("Weight Gain").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Mix Veg").calories(150).recommendedFor("Diabetes, Weight Loss").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Dal Fry").calories(200).recommendedFor("High Protein Diet").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Paneer Butter Masala").calories(400).recommendedFor("Weight Gain").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Kadi Pakoda").calories(320).recommendedFor("Energy Boost").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Chole Kulche").calories(450).recommendedFor("High Protein Diet, Energy Boost").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Biryani").calories(500).recommendedFor("Weight Gain, Energy Boost").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Pav Bhaji").calories(380).recommendedFor("Energy Boost").build());
        calorieInfoRepo.save(CalorieInfo.builder().itemName("Dal Makhani").calories(350).recommendedFor("High Protein Diet").build());

        System.out.println(" Calorie info seeded successfully.");
    }

    
    private void seedAdminUser() {
        if (userRepo.existsByEmail("admin@urbanbite.com")) return;

        User admin = User.builder()
                .name("Admin")
                .email("admin@urbanbite.com")
                .phone("9999999999")
                .password(passwordEncoder.encode("admin123"))
                .plan("Monthly")
                .foodType("Both")
                .role(Role.ADMIN)
                .build();

        userRepo.save(admin);
        System.out.println(" Default admin user created (admin@urbanbite.com / admin123)");
    }
}
