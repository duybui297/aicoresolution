package com.aicoresolution.backend.redirect.controller;

import com.aicoresolution.backend.redirect.dto.RedirectResponse;
import com.aicoresolution.backend.redirect.service.RedirectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/redirects")
public class PublicRedirectController {

    private final RedirectService redirectService;

    public PublicRedirectController(RedirectService redirectService) {
        this.redirectService = redirectService;
    }

    @GetMapping("/{fromPath}/**")
    public ResponseEntity<?> redirect(@PathVariable String fromPath) {
        try {
            RedirectResponse redirect = redirectService.getByFromPath("/" + fromPath);
            redirectService.incrementHitCount("/" + fromPath);

            if (!redirect.getIsActive()) {
                return ResponseEntity.status(404).build();
            }

            return ResponseEntity
                    .status(redirect.getStatusCode())
                    .header("Location", redirect.getToPath())
                    .build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
