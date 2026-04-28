package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.PostAuthor;
import com.aicoresolution.backend.entity.PostAuthorId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostAuthorRepository extends JpaRepository<PostAuthor, PostAuthorId> {
    List<PostAuthor> findByPostId(Long postId);
    void deleteByPostId(Long postId);
}
