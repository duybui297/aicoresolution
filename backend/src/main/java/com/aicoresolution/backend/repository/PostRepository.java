package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.Post;
import com.aicoresolution.backend.entity.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE posts SET status = 'PUBLISHED'::post_status, " +
           "published_at = scheduled_at, updated_at = :now " +
           "WHERE status = 'SCHEDULED'::post_status " +
           "AND scheduled_at <= :now", nativeQuery = true)
    int publishScheduledPosts(@Param("now") LocalDateTime now);

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

    @Query("SELECT p FROM Post p WHERE p.status = :status AND p.deletedAt IS NULL")
    Page<Post> findPublishedNotDeleted(@Param("status") PostStatus status, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.deletedAt IS NULL")
    Page<Post> findAllNotDeleted(Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.status = :status AND p.deletedAt IS NULL")
    Page<Post> findByStatusAndDeletedAtIsNull(@Param("status") PostStatus status, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Post p WHERE p.status = :status AND p.deletedAt IS NULL AND (:locale IS NULL OR p.locale = :locale OR EXISTS (SELECT 1 FROM PostTranslation t WHERE t.postId = p.id AND t.locale = :locale))")
    Page<Post> findPublishedNotDeletedByLocale(@Param("status") PostStatus status, @Param("locale") String locale, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.status = :status AND p.deletedAt IS NULL AND (LOWER(p.slug) = LOWER(:slug) OR EXISTS (SELECT 1 FROM PostTranslation t WHERE t.postId = p.id AND LOWER(t.slug) = LOWER(:slug)))")
    Optional<Post> findBySlugOrTranslationSlugAndStatus(@Param("slug") String slug, @Param("status") PostStatus status);
}
