package com.blogs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.blogs.dto.UserUpdateDTO;
import com.blogs.dto.UserLoginRequestDTO;
import com.blogs.dto.UserRegistrationDTO;
import com.blogs.pojos.Car;
import com.blogs.pojos.User;
import com.blogs.pojos.UserRole;
import com.blogs.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // Login API
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserLoginRequestDTO loginRequest) {
        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);  // 200 OK with the User object
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);  // 401 Unauthorized if user is not valid
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        try {
            // Convert DTO to User entity
            User newUser = new User();
            newUser.setName(registrationDTO.getName());
            newUser.setEmail(registrationDTO.getEmail());
            newUser.setPhoneNo(registrationDTO.getPhoneNo());
            newUser.setAddress(registrationDTO.getAddress());
            newUser.setPassword(registrationDTO.getPassword());
            System.out.println(newUser);

            // Handle role conversion
            try {
                newUser.setRole(UserRole.valueOf(registrationDTO.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // 400 Bad Request if role is invalid
            }

            // Register user
            User registeredUser = userService.registerUser(newUser);

            // If registration is successful, return the User object with HTTP Status CREATED
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);  // 201 Created with the registered user object
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // 500 Internal Server Error if an exception occurs
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);  // Call the service method to get user by ID
        
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);  // 200 OK with the User object
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // 404 Not Found if the user does not exist
        }
    }


    // Update API - Update user details by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateDTO userUpdateDTO, @PathVariable Long id) {
        String result = userService.updateUserDetails(userUpdateDTO, id);
        if ("Updated Successfully!".equals(result)) {
            return new ResponseEntity<>(result, HttpStatus.OK);  // 200 OK
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);  // 404 Not Found if user does not exist
        }

    }
    
}
    
    
