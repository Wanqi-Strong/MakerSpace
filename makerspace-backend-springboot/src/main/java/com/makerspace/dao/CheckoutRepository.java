package com.makerspace.dao;

import com.makerspace.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndEquipmentId(String userEmail, Long recordId);

    List<Checkout> findRecordsByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where book_id in :record_id")
    void deleteAllByBookId(@Param("book_id") Long recordId);
}
