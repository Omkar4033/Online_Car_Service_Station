
package com.wheely.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
    private String company;
    private String model;
    private String fuelType;
    private String registration;
    private Long userId;
    
    
}
