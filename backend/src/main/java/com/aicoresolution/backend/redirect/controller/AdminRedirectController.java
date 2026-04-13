package com.aicoresolution.backend.redirect.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.redirect.dto.RedirectRequest;
import com.aicoresolution.backend.redirect.dto.RedirectResponse;
import com.aicoresolution.backend.redirect.service.RedirectService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/redirects")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
public class AdminRedirectController {

    private final RedirectService redirectService;

    public AdminRedirectController(RedirectService redirectService) {
        this.redirectService = redirectService;
    }

    @GetMapping
    public ResponseEntity<Page<RedirectResponse>> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(redirectService.list(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RedirectResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(redirectService.getById(id));
    }

    @PostMapping
    public ResponseEntity<RedirectResponse> create(@Valid @RequestBody RedirectRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(redirectService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RedirectResponse> update(@PathVariable Long id,
            @Valid @RequestBody RedirectRequest request) {
        return ResponseEntity.ok(redirectService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        redirectService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Redirect deleted"));
    }
}
