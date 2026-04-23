package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.Post;
import com.aicoresolution.backend.entity.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    boolean existsBySlugIgnoreCase(String slug);

    Optional<Post> findBySlugIgnoreCase(String slug);

    Page<Post> findByStatusOrderByPublishedAtDesc(PostStatus status, Pageable pageable);

    Optional<Post> findBySlugIgnoreCaseAndStatus(String slug, PostStatus status);

    // Additional query methods for filtering
    Page<Post> findByStatusAndFeaturedTrue(PostStatus status, Pageable pageable);

    Page<Post> findByStatusAndLocale(PostStatus status, String locale, Pageable pageable);

    Page<Post> findByAuthorId(Long authorId, Pageable pageable);

    Page<Post> findByStatusAndAuthorId(PostStatus status, Long authorId, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.status = :status AND p.publishedAt >= :fromDate AND p.publishedAt <= :toDate ORDER BY p.publishedAt DESC")
    Page<Post> findByStatusAndPublishedAtBetween(@Param("status") PostStatus status,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.status = :status AND p.deletedAt IS NULL ORDER BY p.publishedAt DESC")
    Page<Post> findPublishedNotDeleted(@Param("status") PostStatus status, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.deletedAt IS NULL ORDER BY p.updatedAt DESC")
    Page<Post> findAllNotDeleted(Pageable pageable);
}
