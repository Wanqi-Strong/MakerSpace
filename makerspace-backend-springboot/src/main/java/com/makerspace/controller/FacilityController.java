package com.makerspace.controller;

import com.makerspace.base.Result;
import com.makerspace.dto.FacilityDto;
import com.makerspace.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("services")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    @PostMapping("/add")
    public Result addFacility(@RequestBody FacilityDto facilityDto){
        return  Result.success(facilityService.addFacility(facilityDto.getFacility(),facilityDto.getUserId()));
    }

    @PostMapping("/all")
    public Result<Iterable> getAllFacility(){
        return Result.success(facilityService.getAllFacility());
    }

    @PostMapping("/update")
    public Result updateFacility(@RequestBody FacilityDto facilityDto ){
        return Result.success(facilityService.updateFacility(facilityDto.getFacility(),facilityDto.getUserId()));
    }
}
