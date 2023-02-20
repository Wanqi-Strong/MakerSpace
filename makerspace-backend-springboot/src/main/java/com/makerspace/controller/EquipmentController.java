package com.makerspace.controller;

import com.makerspace.entity.Equipment;
import com.makerspace.responseModels.ShelfCurrentLoansResponse;
import com.makerspace.service.EquipmentService;
import com.makerspace.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class EquipmentController {

    private EquipmentService equipmentService;

    @Autowired
    public EquipmentController(EquipmentService equipmentService) { this.equipmentService = equipmentService; }

    @GetMapping("/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value="Authorization") String token)
            throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return equipmentService.currentLoans(userEmail);
    }

    @GetMapping("/currentloans/count")
    public int currentLoansCount(@RequestHeader(value="Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return equipmentService.currentLoansCount(userEmail);
    }

    @GetMapping("/ischeckedout/byuser")
    public Boolean checkoutEquipmentByUser(@RequestHeader(value="Authorization") String token,
                                      @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return equipmentService.checkoutEquipmentByUser(userEmail, bookId);
    }

    @PutMapping("/checkout/equipment")
    public Equipment checkoutEquipment (@RequestHeader(value="Authorization") String token,
                                   @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return equipmentService.checkoutEquipment(userEmail, bookId);
    }

    @PutMapping("/return")
    public void returnEquipment (@RequestHeader(value="Authorization") String token,
                            @RequestParam Long equipmentId, Long studentId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        equipmentService.returnEquipment(userEmail, equipmentId, studentId);
    }

    @PutMapping("/renew/loan")
    public void renewLoan (@RequestHeader(value="Authorization") String token,
                           @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        equipmentService.renewLoan(userEmail, bookId);
    }
}
