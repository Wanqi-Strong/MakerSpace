package com.makerspace.service.impl;

import com.makerspace.dao.CheckoutRepository;
import com.makerspace.dao.EquipmentRepository;
import com.makerspace.dao.RecordRepository;
import com.makerspace.entity.Checkout;
import com.makerspace.entity.Equipment;
import com.makerspace.entity.Record;
import com.makerspace.responseModels.ShelfCurrentLoansResponse;
import com.makerspace.service.EquipmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class EquipmentServiceImpl implements EquipmentService {

    private EquipmentRepository equipmentRepository;
    private CheckoutRepository checkoutRepository;
    private RecordRepository recordRepository;

    public EquipmentServiceImpl(EquipmentRepository equipmentRepository, CheckoutRepository checkoutRepository,
                                RecordRepository recordRepository){
        this.equipmentRepository = equipmentRepository;
        this.checkoutRepository = checkoutRepository;
        this.recordRepository = recordRepository;
    }

    @Override
    public Equipment checkoutEquipment(String userEmail, Long equipmentId) throws Exception {

        Optional<Equipment> equipment = equipmentRepository.findById(equipmentId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndEquipmentId(userEmail, equipmentId);

        if (!equipment.isPresent() || validateCheckout != null || equipment.get().getCopiesAvailable() <= 0) {
            throw new Exception("Equipment doesn't exist or already checked out by user");
        }

        equipment.get().setCopiesAvailable(equipment.get().getCopiesAvailable() - 1);
        equipmentRepository.save(equipment.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                equipment.get().getId()
        );

        checkoutRepository.save(checkout);
        return equipment.get();
    }

    @Override
    public Boolean checkoutEquipmentByUser(String userEmail, Long equipmentId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndEquipmentId(userEmail, equipmentId);
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findRecordsByUserEmail(userEmail).size();
    }

    @Override
    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {

        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findRecordsByUserEmail(userEmail);

        List<Long> equipmentIdList = new ArrayList<>();

        for (Checkout i : checkoutList) {
            equipmentIdList.add(i.getEquipmentId());
        }

        Iterable<Equipment> equipments = equipmentRepository.findAllById(equipmentIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Equipment equipment : equipments) {
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getEquipmentId() == equipment.getId()).findFirst();

            if (checkout.isPresent()) {

                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(),
                        TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(equipment, (int) difference_In_Time));
            }
        }
        return shelfCurrentLoansResponses;
    }

    @Override
    public void returnEquipment (String userEmail, Long equipmentId, Long studentId) throws Exception {

        Optional<Equipment> equipment = equipmentRepository.findById(equipmentId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndEquipmentId(userEmail, equipmentId);

        if (!equipment.isPresent() || validateCheckout == null) {
            throw new Exception("Equipment does not exist or not checked out by user");
        }

        equipment.get().setCopiesAvailable(equipment.get().getCopiesAvailable() + 1);

        equipmentRepository.save(equipment.get());
        checkoutRepository.deleteById(validateCheckout.getId());

        Record record = new Record(
                userEmail,
                studentId,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                equipment.get().getStatus()
        );

        recordRepository.save(record);
    }

    @Override
    public void renewLoan(String userEmail, Long equipmentId) throws Exception {

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndEquipmentId(userEmail, equipmentId);

        if (validateCheckout == null) {
            throw new Exception("Equipment does not exist or not checked out by user");
        }

        SimpleDateFormat sdFormat = new SimpleDateFormat("yyy-MM-dd");

        Date d1 = sdFormat.parse(validateCheckout.getReturnDate());
        Date d2 = sdFormat.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }
    }

}
