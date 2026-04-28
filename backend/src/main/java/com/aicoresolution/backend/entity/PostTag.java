package com.aicoresolution.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "post_tags")
@IdClass(PostTagId.class)
public class PostTag {
    @Id
    @Column(name = "post_id")
    private Long postId;

    @Id
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
