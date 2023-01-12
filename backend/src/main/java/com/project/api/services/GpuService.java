package com.project.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.api.dto.GpuDTO;
import com.project.api.entities.Gpu;
import com.project.api.repositories.GpuRepository;
import com.project.api.services.exceptions.DatabaseException;
import com.project.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GpuService {

    @Autowired
    private GpuRepository repository;

    @Transactional(readOnly = true)
    public Page<GpuDTO> findAllPaged(PageRequest pageRequest) {
        Page<Gpu> list = repository.findAll(pageRequest);
        return list.map(x -> new GpuDTO(x, x.getVideoCards()));
    }

    @Transactional(readOnly = true)
    public GpuDTO findById(Long id) {
        Optional<Gpu> obj = repository.findById(id);
        Gpu entity = obj.orElseThrow(() -> new ResourceNotFoundException("Gpu não encontrada."));
        return new GpuDTO(entity, entity.getVideoCards());
    }

    @Transactional
    public GpuDTO insert(GpuDTO dto) {
        Gpu entity = new Gpu();
        dtoDataToEntity(dto, entity);
        entity = repository.save(entity);
        return new GpuDTO(entity);
    }

    @Transactional
    public GpuDTO update(Long id, GpuDTO dto) {
        try {
            Gpu entity = repository.getReferenceById(id);
            dtoDataToEntity(dto, entity);
            return new GpuDTO(entity);
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

    private void dtoDataToEntity(GpuDTO dto, Gpu entity) {
        entity.setName(dto.getName());
        entity.setManufacturer(dto.getManufacturer());
        entity.setMemorySizeGb(dto.getMemorySizeGb());
        entity.setMemoryType(dto.getMemoryType());
    }
}
