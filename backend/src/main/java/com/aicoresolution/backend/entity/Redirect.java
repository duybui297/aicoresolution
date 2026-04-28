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
@Table(name = "redirects", indexes = {
        @Index(name = "idx_redirects_from_path", columnList = "from_path")
})
public class Redirect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_path", nullable = false, unique = true, length = 500)
    private String fromPath;

    @Column(name = "to_path", nullable = false, length = 500)
    private String toPath;

    @Column(name = "status_code")
    @Builder.Default
    private Short statusCode = 301;

    @Column(name = "hit_count")
    @Builder.Default
    private Long hitCount = 0L;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(length = 255)
    private String note;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
