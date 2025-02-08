package com.wheely.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatusUpdateDTO {
    private String status;
    private Long mechanicId;
    private String customerPhoneNo;
	
}
