package com.aicoresolution.backend.common.filters;

import com.aicoresolution.backend.entity.Redirect;
import com.aicoresolution.backend.repository.RedirectRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@Order(1) // Chạy sớm nhất có thể
@RequiredArgsConstructor
public class RedirectFilter extends OncePerRequestFilter {

    private final RedirectRepository redirectRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        // Chỉ xử lý các request không phải API admin và không phải static resources (tùy chọn)
        if (!uri.startsWith("/api/admin") && !uri.startsWith("/assets")) {
            
            Optional<Redirect> redirectOpt = redirectRepository.findByFromPath(uri);
            
            if (redirectOpt.isPresent() && redirectOpt.get().getIsActive()) {
                Redirect redirect = redirectOpt.get();
                
                // Tăng số lượt truy cập (Hit count)
                redirect.setHitCount(redirect.getHitCount() + 1);
                redirectRepository.save(redirect);
                
                // Thực hiện redirect
                int statusCode = redirect.getStatusCode() != null ? redirect.getStatusCode() : 301;
                response.setStatus(statusCode);
                response.setHeader("Location", redirect.getToPath());
                response.flushBuffer();
                return; // Dừng filter chain tại đây
            }
        }

        filterChain.doFilter(request, response);
    }
}
