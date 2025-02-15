package com.wheely.service;

import com.wheely.pojos.Feedback;
import com.wheely.pojos.Booking;
import com.wheely.dao.FeedbackRepository;
import com.wheely.dto.FeedbackDTO;
import com.wheely.exception.GolbalException;
import com.wheely.dao.BookingRepository;
import com.wheely.service.interfaces.FeedbackServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class FeedbackService implements FeedbackServiceInterface {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Feedback saveFeedback(Long bookingId, Feedback feedback) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new GolbalException("Booking not found with ID: " + bookingId));

        feedback.setBooking(booking);
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<FeedbackDTO> getAllFeedbacks() {
        List<FeedbackDTO> result = new ArrayList<>();
        List<Feedback> feedbacks = feedbackRepository.findAll();
        for (Feedback feedback : feedbacks) {
            result.add(new FeedbackDTO(feedback.getBooking().getBookingId(), feedback.getRating(), feedback.getFeedback()));
        }
        return result;
    }
}
