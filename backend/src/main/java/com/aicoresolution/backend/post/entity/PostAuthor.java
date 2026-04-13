package com.aicoresolution.backend.post.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "post_authors")
public class PostAuthor {
    @EmbeddedId
    private PostAuthorId id;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "post_author_role")
    private PostAuthorRole role = PostAuthorRole.CO_AUTHOR;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    public PostAuthorId getId() {
        return id;
    }

    public void setId(PostAuthorId id) {
        this.id = id;
    }

    public PostAuthorRole getRole() {
        return role;
    }

    public void setRole(PostAuthorRole role) {
        this.role = role;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
