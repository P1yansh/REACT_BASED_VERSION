package com.urbanbite.scheduler;

import com.urbanbite.model.FoodPlan;
import com.urbanbite.model.Meal;
import com.urbanbite.model.User;
import com.urbanbite.repository.FoodPlanRepository;
import com.urbanbite.repository.MealRepository;
import com.urbanbite.service.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class FoodPlanScheduler {

    private static final Logger logger = LoggerFactory.getLogger(FoodPlanScheduler.class);

    private final FoodPlanRepository foodPlanRepository;
    private final MealRepository mealRepository;
    private final EmailService emailService;

    public FoodPlanScheduler(FoodPlanRepository foodPlanRepository, MealRepository mealRepository, EmailService emailService) {
        this.foodPlanRepository = foodPlanRepository;
        this.mealRepository = mealRepository;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void checkExpiringPlans() {
        logger.info("Running FoodPlanScheduler (9 AM) - Plan Expiry Check...");

        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        List<FoodPlan> expiringPlans = foodPlanRepository.findByExpiryDateAndIsActiveTrueAndExpiryReminderSentFalse(tomorrow);
        int expiryNotified = 0;
        for (FoodPlan plan : expiringPlans) {
            User user = plan.getUser();
            String subject = "Food Plan Expiring Soon";
            String body = "Hi " + user.getName() + ",\n\n" +
                    "Your " + plan.getPlan() + " food plan will expire tomorrow (" + tomorrow + ").\n" +
                    "Renew now to continue enjoying our meals.\n\n" +
                    "Thank you!";
            emailService.sendSimpleEmail(user.getEmail(), subject, body);
            
            plan.setExpiryReminderSent(true);
            foodPlanRepository.save(plan);
            
            expiryNotified++;
            logger.info("Sent expiry reminder to {}", user.getEmail());
        }

        List<FoodPlan> expiredPlans = foodPlanRepository.findByExpiryDateBeforeAndIsActiveTrue(today);
        int expiredNotified = 0;
        for (FoodPlan plan : expiredPlans) {
            User user = plan.getUser();
            String subject = "Your Food Plan has Expired";
            String body = "Hi " + user.getName() + ",\n\n" +
                    "Your " + plan.getPlan() + " food plan has expired on " + plan.getExpiryDate() + ".\n" +
                    "Please renew your subscription to resume your meal deliveries.\n\n" +
                    "Thank you!";
            emailService.sendSimpleEmail(user.getEmail(), subject, body);
            
            plan.setActive(false);
            foodPlanRepository.save(plan);
            
            expiredNotified++;
            logger.info("Sent expired notification and deactivated plan for {}", user.getEmail());
        }
        
        logger.info("Finished FoodPlanScheduler. Users notified (expiring): {}, Users notified (expired): {}", expiryNotified, expiredNotified);
    }

    @Scheduled(cron = "0 0 8 * * ?")
    public void checkDailyMeals() {
        logger.info("Running FoodPlanScheduler (8 AM) - Daily Meal Reminder...");

        LocalDate today = LocalDate.now();

        List<Meal> mealsToday = mealRepository.findByScheduledDateAndReminderSentFalse(today);
        int mealNotified = 0;
        for (Meal meal : mealsToday) {
            User user = meal.getUser();
            String subject = "Today's Meal Reminder";
            String body = "Hi " + user.getName() + ",\n\n" +
                    "You have meals scheduled for today (" + today + ").\n" +
                    (meal.getMealType() != null ? "Meal Type: " + meal.getMealType() + "\n" : "") +
                    "Get ready for some delicious food!\n\n" +
                    "Thank you!";
            emailService.sendSimpleEmail(user.getEmail(), subject, body);

            meal.setReminderSent(true);
            mealRepository.save(meal);

            mealNotified++;
            logger.info("Sent daily meal reminder to {}", user.getEmail());
        }

        logger.info("Finished Daily Meal Reminders. Users notified: {}", mealNotified);
    }
}
