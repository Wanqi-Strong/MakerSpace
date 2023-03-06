package com.makerspace.dto;

import com.makerspace.entity.Facility;

/**
 * @author Wanqi Chen
 * FacilityDto class help handle parameters for FacilityController.
 * The format of request is {userId:"",facility:{}}
 */

public class FacilityDto {

    private Facility facility;

    private long userId;

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
}
