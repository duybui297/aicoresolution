package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.PostMedia;
import com.aicoresolution.backend.entity.PostMediaId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostMediaRepository extends JpaRepository<PostMedia, PostMediaId> {
    List<PostMedia> findByPostId(Long postId);
    List<PostMedia> findByPostIdIn(java.util.List<Long> postIds);
    void deleteByPostId(Long postId);
}
