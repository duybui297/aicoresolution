package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.PostCategory;
import com.aicoresolution.backend.entity.PostCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostCategoryRepository extends JpaRepository<PostCategory, PostCategoryId> {
    List<PostCategory> findByPostId(Long postId);
    void deleteByPostId(Long postId);
}
