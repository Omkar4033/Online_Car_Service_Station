package com.wheely.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wheely.dto.AuthResp;
import com.wheely.dto.UserLoginRequestDTO;
import com.wheely.dto.UserRegistrationDTO;
import com.wheely.dto.UserUpdateDTO;
//import com.wheely.pojos.Car;
import com.wheely.pojos.User;
import com.wheely.pojos.UserRole;
import com.wheely.security.JwtUtils;
import com.wheely.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
	private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequestDTO loginRequest) {

        
        UsernamePasswordAuthenticationToken authenticationToken;
	
			authenticationToken = new UsernamePasswordAuthenticationToken
			(loginRequest.getEmail(),loginRequest.getPassword());
		
		System.out.println(authenticationToken.isAuthenticated());
		Authentication authToken = 
				authenticationManager.authenticate(authenticationToken);
		//=> auth success
		System.out.println(authToken.isAuthenticated());
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new AuthResp("Successful Auth !",
						jwtUtils.generateJwtToken(authToken)));		
		
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody @Valid UserRegistrationDTO registrationDTO) {
        try {
            // Convert DTO to User entity
            User newUser = new User();
            newUser.setName(registrationDTO.getName());
            newUser.setEmail(registrationDTO.getEmail());
            newUser.setPhoneNo(registrationDTO.getPhoneNo());

            // Hash the password using BCrypt
            String hashedPassword = passwordEncoder.encode(registrationDTO.getPassword());
            newUser.setPassword(hashedPassword);

            // Handle role conversion
            try {
                newUser.setRole(UserRole.valueOf(registrationDTO.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request if role is invalid
            }

            // Register user
            User registeredUser = userService.registerUser(newUser);

            // If registration is successful, return the User object with HTTP Status CREATED
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error if an exception occurs
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
            return new ResponseEntity<>(result, HttpStatus.OK);  
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);  // 404 Not Found if user does not exist
        }

    }
    
}
    
    