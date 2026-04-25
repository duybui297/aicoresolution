package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.PostRevision;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRevisionRepository extends JpaRepository<PostRevision, Long> {
    Page<PostRevision> findByPostId(Long postId, Pageable pageable);
}
