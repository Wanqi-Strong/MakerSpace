package com.makerspace.service.impl;

import com.makerspace.dao.ReportRepository;
import com.makerspace.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository reportRepository;
    @Override
    public List<Map> getMonthSummary() {
        return reportRepository.getMonthSummary();
    }

    @Override
    public List<Map> getSummaryForMonth(int month){
        // get all list
        List<Map> res = reportRepository.getSummaryForMonth(month);
        Set<Integer> hash_Set = new HashSet<>();
        for (Map item: res)
            {
                hash_Set.add((int) item.get("month"));
            }
        // build month map
        List<Map> ans = new ArrayList<>();
        for (int i:hash_Set) {
            Map<String,Integer> map = new HashMap<>();
            map.put("month",i);
            map.put("equipment",0);
            map.put("workshop",0);
            map.put("studio",0);
            ans.add(map);
        }
        // count sum for each month
        for (Map i:res) {
            for (Map i1:ans) {
                if((int)i.get("month") == (int)i1.get("month")){
                    int sum =  (int) (long) i.get("sum");
                   if((Integer) i.get("type")==1){
                       i1.put("equipment",(int)i1.get("equipment")+sum);
                   }else if ((Integer) i.get("type")==2){
                       i1.put("workshop",(int)i1.get("workshop")+sum);
                   }else{
                       i1.put("studio",(int)i1.get("studio")+sum);
                   }
                }
            }
        }
        return ans;
    }
}
