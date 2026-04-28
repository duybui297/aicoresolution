package com.aicoresolution.backend.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostAuthorId implements Serializable {
    private Long postId;
    private Long userId;
}
