package com.aicoresolution.backend.common.headers;

/**
 * Utility class for accessing common request headers
 */
public class HeaderUtils {

    /**
     * Get current request ID
     */
    public static String getRequestId() {
        return RequestHeadersContext.getRequestId();
    }

    /**
     * Get current correlation ID
     */
    public static String getCorrelationId() {
        return RequestHeadersContext.getCorrelationId();
    }

    /**
     * Get current trace ID
     */
    public static String getTraceId() {
        return RequestHeadersContext.getTraceId();
    }

    /**
     * Get all current headers
     */
    public static CommonRequestHeaders getHeaders() {
        return RequestHeadersContext.getHeaders();
    }

    /**
     * Set headers
     */
    public static void setHeaders(CommonRequestHeaders headers) {
        RequestHeadersContext.setHeaders(headers);
    }

    /**
     * Clear headers
     */
    public static void clear() {
        RequestHeadersContext.clear();
    }

    /**
     * Get header value for logging
     */
    public static String getHeadersForLogging() {
        CommonRequestHeaders headers = getHeaders();
        return String.format("RequestID=%s, CorrelationID=%s, TraceID=%s",
                headers.getRequestId(),
                headers.getCorrelationId(),
                headers.getTraceId());
    }
}
