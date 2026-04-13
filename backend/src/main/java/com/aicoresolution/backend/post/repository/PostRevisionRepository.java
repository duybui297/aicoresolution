package com.aicoresolution.backend.post.repository;

import com.aicoresolution.backend.post.entity.PostRevision;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRevisionRepository extends JpaRepository<PostRevision, Long> {

    List<PostRevision> findByPostId(Long postId);

    Page<PostRevision> findByPostId(Long postId, Pageable pageable);
}
