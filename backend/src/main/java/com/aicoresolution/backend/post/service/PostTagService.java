package com.aicoresolution.backend.post.service;

import com.aicoresolution.backend.post.entity.PostTag;
import com.aicoresolution.backend.post.entity.PostTagId;
import com.aicoresolution.backend.post.repository.PostRepository;
import com.aicoresolution.backend.post.repository.PostTagRepository;
import com.aicoresolution.backend.tag.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostTagService {

    private final PostTagRepository postTagRepository;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    public PostTagService(PostTagRepository postTagRepository,
            PostRepository postRepository,
            TagRepository tagRepository) {
        this.postTagRepository = postTagRepository;
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional
    public void addTag(Long postId, Long tagId) {
        postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        tagRepository.findById(tagId)
                .orElseThrow(() -> new EntityNotFoundException("Tag not found"));

        PostTagId id = new PostTagId();
        id.setPostId(postId);
        id.setTagId(tagId);

        if (!postTagRepository.findByIdPostIdAndIdTagId(postId, tagId).isPresent()) {
            PostTag postTag = new PostTag();
            postTag.setId(id);
            postTag.setCreatedAt(LocalDateTime.now());
            postTagRepository.save(postTag);
        }
    }

    @Transactional
    public void removeTag(Long postId, Long tagId) {
        PostTagId id = new PostTagId();
        id.setPostId(postId);
        id.setTagId(tagId);
        postTagRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Long> getTagIdsByPostId(Long postId) {
        return postTagRepository.findByIdPostId(postId)
                .stream()
                .map(pt -> pt.getId().getTagId())
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeAllTags(Long postId) {
        postTagRepository.deleteByIdPostId(postId);
    }

    @Transactional
    public void setTags(Long postId, List<Long> tagIds) {
        removeAllTags(postId);
        for (Long tagId : tagIds) {
            addTag(postId, tagId);
        }
    }
}
