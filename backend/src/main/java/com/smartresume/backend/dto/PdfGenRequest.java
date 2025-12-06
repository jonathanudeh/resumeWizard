package com.smartresume.backend.dto;

import java.util.List;

public record PdfGenRequest(
    String template,
    ResumeData resume
) {
    public record ResumeData(
        String name,
        String summary,
        List<String> experience,
        List<String> education,
        List<String> skills
    ) {}
}
