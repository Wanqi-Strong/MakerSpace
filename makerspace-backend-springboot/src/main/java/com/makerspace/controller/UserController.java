package com.makerspace.controller;

import com.makerspace.base.Result;
import com.makerspace.entity.User;
import com.makerspace.service.UserService;
import com.makerspace.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Wanqi Chen
 * UserController class provide api for user table.
 */

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserServiceImpl userServiceImpl;

    /**
     * verify one user by email and password
     *
     * @param user user info
     * @return Result one user
     */
    @PostMapping("/login")
    public Result verifyUser(@RequestBody User user) {
        return Result.success(userService.verifyUser(user));
    }

    /**
     * add one user
     *
     * @param user user info
     * @return Result one user
     */
    @PostMapping("/add")
    public Result addUser(@RequestBody @Valid User user) {
        return Result.success(userService.addUser(user));
    }

    /**
     * query all users
     *
     * @return Result list of all user
     */
    @PostMapping("/all")
    public Result<Iterable> getAllUsers() {
        return Result.success(userService.getAllUsers());
    }

    /**
     * delete one user
     *
     * @param user user info
     * @return Result one user
     */
    @PostMapping("/delete")
    public Result deleteUser(@RequestBody User user) {
        return Result.success(userService.deleteUser(user));
    }
}

