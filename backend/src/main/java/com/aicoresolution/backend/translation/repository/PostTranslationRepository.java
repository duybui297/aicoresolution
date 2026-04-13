package com.aicoresolution.backend.translation.repository;

import com.aicoresolution.backend.translation.entity.PostTranslation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostTranslationRepository extends JpaRepository<PostTranslation, Long> {
    List<PostTranslation> findByPostId(Long postId);

    Page<PostTranslation> findByPostId(Long postId, Pageable pageable);

    Optional<PostTranslation> findByPostIdAndLocale(Long postId, String locale);
}
