package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.dto.response.PostRevisionResponse;
import com.aicoresolution.backend.entity.CmsUser;
import com.aicoresolution.backend.entity.Post;
import com.aicoresolution.backend.entity.PostRevision;
import com.aicoresolution.backend.repository.CmsUserRepository;
import com.aicoresolution.backend.repository.PostRepository;
import com.aicoresolution.backend.repository.PostRevisionRepository;
import com.aicoresolution.backend.service.IPostRevisionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PostRevisionService implements IPostRevisionService {

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

    @Override
    @Transactional
    public PostRevisionResponse createRevision(Long postId, String changeNote, Long editorId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        CmsUser editor = cmsUserRepository.findById(editorId)
                .orElseThrow(() -> new EntityNotFoundException("Editor not found"));

        PostRevision revision = PostRevision.builder()
                .postId(postId)
                .title(post.getTitle())
                .excerpt(post.getExcerpt())
                .content(post.getContent())
                .metaTitle(post.getMetaTitle())
                .metaDescription(post.getMetaDescription())
                .changeNote(changeNote)
                .editedBy(editor)
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(revisionRepository.save(revision));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostRevisionResponse> getRevisionsByPostId(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return revisionRepository.findByPostId(postId, pageable).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public PostRevisionResponse getRevisionById(Long revisionId) {
        PostRevision revision = revisionRepository.findById(revisionId)
                .orElseThrow(() -> new EntityNotFoundException("Revision not found"));
        return toResponse(revision);
    }

    private PostRevisionResponse toResponse(PostRevision revision) {
        return PostRevisionResponse.builder()
                .id(revision.getId())
                .postId(revision.getPostId())
                .title(revision.getTitle())
                .excerpt(revision.getExcerpt())
                .content(revision.getContent())
                .metaTitle(revision.getMetaTitle())
                .metaDescription(revision.getMetaDescription())
                .changeNote(revision.getChangeNote())
                .editedById(revision.getEditedBy() != null ? revision.getEditedBy().getId() : null)
                .editedByFullName(revision.getEditedBy() != null ? revision.getEditedBy().getFullName() : null)
                .createdAt(revision.getCreatedAt())
                .build();
    }
}
