package com.makerspace.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "record")
@Data
public class Record {
    public Record(){}

    public Record(String firstName, String lastName, String userEmail, Long studentId,
                  String reason, String createDate, String updateDate, int status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
        this.studentId = studentId;
        this.reason = reason;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "reason")
    private String reason;

    @Column(name = "create_date")
    private String createDate;

    @Column(name = "update_date")
    private String updateDate;

    @Column(name = "status")
    private int status;
}
