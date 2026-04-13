package com.aicoresolution.backend.media.entity;

import com.aicoresolution.backend.user.entity.CmsUser;
import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    // Getters/setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getTitleAttr() {
        return titleAttr;
    }

    public void setTitleAttr(String titleAttr) {
        this.titleAttr = titleAttr;
    }

    public CmsUser getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(CmsUser uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
