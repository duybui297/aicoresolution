package com.aicoresolution.backend.common.headers;

/**
 * ThreadLocal context for storing common request headers
 */
public class RequestHeadersContext {

    private static final ThreadLocal<CommonRequestHeaders> context = new ThreadLocal<>();

    public static void setHeaders(CommonRequestHeaders headers) {
        context.set(headers);
    }

    public static CommonRequestHeaders getHeaders() {
        CommonRequestHeaders headers = context.get();
        if (headers == null) {
            headers = CommonRequestHeaders.createDefault();
            context.set(headers);
        }
        return headers;
    }

    public static String getRequestId() {
        return getHeaders().getRequestId();
    }

    public static String getCorrelationId() {
        return getHeaders().getCorrelationId();
    }

    public static String getTraceId() {
        return getHeaders().getTraceId();
    }

    public static void clear() {
        context.remove();
    }
}
