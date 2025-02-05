package com.wheely.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class ServiceDTO {
    private Long serviceId;
    private String name;
    private String description;
    private Double price;
    private Long categoryId;
    
    
}