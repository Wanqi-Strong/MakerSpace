package com.makerspace.dto;

import com.makerspace.entity.Record;

public class RecordDto {

    private Record record;

    private Long serviceId;
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
}
