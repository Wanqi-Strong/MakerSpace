package com.makerspace.controller;

import com.makerspace.base.Result;
import com.makerspace.dto.FacilityDto;
import com.makerspace.entity.Facility;
import com.makerspace.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * @author Wanqi Chen
 * FacilityController class provide api for services table.
 */

@RestController
@RequestMapping("services")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    /**
     * add facility
     *
     * @param userId   user id
     * @param picture  picture of facility
     * @param facility facility info
     * @return Result one facility
     */

    @PostMapping("/add")
    public Result addFacility(@RequestPart("userId") String userId, @RequestPart("picture") MultipartFile picture, @RequestPart("facility") Facility facility) throws IOException {
        return Result.success(facilityService.addFacility(facility, Long.parseLong(userId), picture));
    }

    /**
     * query all facility
     *
     * @return Result list of all facility
     */
    @PostMapping("/all")
    public Result<Iterable> getAllFacility() {
        return Result.success(facilityService.getAllFacility());
    }

    /**
     * query all facility by serviceType
     *
     * @param params serviceType
     * @return Result list of all facility
     */
    @PostMapping("/allByType")
    public Result<Iterable> getAllFacilityByType(@RequestBody Map params) {
        int type = (int) params.get("type");
        return Result.success(facilityService.getAllFacilityByType(type));
    }

    /**
     * update facility
     *
     * @param userId   user id
     * @param picture  picture of facility
     * @param facility facility info
     * @return Result one facility
     */
    @PostMapping("/update")
    public Result updateFacility(@RequestPart("userId") String userId, @RequestPart("picture") MultipartFile picture, @RequestPart("facility") Facility facility) throws IOException {
        return Result.success(facilityService.updateFacility(facility, Long.parseLong(userId), picture));
    }

    /**
     * delete facility logically
     *
     * @param facilityDto {facility info,userId}
     * @return Result one facility
     */
    @PostMapping("/delete")
    public Result deleteFacility(@RequestBody FacilityDto facilityDto) {
        return Result.success(facilityService.deleteFacility(facilityDto.getFacility(), facilityDto.getUserId()));
    }
}
