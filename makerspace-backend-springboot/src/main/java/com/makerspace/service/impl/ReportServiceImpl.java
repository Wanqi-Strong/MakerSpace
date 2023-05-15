package com.makerspace.service.impl;

import com.makerspace.dao.ReportRepository;
import com.makerspace.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository reportRepository;
    @Override
    public List<Map> getMonthSummary() {
        return reportRepository.getMonthSummary();
    }
}
