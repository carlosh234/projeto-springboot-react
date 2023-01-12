package com.project.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.api.entities.VideoCard;

public interface VideoCardRepository extends JpaRepository<VideoCard, Long> {

}
