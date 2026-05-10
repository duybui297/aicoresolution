package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.PostTranslation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostTranslationRepository extends JpaRepository<PostTranslation, Long> {
    Page<PostTranslation> findByPostId(Long postId, Pageable pageable);
    Optional<PostTranslation> findByPostIdAndLocale(Long postId, String locale);
    List<PostTranslation> findByPostIdInAndLocale(Collection<Long> postIds, String locale);
    boolean existsBySlugIgnoreCase(String slug);
}
