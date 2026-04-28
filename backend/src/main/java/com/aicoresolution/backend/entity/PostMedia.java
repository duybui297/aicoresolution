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
@Table(name = "post_media")
@IdClass(PostMediaId.class)
public class PostMedia {
    @Id
    @Column(name = "post_id")
    private Long postId;

    @Id
    @Column(name = "media_id")
    private Long mediaId;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "media_role")
    @Builder.Default
    private MediaRole role = MediaRole.CONTENT;
}
