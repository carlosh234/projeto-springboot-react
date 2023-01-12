package com.project.api.dto;

import java.io.Serial;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.api.entities.Brand;
import com.project.api.entities.Gpu;
import com.project.api.entities.VideoCard;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class VideoCardDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull(message = "O modelo da placa de vídeo deve ser informado.")
    private String model;

    @NotNull(message = "As especifícações da placa de vídeo devem ser informadas.")
    private String specs;

    @Positive(message = "O preço deve ter um valor positivo.")
    @NotNull(message = "O preço da placa de vídeo deve ser informado.")
    private Double price;

    @NotNull(message = "O id da gpu deve ser informado.")
    private GpuDTO gpu;

    @JsonIgnoreProperties("videoCards")
    @NotNull(message = "O id da marca deve ser informado.")
    private BrandDTO brand;

    public VideoCardDTO() {
    }

    public VideoCardDTO(VideoCard entity) {
        this.id = entity.getId();
        this.model = entity.getModel();
        this.specs = entity.getSpecs();
        this.price = entity.getPrice();
        this.brand = new BrandDTO(entity.getBrand());
        this.gpu = new GpuDTO(entity.getGpu());
    }

    public VideoCardDTO(VideoCard entity, Gpu gpu) {
        this.id = entity.getId();
        this.model = entity.getModel();
        this.specs = entity.getSpecs();
        this.price = entity.getPrice();
        this.gpu = new GpuDTO(gpu);
    }

    public VideoCardDTO(VideoCard entity, Brand brand) {
        this.id = entity.getId();
        this.model = entity.getModel();
        this.specs = entity.getSpecs();
        this.price = entity.getPrice();
        this.brand = new BrandDTO(brand);
    }

    public VideoCardDTO(VideoCard entity, Gpu gpu, Brand brand) {
        this.id = entity.getId();
        this.model = entity.getModel();
        this.specs = entity.getSpecs();
        this.price = entity.getPrice();
        this.gpu = new GpuDTO(gpu);
        this.brand = new BrandDTO(brand);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @JsonIgnoreProperties(value = "videoCards")
    public GpuDTO getGpu() {
        return gpu;
    }

    public void setGpu(GpuDTO gpu) {
        this.gpu = gpu;
    }

    public BrandDTO getBrand() {
        return brand;
    }

    public void setBrand(BrandDTO brand) {
        this.brand = brand;
    }

}
