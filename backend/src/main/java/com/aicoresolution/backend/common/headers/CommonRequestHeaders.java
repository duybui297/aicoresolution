package com.aicoresolution.backend.common.headers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Common request headers standardization
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonRequestHeaders {

    /**
     * Unique request ID for tracking
     */
    private String requestId;

    /**
     * Timestamp when request is initiated
     */
    private LocalDateTime timestamp;

    /**
     * API version
     */
    private String apiVersion = "v1";

    /**
     * Client platform (web, mobile, etc)
     */
    private String platform;

    /**
     * User agent
     */
    private String userAgent;

    /**
     * Correlation ID for distributed tracing
     */
    private String correlationId;

    /**
     * Trace ID for monitoring
     */
    private String traceId;

    /**
     * Request source/origin
     */
    private String source;

    /**
     * Locale/Language
     */
    private String locale;

    public CommonRequestHeaders(String requestId) {
        this.requestId = requestId;
        this.timestamp = LocalDateTime.now();
        this.correlationId = requestId;
        this.traceId = UUID.randomUUID().toString();
    }

    /**
     * Generate default headers if not provided
     */
    public static CommonRequestHeaders createDefault() {
        CommonRequestHeaders headers = new CommonRequestHeaders();
        headers.setRequestId(UUID.randomUUID().toString());
        headers.setTimestamp(LocalDateTime.now());
        headers.setCorrelationId(headers.getRequestId());
        headers.setTraceId(UUID.randomUUID().toString());
        headers.setApiVersion("v1");
        return headers;
    }

    /**
     * Validate required headers
     */
    public boolean isValid() {
        return requestId != null && !requestId.isEmpty();
    }
}
