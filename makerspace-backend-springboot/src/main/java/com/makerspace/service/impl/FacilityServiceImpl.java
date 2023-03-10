package com.makerspace.service.impl;

import com.makerspace.base.MakerSpaceException;
import com.makerspace.dao.FacilityRepository;
import com.makerspace.dao.UserRepository;
import com.makerspace.entity.Facility;
import com.makerspace.entity.User;
import com.makerspace.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @author Wanqi Chen
 * FacilityServiceImpl class apply deal with data from database.
 */

@Service
public class FacilityServiceImpl implements FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private UserRepository userRepository;

    private User checkOperator(long userId) {
        User user = userRepository.findById(userId).get();
        if (user.getStatus() == 0 || user == null) {
            throw new MakerSpaceException("user does not exist");
        }
        return user;
    }

    @Override
    public Iterable<Facility> getAllFacility() {
        return facilityRepository.findAll();
    }

    @Override
    public Iterable<Facility> getAllFacilityByType(int type) {
        return facilityRepository.findByServiceTypeAndStatus(type, 1);
    }

    @Override
    public Facility addFacility(Facility facility, long userId, MultipartFile file) throws IOException {
        User user = checkOperator(userId);
        facility.setStatus(1);
        facility.setUser(user);
        // handle file
        if (file != null) {
            facility.setPicture(file.getBytes());
        }
        facilityRepository.save(facility);
        return facilityRepository.findByServiceName(facility.getServiceName());
    }

    @Override
    public Facility updateFacility(Facility facility, long userId, MultipartFile file) throws IOException {
        User user = checkOperator(userId);
        Facility current = facilityRepository.findByServiceId(facility.getServiceId());
        if (current == null) {
            throw new MakerSpaceException("service does not exist");
        } else {
            // handle file
            if (file != null) {
                facility.setPicture(file.getBytes());
            }
            facility.setUser(user);
            facilityRepository.save(facility);
            return facilityRepository.findByServiceId(facility.getServiceId());
        }
    }

    @Override
    public Facility deleteFacility(Facility facility, long userId) {
        User user = checkOperator(userId);
        Facility current = facilityRepository.findByServiceId(facility.getServiceId());
        if (current == null) {
            throw new MakerSpaceException("service does not exist");
        } else {
            facility.setStatus(0);
            facility.setUser(user);
            facilityRepository.save(facility);
            return facilityRepository.findByServiceId(facility.getServiceId());
        }
    }
}
