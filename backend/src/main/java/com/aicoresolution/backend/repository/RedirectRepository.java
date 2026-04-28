package com.aicoresolution.backend.repository;

import com.aicoresolution.backend.entity.Redirect;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RedirectRepository extends JpaRepository<Redirect, Long> {
    Optional<Redirect> findByFromPath(String fromPath);
}
