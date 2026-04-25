package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.response.PostRevisionResponse;
import org.springframework.data.domain.Page;

public interface IPostRevisionService {
    PostRevisionResponse createRevision(Long postId, String changeNote, Long editorId);
    Page<PostRevisionResponse> getRevisionsByPostId(Long postId, int page, int size);
    PostRevisionResponse getRevisionById(Long revisionId);
}
