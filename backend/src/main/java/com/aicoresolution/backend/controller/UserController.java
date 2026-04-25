package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.request.UpdateProfileRequest;
import com.aicoresolution.backend.dto.response.UserResponse;
import com.aicoresolution.backend.security.AuthenticatedUser;
import com.aicoresolution.backend.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok(userService.getCurrentUserProfile(user.id()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request,
                                                      Authentication authentication) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok(userService.updateProfile(user.id(), request));
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponse> patchProfile(@RequestBody UpdateProfileRequest request,
                                                      Authentication authentication) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok(userService.updateProfile(user.id(), request));
    }
}
