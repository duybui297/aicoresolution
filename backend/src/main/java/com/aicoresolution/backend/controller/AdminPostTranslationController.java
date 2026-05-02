package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.dto.request.PostTranslationRequest;
import com.aicoresolution.backend.dto.response.PostTranslationResponse;
import com.aicoresolution.backend.service.IPostTranslationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/posts/{postId}/translations")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
public class AdminPostTranslationController {

    private final IPostTranslationService translationService;

    public AdminPostTranslationController(IPostTranslationService translationService) {
        this.translationService = translationService;
    }

    @GetMapping
    public ResponseEntity<Page<PostTranslationResponse>> list(@PathVariable Long postId,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(translationService.listByPostId(postId, page, size));
    }

    @GetMapping("/{locale}")
    public ResponseEntity<PostTranslationResponse> getByLocale(@PathVariable Long postId,
                                                               @PathVariable String locale) {
        return ResponseEntity.ok(translationService.getByPostAndLocale(postId, locale));
    }

    @PostMapping
    public ResponseEntity<PostTranslationResponse> create(@PathVariable Long postId,
                                                          @Valid @RequestBody PostTranslationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(translationService.create(request));
    }

    @PutMapping("/{locale}")
    public ResponseEntity<PostTranslationResponse> update(@PathVariable Long postId,
                                                          @PathVariable String locale,
                                                          @Valid @RequestBody PostTranslationRequest request) {
        return ResponseEntity.ok(translationService.update(postId, locale, request));
    }

    @PatchMapping("/{locale}")
    public ResponseEntity<PostTranslationResponse> patch(@PathVariable Long postId,
                                                          @PathVariable String locale,
                                                          @RequestBody PostTranslationRequest request) {
        return ResponseEntity.ok(translationService.update(postId, locale, request));
    }

    @DeleteMapping("/{locale}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long postId,
                                              @PathVariable String locale) {
        translationService.delete(postId, locale);
        return ResponseEntity.ok(new ApiResponse(true, "Translation deleted"));
    }
}
