package com.aicoresolution.backend.post.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PostMediaId implements Serializable {
    @Column(name = "post_id")
    private Long postId;

    @Column(name = "media_id")
    private Long mediaId;

    public PostMediaId() {
    }

    public PostMediaId(Long postId, Long mediaId) {
        this.postId = postId;
        this.mediaId = mediaId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getMediaId() {
        return mediaId;
    }

    public void setMediaId(Long mediaId) {
        this.mediaId = mediaId;
    }

    @Override
    public int hashCode() {
        return postId.hashCode() ^ mediaId.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        PostMediaId that = (PostMediaId) obj;
        return postId.equals(that.postId) && mediaId.equals(that.mediaId);
    }
}
