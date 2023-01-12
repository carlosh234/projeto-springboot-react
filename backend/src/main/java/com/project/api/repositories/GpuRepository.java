package com.project.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.api.entities.Gpu;

public interface GpuRepository extends JpaRepository<Gpu, Long> {

}
