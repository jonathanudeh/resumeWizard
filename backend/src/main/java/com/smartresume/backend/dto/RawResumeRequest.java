package com.smartresume.backend.dto;

public record RawResumeRequest(
    String name,
    String summary,
    String experience,
    String education,
    String skills
) {}
