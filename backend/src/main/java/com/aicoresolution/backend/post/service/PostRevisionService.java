package com.aicoresolution.backend.post.service;

import com.aicoresolution.backend.post.dto.PostRevisionResponse;
import com.aicoresolution.backend.post.entity.Post;
import com.aicoresolution.backend.post.entity.PostRevision;
import com.aicoresolution.backend.post.repository.PostRepository;
import com.aicoresolution.backend.post.repository.PostRevisionRepository;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PostRevisionService {

    private final PostRevisionRepository revisionRepository;
    private final PostRepository postRepository;
    private final CmsUserRepository cmsUserRepository;

    public PostRevisionService(PostRevisionRepository revisionRepository,
            PostRepository postRepository,
            CmsUserRepository cmsUserRepository) {
        this.revisionRepository = revisionRepository;
        this.postRepository = postRepository;
        this.cmsUserRepository = cmsUserRepository;
    }

    @Transactional
    public PostRevisionResponse createRevision(Long postId, String changeNote, Long editorId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        CmsUser editor = cmsUserRepository.findById(editorId)
                .orElseThrow(() -> new EntityNotFoundException("Editor not found"));

        PostRevision revision = new PostRevision();
        revision.setPostId(postId);
        revision.setTitle(post.getTitle());
        revision.setExcerpt(post.getExcerpt());
        revision.setContent(post.getContent());
        revision.setMetaTitle(post.getMetaTitle());
        revision.setMetaDescription(post.getMetaDescription());
        revision.setChangeNote(changeNote);
        revision.setEditedBy(editor);
        revision.setCreatedAt(LocalDateTime.now());

        return toResponse(revisionRepository.save(revision));
    }

    @Transactional(readOnly = true)
    public Page<PostRevisionResponse> getRevisionsByPostId(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return revisionRepository.findByPostId(postId, pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public PostRevisionResponse getRevisionById(Long revisionId) {
        PostRevision revision = revisionRepository.findById(revisionId)
                .orElseThrow(() -> new EntityNotFoundException("Revision not found"));
        return toResponse(revision);
    }

    private PostRevisionResponse toResponse(PostRevision revision) {
        PostRevisionResponse response = new PostRevisionResponse();
        response.setId(revision.getId());
        response.setPostId(revision.getPostId());
        response.setTitle(revision.getTitle());
        response.setExcerpt(revision.getExcerpt());
        response.setContent(revision.getContent());
        response.setMetaTitle(revision.getMetaTitle());
        response.setMetaDescription(revision.getMetaDescription());
        response.setChangeNote(revision.getChangeNote());
        response.setEditedById(revision.getEditedBy() != null ? revision.getEditedBy().getId() : null);
        response.setCreatedAt(revision.getCreatedAt());
        return response;
    }
}
