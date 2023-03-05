package com.makerspace.service;

import com.makerspace.entity.Facility;

public interface FacilityService {

    public Iterable<Facility> getAllFacility();

    public Facility addFacility(Facility facility,long userId);

    public Facility updateFacility(Facility facility,long userId);

    public Facility deleteFacility(Facility facility);

}
