package com.urbanbite.repository;

import com.urbanbite.model.CalorieInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CalorieInfoRepository extends JpaRepository<CalorieInfo, Long> {
}
