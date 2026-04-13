package com.aicoresolution.backend.post.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PostCategoryId implements Serializable {
    @Column(name = "post_id")
    private Long postId;

    @Column(name = "category_id")
    private Long categoryId;

    public PostCategoryId() {
    }

    public PostCategoryId(Long postId, Long categoryId) {
        this.postId = postId;
        this.categoryId = categoryId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public int hashCode() {
        return postId.hashCode() ^ categoryId.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        PostCategoryId that = (PostCategoryId) obj;
        return postId.equals(that.postId) && categoryId.equals(that.categoryId);
    }
}
