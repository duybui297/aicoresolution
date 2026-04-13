package com.aicoresolution.backend.post.repository;

import com.aicoresolution.backend.post.entity.PostMedia;
import com.aicoresolution.backend.post.entity.PostMediaId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostMediaRepository extends JpaRepository<PostMedia, PostMediaId> {
}
