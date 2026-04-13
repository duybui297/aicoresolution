package com.aicoresolution.backend.user.repository;

import com.aicoresolution.backend.user.entity.CmsUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CmsUserRepository extends JpaRepository<CmsUser, Long> {
    Optional<CmsUser> findByUsername(String username);

    Optional<CmsUser> findByEmail(String email);
}
