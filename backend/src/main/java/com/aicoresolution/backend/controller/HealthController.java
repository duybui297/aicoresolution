package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.common.headers.HeaderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    private static final Logger logger = LoggerFactory.getLogger(HealthController.class);

    @GetMapping
    public Map<String, String> health() {
        String requestId = HeaderUtils.getRequestId();
        logger.debug("Health check - RequestID: {}", requestId);
        return Map.of("status", "ok");
    }
}
