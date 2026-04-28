package com.aicoresolution.backend.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostTagId implements Serializable {
    private Long postId;
    private Long tagId;
}
