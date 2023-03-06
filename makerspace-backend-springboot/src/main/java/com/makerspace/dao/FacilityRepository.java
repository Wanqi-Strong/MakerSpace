package com.makerspace.dao;

import com.makerspace.entity.Facility;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Wanqi Chen
 * FacilityRepository interface help apply SQL for services table.
 */

@Repository
public interface FacilityRepository extends CrudRepository<Facility, Integer> {

    /**
     * query one service by id
     *
     * @param serviceId the id of service
     * @return Facility one service
     */
    Facility findByServiceId(Long serviceId);

    /**
     * query one service by name
     *
     * @param serviceName the name of service
     * @return Facility one service
     */
    Facility findByServiceName(String serviceName);


    /**
     * query one service by type
     *
     * @param serviceType the name of service
     * @return Facility one service
     */
    List<Facility> findByServiceType(int serviceType);
}
