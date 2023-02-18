package com.makerspace.controller;

import com.makerspace.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/records")
public class RecordController {
    private RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping("/secure/add/record")
    public void postRecord(@RequestHeader(value = "Authorization") String token,
                           @RequestBody Record recordRequest) {
    }
}
