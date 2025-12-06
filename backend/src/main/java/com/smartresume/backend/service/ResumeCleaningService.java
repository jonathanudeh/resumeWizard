package com.smartresume.backend.service;

import com.smartresume.backend.dto.CleanedResumeResponse;
import com.smartresume.backend.dto.RawResumeRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeCleaningService {

    public CleanedResumeResponse cleanResume(RawResumeRequest request) {
        String name = normalizeText(request.name());
        String summary = normalizeText(request.summary());

        List<String> experience = processListSection(request.experience());
        List<String> education = processListSection(request.education());
        List<String> skills = processListSection(request.skills());

        CleanedResumeResponse.CleanedResume cleanedData = new CleanedResumeResponse.CleanedResume(
                capitalizeWords(name),
                summary,
                experience,
                education,
                skills);

        return new CleanedResumeResponse(cleanedData);
    }

    private String normalizeText(String input) {
        if (input == null)
            return "";
        // Normalize whitespace and remove extra line breaks
        String normalized = input.trim().replaceAll("\\s+", " ");
        // Ensure first letter is capitalized (lightweight grammar)
        if (!normalized.isEmpty()) {
            normalized = normalized.substring(0, 1).toUpperCase() + normalized.substring(1);
        }
        return normalized;
    }

    private List<String> processListSection(String input) {
        if (input == null || input.isBlank())
            return List.of();

        // Split by newlines or bullets if present
        String[] lines = input.split("[\n•\\*\\-]");

        return Arrays.stream(lines)
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .map(this::normalizeText) // Normalize each line
                .distinct() // Remove repeated words/lines
                .collect(Collectors.toList());
    }

    private String capitalizeWords(String input) {
        if (input == null || input.isEmpty())
            return "";
        return Arrays.stream(input.split("\\s+"))
                .map(word -> {
                    if (word.length() > 0) {
                        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                    }
                    return word;
                })
                .collect(Collectors.joining(" "));
    }
}
