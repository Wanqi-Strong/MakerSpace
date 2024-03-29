package com.makerspace.dao;

import com.makerspace.entity.Record;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface RecordRepository extends CrudRepository<Record, Long> {
    Record findByRecordId(Long recordId);

    List<Record> findAllByOrderByStartDate();

    @Query("select r from Record r where " +
            "((r.startDate  >= :startDate and r.startDate <= :endDate) " +
            "or (r.startDate <= :startDate and r.endDate >=:endDate)" +
            "or (r.endDate >=:startDate and r.endDate <= :endDate))"
    )
    List<Record> findRecordByTimeRange(@Param("startDate")Timestamp startDate,@Param("endDate")Timestamp endDate);

    @Query(value = "select * from record where service_id = ?1 and state = ?2",nativeQuery = true)
    List<Record> findRecordBySidAndState(Long serviceId,int state);

    @Query(value = "select * from record where service_id = ?1 and (start_date >= ?2 and end_date<= ?3)",nativeQuery = true)
    List<Record> findRecordBySidAndDate(Long serviceId,Timestamp start,Timestamp end);
}
