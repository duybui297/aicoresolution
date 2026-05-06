package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import com.aicoresolution.backend.dto.request.CreateUserRequest;
import com.aicoresolution.backend.dto.request.UpdateUserRequest;
import com.aicoresolution.backend.dto.response.UserResponse;
import com.aicoresolution.backend.service.IUserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserController.class);
    private final IUserService userService;

    public AdminUserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> list(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        logger.info("Admin listing users - Page: {}, Size: {}", page, size);
        return ResponseEntity.ok(userService.listUsers(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody CreateUserRequest request) {
        logger.info("Admin creating user: {}", request.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id,
                                               @Valid @RequestBody UpdateUserRequest request) {
        logger.info("Admin updating user ID: {}", id);
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponse> patch(@PathVariable Long id,
                                               @RequestBody UpdateUserRequest request) {
        logger.info("Admin patching user ID: {}", id);
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        logger.info("Admin deleting user ID: {}", id);
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse(true, "User deleted"));
    }
}
