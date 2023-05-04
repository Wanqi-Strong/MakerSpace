package com.makerspace.dao;

import com.makerspace.entity.Facility;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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
     * query equipment only, the status is default as 1
     *
     * @return Facility equipment list
     */
    @Query("select f from Facility f where (f.serviceType = 1 or f.serviceType = 3) and f.status = 1")
    List<Facility> findAllEquipment();

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
