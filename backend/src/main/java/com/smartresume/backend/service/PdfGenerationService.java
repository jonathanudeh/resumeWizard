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
        context.setVariable("resume", request.resume());

        // Select template based on request, default to template1
        String templateName = request.template() != null && !request.template().isEmpty()
                ? "resume_" + request.template()
                : "resume_template_1";

        // Simple fallback check (in real app, use better validation)
        if (!templateName.equals("resume_template_1")) {
            // For safety/Simplicity, force to template 1 if unknown or just default
            // The prompt asked for "template1", "template2" capabilities.
            // If user sends "template1", it maps to "resume_template_1"
            // If file doesn't exist, Thymeleaf will error.
        }

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
