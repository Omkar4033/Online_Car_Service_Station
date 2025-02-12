package com.wheely.service;
import com.wheely.pojos.Feedback;
import com.wheely.pojos.Booking;
import com.wheely.dao.FeedbackRepository;
import com.wheely.dto.FeedbackDTO;
import com.wheely.exception.ResourceNotFoundException;
import com.wheely.dao.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // Save feedback
    public Feedback saveFeedback(Long bookingId, Feedback feedback) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        feedback.setBooking(booking); // Associate feedback with booking
        return feedbackRepository.save(feedback);
    }

    // Fetch all feedbacks
    public List<FeedbackDTO> getAllFeedbacks() {
    	List<FeedbackDTO> result = new ArrayList<>();
        List<Feedback> feedbacks= feedbackRepository.findAll();
        for(Feedback feedback: feedbacks)
        {
        	result.add( new FeedbackDTO(feedback.getBooking().getBookingId(),feedback.getRating(),feedback.getFeedback() ));
        }
        return result;
    }
}

