package com.makerspace.service;

import java.util.List;
import java.util.Map;

/**
 * @author Wanqi Chen
 * ReportService interface provide abstraction rule.
 */
public interface ReportService {
    public List<Map> getMonthSummary();

    public List<Map> getSummaryForMonth(int month);
}
