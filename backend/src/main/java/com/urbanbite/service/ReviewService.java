package com.urbanbite.service;

import com.urbanbite.dto.ReviewRequest;
import com.urbanbite.model.Review;
import com.urbanbite.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    
    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

    
    public Review createReview(ReviewRequest request) {
        Review review = Review.builder()
                .name(request.getName())
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return reviewRepository.save(review);
    }
}
