package com.makerspace.dao;

import com.makerspace.entity.Facility;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends CrudRepository<Facility,Integer> {

    Facility findByServiceId(Long serviceId);

    Facility findByServiceName(String serviceName);
}
