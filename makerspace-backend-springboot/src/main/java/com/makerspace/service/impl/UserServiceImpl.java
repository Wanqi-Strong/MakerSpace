package com.makerspace.service.impl;

import com.makerspace.base.MakerSpaceException;
import com.makerspace.dao.UserRepository;
import com.makerspace.entity.User;
import com.makerspace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User verifyUser(User user) {
        User currentUser= userRepository.findByUserEmail(user.getUserEmail());
        if(currentUser == null) {
            throw new MakerSpaceException("user does not exist");
        }else {
            // compare password
            if(passwordEncoder.matches( user.getUserPwd(),currentUser.getUserPwd())) {
                return currentUser;
            }else {
                throw new MakerSpaceException("incorrect password");
            }
        }
    }

    @Override
    public User addUser(User user) {
        // check if email already used
        String email = user.getUserEmail();
        User registerUser = userRepository.findByUserEmail(email);
        if(registerUser != null && registerUser.getStatus() == 1) {
            throw new MakerSpaceException("email already registered");
        }
        // set status
        user.setStatus(1);
        user.setUserPwd(passwordEncoder.encode(user.getUserPwd()));
        userRepository.save(user);
        return userRepository.findByUserEmail(email);
    }

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User deleteUser(User user) {
        User  currentUser= userRepository.findByUserEmail(user.getUserEmail());
        if(currentUser == null) {
            throw new MakerSpaceException("user does not exist");
        }else {
            // update
            currentUser.setStatus(0);
            userRepository.save(currentUser);
            return userRepository.findByUserEmail(currentUser.getUserEmail());
        }
    }
}
