package com.makerspace.service;

import com.makerspace.entity.Record;

public interface RecordService {

    public Iterable<Record> getAllRecord();

    public String addRecord(Record record,long serviceId);

    public Record updateRecord(Record record, long userId);
}
