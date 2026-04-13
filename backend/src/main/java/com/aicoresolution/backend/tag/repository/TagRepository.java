package com.aicoresolution.backend.tag.repository;

import com.aicoresolution.backend.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findBySlugIgnoreCase(String slug);

    boolean existsBySlugIgnoreCase(String slug);
}
