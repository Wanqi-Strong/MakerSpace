package com.makerspace.dto;

import com.makerspace.entity.Facility;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Wanqi Chen
 * FacilityDto class help handle parameters for FacilityController.
 * The format of request is {userId:"",facility:{}}
 */

public class FacilityDto {

    private Facility facility;

    private long userId;

    private MultipartFile file;

    public FacilityDto() {
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
