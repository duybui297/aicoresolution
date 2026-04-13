package com.aicoresolution.backend.post.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "post_media")
public class PostMedia {
    @EmbeddedId
    private PostMediaId id;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "media_role")
    private MediaRole role = MediaRole.CONTENT;

    public PostMediaId getId() {
        return id;
    }

    public void setId(PostMediaId id) {
        this.id = id;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public MediaRole getRole() {
        return role;
    }

    public void setRole(MediaRole role) {
        this.role = role;
    }
}
