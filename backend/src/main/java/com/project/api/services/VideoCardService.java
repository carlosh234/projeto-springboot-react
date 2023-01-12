package com.project.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.api.dto.VideoCardDTO;
import com.project.api.entities.Brand;
import com.project.api.entities.Gpu;
import com.project.api.entities.VideoCard;
import com.project.api.repositories.BrandRepository;
import com.project.api.repositories.GpuRepository;
import com.project.api.repositories.VideoCardRepository;
import com.project.api.services.exceptions.DatabaseException;
import com.project.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VideoCardService {

    @Autowired
    private VideoCardRepository repository;

    @Autowired
    private GpuRepository gpuRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Transactional(readOnly = true)
    public Page<VideoCardDTO> findAllPaged(PageRequest pageRequest) {
        Page<VideoCard> list = repository.findAll(pageRequest);
        return list.map(x -> new VideoCardDTO(x, x.getGpu(), x.getBrand()));
    }

    @Transactional(readOnly = true)
    public VideoCardDTO findById(Long id) {
        Optional<VideoCard> obj = repository.findById(id);
        VideoCard entity = obj.orElseThrow(() -> new ResourceNotFoundException("Placa de vídeo não encontrada."));
        return new VideoCardDTO(entity, entity.getGpu(), entity.getBrand());
    }

    @Transactional
    public VideoCardDTO insert(VideoCardDTO dto) {
        VideoCard entity = new VideoCard();

        dtoDataToEntity(dto, entity);

        entity = repository.save(entity);
        return new VideoCardDTO(entity);
    }

    @Transactional
    public VideoCardDTO update(Long id, VideoCardDTO dto) {
        try {
            VideoCard entity = repository.getReferenceById(id);
            dtoDataToEntity(dto, entity);
            return new VideoCardDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id não encontrado: " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id não encontrado: " + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Violação de integridade");
        }
    }

    private void dtoDataToEntity(VideoCardDTO dto, VideoCard entity) {
        entity.setModel(dto.getModel());
        entity.setSpecs(dto.getSpecs());
        entity.setPrice(dto.getPrice());

        Brand brand = brandRepository.getReferenceById(dto.getBrand().getId());
        Gpu gpu = gpuRepository.getReferenceById(dto.getGpu().getId());

        entity.setBrand(brand);
        entity.setGpu(gpu);

    }

}
