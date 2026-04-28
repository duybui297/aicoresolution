package com.aicoresolution.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "post_authors")
@IdClass(PostAuthorId.class)
public class PostAuthor {
    @Id
    @Column(name = "post_id")
    private Long postId;

    @Id
    @Column(name = "user_id")
    private Long userId;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "post_author_role")
    @Builder.Default
    private PostAuthorRole role = PostAuthorRole.CO_AUTHOR;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;
}
