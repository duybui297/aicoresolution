package com.aicoresolution.backend.post.service;

import com.aicoresolution.backend.category.repository.CategoryRepository;
import com.aicoresolution.backend.post.entity.PostCategory;
import com.aicoresolution.backend.post.entity.PostCategoryId;
import com.aicoresolution.backend.post.repository.PostCategoryRepository;
import com.aicoresolution.backend.post.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostCategoryService {

    private final PostCategoryRepository postCategoryRepository;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    public PostCategoryService(PostCategoryRepository postCategoryRepository,
            PostRepository postRepository,
            CategoryRepository categoryRepository) {
        this.postCategoryRepository = postCategoryRepository;
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public void addCategory(Long postId, Long categoryId, Boolean isPrimary) {
        postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (isPrimary != null && isPrimary) {
            postCategoryRepository.findPrimaryCategory(postId).ifPresent(pc -> {
                pc.setIsPrimary(false);
                postCategoryRepository.save(pc);
            });
        }

        PostCategoryId id = new PostCategoryId();
        id.setPostId(postId);
        id.setCategoryId(categoryId);

        PostCategory postCategory = new PostCategory();
        postCategory.setId(id);
        postCategory.setIsPrimary(isPrimary != null && isPrimary);
        postCategory.setCreatedAt(LocalDateTime.now());

        postCategoryRepository.save(postCategory);
    }

    @Transactional
    public void removeCategory(Long postId, Long categoryId) {
        PostCategoryId id = new PostCategoryId();
        id.setPostId(postId);
        id.setCategoryId(categoryId);
        postCategoryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Long> getCategoryIdsByPostId(Long postId) {
        return postCategoryRepository.findByIdPostId(postId)
                .stream()
                .map(pc -> pc.getId().getCategoryId())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Long getPrimaryCategoryId(Long postId) {
        return postCategoryRepository.findPrimaryCategory(postId)
                .map(pc -> pc.getId().getCategoryId())
                .orElse(null);
    }

    @Transactional
    public void removeAllCategories(Long postId) {
        postCategoryRepository.deleteByIdPostId(postId);
    }
}
