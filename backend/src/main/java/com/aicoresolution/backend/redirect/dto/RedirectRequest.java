package com.aicoresolution.backend.redirect.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RedirectRequest {

    @NotBlank
    @Size(max = 500)
    private String fromPath;

    @NotBlank
    @Size(max = 500)
    private String toPath;

    @NotNull
    @Min(300)
    private Short statusCode; // 301, 302, etc

    @Size(max = 255)
    private String note;

    private Boolean isActive = true;

    public String getFromPath() {
        return fromPath;
    }

    public void setFromPath(String fromPath) {
        this.fromPath = fromPath;
    }

    public String getToPath() {
        return toPath;
    }

    public void setToPath(String toPath) {
        this.toPath = toPath;
    }

    public Short getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Short statusCode) {
        this.statusCode = statusCode;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
