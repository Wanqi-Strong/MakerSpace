package com.makerspace.dto;

import com.makerspace.entity.Facility;

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
