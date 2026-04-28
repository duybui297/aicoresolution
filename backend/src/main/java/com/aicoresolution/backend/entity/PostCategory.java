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
@Table(name = "post_categories")
@IdClass(PostCategoryId.class)
public class PostCategory {
    @Id
    @Column(name = "post_id")
    private Long postId;

    @Id
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "is_primary")
    @Builder.Default
    private Boolean isPrimary = false;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
