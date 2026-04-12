package com.aicoresolution.backend.post.repository;

import com.aicoresolution.backend.post.entity.Post;
import com.aicoresolution.backend.post.entity.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {

    boolean existsBySlugIgnoreCase(String slug);

    Optional<Post> findBySlugIgnoreCase(String slug);

    Page<Post> findByStatusOrderByPublishedAtDesc(PostStatus status, Pageable pageable);

    Optional<Post> findBySlugIgnoreCaseAndStatus(String slug, PostStatus status);
}
