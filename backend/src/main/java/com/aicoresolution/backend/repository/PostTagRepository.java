package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.PostTag;
import com.aicoresolution.backend.entity.PostTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTag, PostTagId> {
    List<PostTag> findByPostId(Long postId);
    void deleteByPostId(Long postId);
}
