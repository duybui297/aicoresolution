package com.aicoresolution.backend.user.repository;

import com.aicoresolution.backend.user.entity.CmsUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CmsUserRepository extends JpaRepository<CmsUser, UUID> {

    Optional<CmsUser> findByUsername(String username);
}
