package com.makerspace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * @author Wanqi Chen
 * User class refers to data in user table, which is for admin platform.
 */

@Entity
@Table(name="user")
@JsonIgnoreProperties(allowSetters = true, value = {"userPwd","status"})
@DynamicUpdate
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long userId;

    @NotBlank(message = "name cannot be null")
    @Size(min=1, max=16,message = "name length should between 1~16")
    private String userName;

    @NotBlank(message = "email cannot be null")
    @Email(message = "please use correct email format")
    private String userEmail;

    @NotBlank(message = "password cannot be null")
//  @Size(min=6, max=18,message = "password length should between 6~18")
    private String userPwd;

    private int status;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Facility> facilityList;

    public User() {}

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

//    public List<Facility> getFacilityList() {
//        return facilityList;
//    }
//
//    public void setFacilityList(List<Facility> facilityList) {
//        this.facilityList = facilityList;
//    }

    public User(String userName, String userEmail, String userPwd, int status) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPwd = userPwd;
        this.status = status;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPwd='" + userPwd + '\'' +
                ", status=" + status +
                '}';
    }
}

