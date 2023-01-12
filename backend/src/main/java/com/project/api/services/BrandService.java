package com.project.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.api.dto.BrandDTO;
import com.project.api.entities.Brand;
import com.project.api.repositories.BrandRepository;
import com.project.api.services.exceptions.DatabaseException;
import com.project.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BrandService {
    @Autowired
    public BrandRepository repository;

    @Transactional(readOnly = true)
    public Page<BrandDTO> findAllPaged(PageRequest pageRequest) {
        Page<Brand> list = repository.findAll(pageRequest);
        return list.map(x -> new BrandDTO(x, x.getVideoCards()));
    }

    @Transactional(readOnly = true)
    public BrandDTO findById(Long id) {
        Optional<Brand> obj = repository.findById(id);
        Brand entity = obj.orElseThrow(() -> new ResourceNotFoundException("Marca não encontrada."));
        return new BrandDTO(entity, entity.getVideoCards());
    }

    @Transactional
    public BrandDTO insert(BrandDTO dto) {
        Brand entity = new Brand();
        entity.setName(dto.getName());

        entity = repository.save(entity);
        return new BrandDTO(entity);
    }

    @Transactional
    public BrandDTO update(Long id, BrandDTO dto) {
        try {
            Brand entity = repository.getReferenceById(id);
            entity.setName(dto.getName());
            entity = repository.save(entity);
            return new BrandDTO(entity);
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
}
