package com.aicoresolution.backend.tag.controller;

import com.aicoresolution.backend.tag.dto.TagResponse;
import com.aicoresolution.backend.tag.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tags")
public class PublicTagController {

    private final TagService tagService;

    public PublicTagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<Page<TagResponse>> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(tagService.list(page, size));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<TagResponse> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(tagService.getBySlug(slug));
    }
}
