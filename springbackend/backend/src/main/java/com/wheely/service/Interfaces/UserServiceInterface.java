package com.wheely.service.interfaces;

import com.wheely.dto.UserUpdateDTO;
import com.wheely.pojos.User;

public interface UserServiceInterface {
    User authenticateUser(String email, String password);
    User registerUser(User newUser);
    String removeUser(Long id);
    String updateUserDetails(UserUpdateDTO userUpdateDTO, Long id);
    User getUserById(Long id);
}
