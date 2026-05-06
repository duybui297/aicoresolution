package com.aicoresolution.backend.task;

import com.aicoresolution.backend.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PostTask {

    private static final Logger logger = LoggerFactory.getLogger(PostTask.class);
    private final PostRepository postRepository;

    public PostTask(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /**
     * Tác vụ tự động quét và đăng các bài viết đã đến giờ hẹn.
     * Chạy mỗi 1 phút (60000ms).
     */
    @Scheduled(fixedRate = 60000)
    public void publishScheduledPosts() {
        LocalDateTime now = LocalDateTime.now();
        logger.debug("Checking for scheduled posts to publish at {}", now);
        
        int updatedCount = postRepository.publishScheduledPosts(now);
        
        if (updatedCount > 0) {
            logger.info("Successfully published {} scheduled posts at {}", updatedCount, now);
        }
    }
}
