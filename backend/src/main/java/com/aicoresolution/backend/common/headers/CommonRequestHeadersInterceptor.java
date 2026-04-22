package com.aicoresolution.backend.common.headers;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Interceptor to extract and store common request headers
 */
@Component
public class CommonRequestHeadersInterceptor implements HandlerInterceptor {

    private static final String REQUEST_ID_HEADER = "X-Request-ID";
    private static final String CORRELATION_ID_HEADER = "X-Correlation-ID";
    private static final String TRACE_ID_HEADER = "X-Trace-ID";
    private static final String API_VERSION_HEADER = "X-API-Version";
    private static final String PLATFORM_HEADER = "X-Platform";
    private static final String SOURCE_HEADER = "X-Source";
    private static final String LOCALE_HEADER = "Accept-Language";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        CommonRequestHeaders headers = extractHeaders(request);
        RequestHeadersContext.setHeaders(headers);

        // Add headers to response for tracking
        response.setHeader(REQUEST_ID_HEADER, headers.getRequestId());
        response.setHeader(TRACE_ID_HEADER, headers.getTraceId());
        if (headers.getCorrelationId() != null) {
            response.setHeader(CORRELATION_ID_HEADER, headers.getCorrelationId());
        }

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception ex) {
        // Clear ThreadLocal after request completion
        RequestHeadersContext.clear();
    }

    /**
     * Extract headers from HTTP request
     */
    private CommonRequestHeaders extractHeaders(HttpServletRequest request) {
        CommonRequestHeaders headers = new CommonRequestHeaders();

        // Extract or generate Request ID
        String requestId = request.getHeader(REQUEST_ID_HEADER);
        if (requestId == null || requestId.isEmpty()) {
            requestId = UUID.randomUUID().toString();
        }
        headers.setRequestId(requestId);

        // Extract or generate Correlation ID
        String correlationId = request.getHeader(CORRELATION_ID_HEADER);
        headers.setCorrelationId(correlationId != null ? correlationId : requestId);

        // Generate or extract Trace ID
        String traceId = request.getHeader(TRACE_ID_HEADER);
        headers.setTraceId(traceId != null ? traceId : UUID.randomUUID().toString());

        // Extract API Version
        String apiVersion = request.getHeader(API_VERSION_HEADER);
        headers.setApiVersion(apiVersion != null ? apiVersion : "v1");

        // Extract Platform
        String platform = request.getHeader(PLATFORM_HEADER);
        headers.setPlatform(platform);

        // Extract Source
        String source = request.getHeader(SOURCE_HEADER);
        headers.setSource(source);

        // Extract User Agent
        headers.setUserAgent(request.getHeader("User-Agent"));

        // Extract Locale
        String locale = request.getHeader(LOCALE_HEADER);
        headers.setLocale(locale);

        headers.setTimestamp(LocalDateTime.now());

        return headers;
    }
}
