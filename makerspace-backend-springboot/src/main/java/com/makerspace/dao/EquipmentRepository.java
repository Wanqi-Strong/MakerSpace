package com.makerspace.dao;

import com.makerspace.entity.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


public interface EquipmentRepository extends CrudRepository<Equipment, Long> {

    Page<Equipment> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Equipment> findByCategory(@RequestParam("category") String category, Pageable pageable);

//    @Query("select e from Equipment e where id in :equipment_ids")
//    List<Equipment> findEquipmentByEquipmentIds(@Param("equipment_ids") List<Long> equipmentId);
}
