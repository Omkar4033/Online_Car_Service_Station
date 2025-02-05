package com.blogs.dto;

import com.blogs.pojos.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {

    private String name;
    private String email;
    private String phoneNo;
    private String address;
    private String password;
    private String role;
}
