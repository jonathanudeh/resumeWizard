package com.smartresume.backend.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.smartresume.backend.dto.PdfGenRequest;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfGenerationService {

    private final TemplateEngine templateEngine;

    public PdfGenerationService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public byte[] generatePdf(PdfGenRequest request) throws IOException {
        Context context = new Context();
        context.setVariable("resume", request.cleanedResume());

        // Select template based on request, default to template1
        String templateName = "resume_template_1";
        if ("template2".equalsIgnoreCase(request.template())) {
            // For now we only have 1, but this logic is ready for 2
            templateName = "resume_template_1";
        } else if ("template1".equalsIgnoreCase(request.template())) {
            templateName = "resume_template_1";
        }
        // Fallback for any other string

        String htmlContent = templateEngine.process(templateName, context);

        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(htmlContent, null);
            builder.toStream(os);
            builder.run();
            return os.toByteArray();
        }
    }
}
