package com.makerspace.service;

import com.makerspace.entity.User;

public interface UserService {
    public User verifyUser(User user);

    public User addUser(User user);

    public Iterable<User> getAllUsers();

    public User deleteUser(User user);
}
