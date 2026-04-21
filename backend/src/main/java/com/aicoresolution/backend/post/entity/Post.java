package com.aicoresolution.backend.post.entity;

import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.category.entity.Category;
import com.aicoresolution.backend.tag.entity.Tag;
import com.aicoresolution.backend.media.entity.Media;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "posts", indexes = {
        @Index(name = "idx_posts_slug", columnList = "slug", unique = true),
        @Index(name = "idx_posts_status_published_at", columnList = "status,published_at")
})
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(length = 500)
    private String excerpt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "content_format", columnDefinition = "content_format_enum")
    private ContentFormat contentFormat = ContentFormat.HTML;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "thumbnail_alt", length = 300)
    private String thumbnailAlt;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false, columnDefinition = "post_status")
    private PostStatus status = PostStatus.DRAFT;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "meta_title", length = 160)
    private String metaTitle;

    @Column(name = "meta_description", length = 300)
    private String metaDescription;

    @Column(name = "meta_keywords", length = 500)
    private String metaKeywords;

    @Column(name = "canonical_url", length = 500)
    private String canonicalUrl;

    @Builder.Default
    @Column(name = "robots_meta", length = 50)
    private String robotsMeta = "index,follow";

    @Column(name = "og_title", length = 200)
    private String ogTitle;

    @Column(name = "og_description", length = 500)
    private String ogDescription;

    @Column(name = "og_image", length = 500)
    private String ogImage;

    @Builder.Default
    @Column(name = "og_type", length = 50)
    private String ogType = "article";
    @Builder.Default

    @Column(name = "twitter_card", length = 50)
    private String twitterCard = "summary_large_image";

    @Column(name = "twitter_title", length = 200)
    private String twitterTitle;

    @Column(name = "twitter_description", length = 500)
    private String twitterDescription;

    @Column(name = "twitter_image", length = 500)
    private String twitterImage;
    @Builder.Default

    @Column(name = "schema_type", length = 50)
    private String schemaType = "NewsArticle";

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "schema_json", columnDefinition = "jsonb")
    private Map<String, Object> schemaJson;

    @Column(length = 10)
    @Builder.Default
    private String locale = "vi-VN";

    @Column(name = "reading_time")
    private Integer readingTime;

    @Column(name = "word_count")
    private Integer wordCount;

    @Column(name = "view_count")
    @Builder.Default
    private Long viewCount = 0L;

    @Column(name = "comment_count")
    @Builder.Default
    private Integer commentCount = 0;

    @Column(name = "featured")
    @Builder.Default
    private Boolean featured = false;

    @Column(name = "allow_comments")
    @Builder.Default
    private Boolean allowComments = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private CmsUser author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private CmsUser createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private CmsUser updatedBy;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "post_categories", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    @Builder.Default
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @Builder.Default
    private Set<Tag> tags = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "post_media", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "media_id"))
    @Builder.Default
    private Set<Media> media = new HashSet<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
