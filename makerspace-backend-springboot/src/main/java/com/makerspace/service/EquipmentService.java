package com.makerspace.service;

import com.makerspace.entity.Equipment;
import com.makerspace.responseModels.ShelfCurrentLoansResponse;

import java.util.List;

public interface EquipmentService {
    public Equipment checkoutEquipment(String userEmail, Long bookId) throws Exception;

    public Boolean checkoutEquipmentByUser(String userEmail, Long bookId);

    public int currentLoansCount(String userEmail);

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception;

    public void returnEquipment (String userEmail, Long equipmentId, Long studentId) throws Exception;

    public void renewLoan(String userEmail, Long bookId) throws Exception;
}
