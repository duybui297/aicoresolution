package com.aicoresolution.backend.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostCategoryId implements Serializable {
    private Long postId;
    private Long categoryId;
}
