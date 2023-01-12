package com.project.api.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.api.entities.Brand;
import com.project.api.entities.VideoCard;

import jakarta.validation.constraints.NotNull;

public class BrandDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull(message = "O nome da marca deve ser informado.")
    private String name;

    private Set<VideoCardDTO> videoCards = new HashSet<>();

    public BrandDTO() {
    }

    public BrandDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public BrandDTO(Brand entity) {
        this.id = entity.getId();
        this.name = entity.getName();
    }

    public BrandDTO(Brand entity, Set<VideoCard> videoCards) {
        this(entity);
        videoCards.forEach(vc -> this.videoCards.add(new VideoCardDTO(vc)));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonIgnoreProperties("brand")
    public Set<VideoCardDTO> getVideoCards() {
        return videoCards;
    }

    public void setVideoCards(Set<VideoCardDTO> videoCards) {
        this.videoCards = videoCards;
    }

}
