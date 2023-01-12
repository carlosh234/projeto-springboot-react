package com.project.api.dto;

import java.io.Serial;
import java.io.Serializable;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.api.entities.Gpu;
import com.project.api.entities.VideoCard;
import com.project.api.entities.enums.Manufacturer;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class GpuDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull(message = "O nome da GPU deve ser informado.")
    private String name;

    @Positive(message = "A quantidade de VRAM deve ter um valor positivo.")
    @NotNull(message = "A quantidade de VRAM deve ser informada.")
    private Integer memorySizeGb;

    @NotNull(message = "O tipo de memória deve ser informado.")
    private String memoryType;

    @NotNull(message = "O fabricante deve ser informado.")
    private Manufacturer manufacturer;

    private Set<VideoCardDTO> videoCards = new HashSet<>();

    public GpuDTO() {
    }

    public GpuDTO(Gpu entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.memorySizeGb = entity.getMemorySizeGb();
        this.memoryType = entity.getMemoryType();
        this.manufacturer = entity.getManufacturer();
    }

    public GpuDTO(Gpu entity, Set<VideoCard> videoCards) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.memorySizeGb = entity.getMemorySizeGb();
        this.memoryType = entity.getMemoryType();
        this.manufacturer = entity.getManufacturer();
        videoCards.forEach(v -> this.videoCards.add(new VideoCardDTO(v, v.getBrand())));
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

    public Integer getMemorySizeGb() {
        return memorySizeGb;
    }

    public void setMemorySizeGb(Integer memorySizeGb) {
        this.memorySizeGb = memorySizeGb;
    }

    public String getMemoryType() {
        return memoryType;
    }

    public void setMemoryType(String memoryType) {
        this.memoryType = memoryType;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    @JsonIgnoreProperties({ "gpu" })
    public Set<VideoCardDTO> getVideoCards() {
        return videoCards;
    }

}
