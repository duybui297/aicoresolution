package com.aicoresolution.backend.post.repository;

import com.aicoresolution.backend.post.entity.PostCategory;
import com.aicoresolution.backend.post.entity.PostCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostCategoryRepository extends JpaRepository<PostCategory, PostCategoryId> {

    List<PostCategory> findByIdPostId(Long postId);

    List<PostCategory> findByIdCategoryId(Long categoryId);

    Optional<PostCategory> findByIdPostIdAndIdCategoryId(Long postId, Long categoryId);

    @Query("SELECT pc FROM PostCategory pc WHERE pc.id.postId = :postId AND pc.isPrimary = true")
    Optional<PostCategory> findPrimaryCategory(@Param("postId") Long postId);

    void deleteByIdPostId(Long postId);
}
