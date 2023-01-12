package com.project.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.api.entities.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {

}
