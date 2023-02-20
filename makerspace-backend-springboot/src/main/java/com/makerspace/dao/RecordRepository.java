package com.makerspace.dao;

import com.makerspace.entity.Record;
import org.springframework.data.repository.CrudRepository;

public interface RecordRepository extends CrudRepository<Record, Long> {
}
