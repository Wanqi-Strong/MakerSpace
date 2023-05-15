package com.makerspace.controller;

import com.makerspace.base.Result;
import com.makerspace.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author Wanqi Chen
 * ReportController class provide api for report.
 */

@RestController
@RequestMapping("report")
public class ReportController {
    @Autowired
    ReportService reportService;
    @PostMapping("/monthSummary")
    public Result getMonthSummary() {
        return Result.success(reportService.getMonthSummary());
    }

    @PostMapping("/summaryForMonth")
    public Result getSummaryForMonth(@RequestBody Map<String, Integer> requestParams) {
        return Result.success(reportService.getSummaryForMonth(requestParams.get("month")));
    }
}
