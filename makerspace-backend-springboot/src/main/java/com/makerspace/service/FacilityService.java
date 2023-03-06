package com.makerspace.service;

import com.makerspace.entity.Facility;

/**
 * @author Wanqi Chen
 * FacilityService interface provide abstraction rule.
 */

public interface FacilityService {

    public Iterable<Facility> getAllFacility();

    public Iterable<Facility> getAllFacilityByType(int type);

    public Facility addFacility(Facility facility,long userId);

    public Facility updateFacility(Facility facility,long userId);

    public Facility deleteFacility(Facility facility, long userId);

}
