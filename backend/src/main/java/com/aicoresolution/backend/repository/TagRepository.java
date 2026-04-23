package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findBySlugIgnoreCase(String slug);

    boolean existsBySlugIgnoreCase(String slug);
}
