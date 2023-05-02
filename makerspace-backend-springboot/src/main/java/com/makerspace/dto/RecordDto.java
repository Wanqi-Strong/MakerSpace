package com.makerspace.dto;

import com.makerspace.entity.Record;

import java.sql.Timestamp;

public class RecordDto {

    private Record record;

    private Long serviceId;

    private Timestamp startDate;

    private Timestamp endDate;


   public RecordDto(){

    }

    public Record getRecord() {
        return record;
    }

    public void setRecord(Record record) {
        this.record = record;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
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
}
