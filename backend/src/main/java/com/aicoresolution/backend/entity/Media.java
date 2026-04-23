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
@Table(name = "media", indexes = {
        @Index(name = "idx_media_file_url", columnList = "file_url")
})
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "mime_type", nullable = false, length = 100)
    private String mimeType;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(columnDefinition = "INT")
    private Integer width;

    @Column(columnDefinition = "INT")
    private Integer height;

    @Column(name = "alt_text", length = 300)
    private String altText;

    @Column(length = 500)
    private String caption;

    @Column(name = "title_attr", length = 300)
    private String titleAttr;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by")
    private CmsUser uploadedBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
