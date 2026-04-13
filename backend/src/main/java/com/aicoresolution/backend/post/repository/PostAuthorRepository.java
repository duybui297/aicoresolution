package com.aicoresolution.backend.post.repository;

import com.aicoresolution.backend.post.entity.PostAuthor;
import com.aicoresolution.backend.post.entity.PostAuthorId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostAuthorRepository extends JpaRepository<PostAuthor, PostAuthorId> {
}
