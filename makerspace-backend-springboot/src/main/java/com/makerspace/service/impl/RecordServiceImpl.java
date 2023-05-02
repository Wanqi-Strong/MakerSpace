package com.makerspace.service.impl;

import com.makerspace.base.MakerSpaceException;
import com.makerspace.dao.FacilityRepository;
import com.makerspace.dao.RecordRepository;
import com.makerspace.dao.UserRepository;
import com.makerspace.entity.Facility;
import com.makerspace.entity.Record;
import com.makerspace.entity.User;
import com.makerspace.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {
    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    private User checkOperator(long userId) {
        User user = userRepository.findById(userId).get();
        if (user.getStatus() == 0 || user == null) {
            throw new MakerSpaceException("user does not exist");
        }
        return user;
    }

    @Override
    public Iterable<Record> getAllRecord() {
        return recordRepository.findAll();
    }

    @Override
    public String addRecord(Record record,long serviceId) {
        String msg = "";
        // check service
        Facility facility = facilityRepository.findByServiceId(serviceId);
        if(facility == null){
            msg = "service does not exist";
        }else{
            List<Record> records = recordRepository.findRecordByTimeRange(record.getStartDate(),record.getEndDate());
            if(records.isEmpty()){
                record.setFacility(facility);
                record.setState(1);
                record.setStatus(1);
                recordRepository.save(record);
                msg = "applied successfully";
            }else{
                for(Record recordItem: records){
                    System.out.println(recordItem.getFacility());
                    if (recordItem.getFacility().getServiceId() == serviceId) {
                        msg = "time conflict";
                        break;
                    }
                }
                record.setFacility(facility);
                record.setState(1);
                record.setStatus(1);
                recordRepository.save(record);
            }
        }
        return msg;
    }

    @Override
    public Record updateRecord(Record record, long userId) {
        User user = checkOperator(userId);
        Record current = recordRepository.findByRecordId(record.getRecordId());
        if (current == null) {
            throw new MakerSpaceException("record does not exist");
        } else {
            recordRepository.save(record);
        }
        return recordRepository.findByRecordId(record.getRecordId());
    }

    @Override
    public Iterable<Record> getRecordBySidAndDate(long serviceId, Timestamp start, Timestamp end){
        return recordRepository.findRecordBySidAndDate(serviceId,start,end);
    }
}
