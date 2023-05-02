package com.makerspace.service;

import com.makerspace.entity.Record;

import java.sql.Timestamp;

public interface RecordService {

    public Iterable<Record> getAllRecord();

    public String addRecord(Record record,long serviceId);

    public Record updateRecord(Record record, long userId);

    public Iterable<Record> getRecordBySidAndDate(long serviceId, Timestamp start,Timestamp end);
}
