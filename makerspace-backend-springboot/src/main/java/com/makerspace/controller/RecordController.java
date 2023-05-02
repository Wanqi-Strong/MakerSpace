package com.makerspace.controller;

import com.makerspace.base.Result;
import com.makerspace.dto.RecordDto;
import com.makerspace.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("record")
public class RecordController {

    @Autowired
    private RecordService recordService;

    @PostMapping("/all")
    public Result<Iterable> getAllRecord(){
        return Result.success(recordService.getAllRecord());
    }

    @PostMapping("/add")
    public Result addRecord(@RequestBody RecordDto recordDto){
        return Result.success(recordService.addRecord(recordDto.getRecord(),recordDto.getServiceId()));
    }

    @PostMapping("/allByIdAndTime")
    public Result<Iterable> getRecordByIdAndTime(@RequestBody RecordDto recordDto){
        return Result.success(recordService.getRecordBySidAndDate(recordDto.getServiceId(),recordDto.getStartDate(),recordDto.getEndDate()));
    }
}
