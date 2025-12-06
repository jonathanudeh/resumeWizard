package com.smartresume.backend.controller;

import com.smartresume.backend.dto.CleanedResumeResponse;
import com.smartresume.backend.dto.PdfGenRequest;
import com.smartresume.backend.dto.RawResumeRequest;
import com.smartresume.backend.service.PdfGenerationService;
import com.smartresume.backend.service.ResumeCleaningService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow all origins for simplicity/hackathon
public class ResumeController {

    private final ResumeCleaningService cleaningService;
    private final PdfGenerationService pdfService;

    public ResumeController(ResumeCleaningService cleaningService, PdfGenerationService pdfService) {
        this.cleaningService = cleaningService;
        this.pdfService = pdfService;
    }

    @GetMapping("/")
    public String healthCheck() {
        return "Smart Resume Backend is Running!";
    }

    @PostMapping("/clean-resume")
    public ResponseEntity<CleanedResumeResponse> cleanResume(@RequestBody RawResumeRequest request) {
        CleanedResumeResponse response = cleaningService.cleanResume(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody PdfGenRequest request) {
        try {
            byte[] pdfBytes = pdfService.generatePdf(request);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=resume.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
