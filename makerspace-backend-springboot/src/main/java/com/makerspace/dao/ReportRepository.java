package com.makerspace.dao;

import com.makerspace.entity.Record;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;

public interface ReportRepository extends CrudRepository<Record,Long> {
    @Query(value = "SELECT  count(*) AS sum,service_type AS type " +
            "FROM record as r " +
            "LEFT JOIN services AS s " +
            "ON r.service_id = s.service_id " +
            "WHERE MONTH(r.start_date) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(r.start_date) = YEAR(CURRENT_DATE()) " +
            "GROUP BY s.service_type;",nativeQuery = true)
    List<Map> getMonthSummary();

    @Query(value = "SELECT  count(*) AS sum,service_type AS type, month(r.start_date) AS month " +
            "FROM record AS r " +
            "LEFT JOIN services AS s " +
            "ON r.service_id = s.service_id " +
            "WHERE r.start_date > DATE_SUB(now(), INTERVAL ?1 MONTH) " +
            "GROUP BY s.service_type, month(r.start_date);",nativeQuery = true)
    List<Map> getSummaryForMonth(int month);
}
