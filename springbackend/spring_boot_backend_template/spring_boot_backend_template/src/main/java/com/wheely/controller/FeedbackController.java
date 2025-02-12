package com.wheely.controller;



import com.wheely.dto.FeedbackDTO;
import com.wheely.pojos.Feedback;
import com.wheely.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")

public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/save/{bookingId}")
    public ResponseEntity<Feedback> saveFeedback(@PathVariable Long bookingId, @RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackService.saveFeedback(bookingId, feedback);
        return ResponseEntity.ok(savedFeedback);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }
}

