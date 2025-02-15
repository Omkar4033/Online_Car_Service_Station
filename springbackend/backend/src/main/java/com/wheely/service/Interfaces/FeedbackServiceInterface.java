package com.wheely.service.interfaces;

import com.wheely.pojos.Feedback;
import com.wheely.dto.FeedbackDTO;
import java.util.List;

public interface FeedbackServiceInterface {
    Feedback saveFeedback(Long bookingId, Feedback feedback);
    List<FeedbackDTO> getAllFeedbacks();
}
