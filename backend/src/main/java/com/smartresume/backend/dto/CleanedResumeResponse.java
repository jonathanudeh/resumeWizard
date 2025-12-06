package com.smartresume.backend.dto;

import java.util.List;

public record CleanedResumeResponse(
    CleanedResume cleanedResume
) {
    public record CleanedResume(
        String name,
        String summary,
        List<String> experience,
        List<String> education,
        List<String> skills
    ) {}
}
