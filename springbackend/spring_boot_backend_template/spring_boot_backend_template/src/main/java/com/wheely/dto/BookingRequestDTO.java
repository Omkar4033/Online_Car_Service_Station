package com.wheely.dto;

import lombok.Data;
import lombok.ToString;

import java.util.Set;

@ToString
@Data
public class BookingRequestDTO {
    private Long userId;
    private Long carId;
    private Long addressId;
    private Long mechanicId;
    private Set<Long> serviceIds;
    private Double totalAmount;
}
