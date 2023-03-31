package com.makerspace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.annotations.DynamicUpdate;

import java.sql.Timestamp;
import java.util.List;

/**
 * @author Wanqi Chen
 * Facility class refers to data in services table.
 * equipment has service_type equals to 1.
 */

@Entity
@Table(name="services")
@DynamicUpdate
public class Facility {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long serviceId;

    @NotBlank
    private String serviceName;

    private int status;

    private int category;

    private int serviceType;

    private int active;

    private String description;

    private String location;

    private Timestamp startDate;

    private Timestamp endDate;

    private byte[] picture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operator_id", nullable = false,referencedColumnName = "userId")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "facility",fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Record> recordList;


    public Facility() {
    }

    public long getServiceId() {
        return serviceId;
    }

    public void setServiceId(long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getServiceType() {
        return serviceType;
    }

    public void setServiceType(int serviceType) {
        this.serviceType = serviceType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public List<Record> getRecordList() {
        return recordList;
    }

    public void setRecordList(List<Record> recordList) {
        this.recordList = recordList;
    }

    @Override
    public String toString() {
        return "Facility{" +
                "serviceId=" + serviceId +
                ", serviceName='" + serviceName + '\'' +
                ", status=" + status +
                ", category=" + category +
                ", serviceType=" + serviceType +
                ", active=" + active +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
