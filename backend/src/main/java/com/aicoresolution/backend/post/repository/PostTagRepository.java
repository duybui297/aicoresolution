package com.aicoresolution.backend.post.repository;

import com.aicoresolution.backend.post.entity.PostTag;
import com.aicoresolution.backend.post.entity.PostTagId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostTagRepository extends JpaRepository<PostTag, PostTagId> {

    List<PostTag> findByIdPostId(Long postId);

    List<PostTag> findByIdTagId(Long tagId);

    Optional<PostTag> findByIdPostIdAndIdTagId(Long postId, Long tagId);

    void deleteByIdPostId(Long postId);
}
