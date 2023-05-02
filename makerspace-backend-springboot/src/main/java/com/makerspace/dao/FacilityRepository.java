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
     * query services by type
     *
     * @param serviceType the type of service
     * @return Facility one service
     */
    List<Facility> findByServiceType(int serviceType);

    /**
     * query services by type with status
     *
     * @param serviceType the type of service
     * @return Facility one service
     */
    List<Facility> findByServiceTypeAndStatus(int serviceType, int status);

    /**
     * query one service by type with status
     *
     * @param serviceType the type of service
     * @param active the active of service
     * @return Facility one service
     */
    List<Facility> findByServiceTypeAndActiveAndStatus(int serviceType,int active,int status);
}
