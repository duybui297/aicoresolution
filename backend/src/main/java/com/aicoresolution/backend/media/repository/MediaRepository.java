package com.aicoresolution.backend.media.repository;

import com.aicoresolution.backend.media.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
