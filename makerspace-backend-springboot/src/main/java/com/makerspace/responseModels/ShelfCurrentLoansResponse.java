package com.makerspace.responseModels;

import com.makerspace.entity.Equipment;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    public ShelfCurrentLoansResponse(Equipment equipment, int daysLeft) {
        this.equipment = equipment;
        this.daysLeft = daysLeft;
    }

    private Equipment equipment;

    private int daysLeft;
}
