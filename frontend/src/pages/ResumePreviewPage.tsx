import React from "react";
import { useNavigate } from "react-router-dom";
import { SectionCard, LoadingSpinner } from "../components";
import { useGeneratePdf } from "../hooks/useGeneratePdf";
import { useResumeContext } from "../context/useResumeContext";

const TEMPLATES = [
  {
    id: "template1",
    name: "Classic",
    description: "Traditional professional resume format",
  },
  {
    id: "template2",
    name: "Modern",
    description: "Contemporary design with modern layout",
  },
  {
    id: "template3",
    name: "Minimal",
    description: "Clean and minimal resume design",
  },
];

export const ResumePreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { cleanedResume, selectedTemplate, setSelectedTemplate } =
    useResumeContext();
  const { mutate: generatePdf, isPending } = useGeneratePdf();

  if (!cleanedResume) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#EFF6FF] to-[#E0E7FF] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
            No Resume Data
          </h2>
          <p className="text-[#4B5563] mb-6">
            Please start by entering your resume details.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Go Back to Input
          </button>
        </div>
      </div>
    );
  }

  const handleGeneratePdf = () => {
    generatePdf(
      { cleanedResume, template: selectedTemplate },
      {
        onSuccess: (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          navigate("/result", {
            state: { downloadUrl: url },
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#EFF6FF] to-[#E0E7FF] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-[#1D4ED8] hover:text-[#2563EB] font-medium mb-4 inline-flex items-center gap-2"
          >
            ← Back to Input
          </button>
          <h1 className="text-4xl font-bold text-[#1F2937] mb-2">
            Resume Preview
          </h1>
          <p className="text-lg text-[#4B5563]">
            Review your cleaned resume and select a template
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            <SectionCard title="Your Cleaned Resume">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <h2 className="text-3xl font-bold text-[#1F2937]">
                    {cleanedResume.name}
                  </h2>
                </div>

                {/* Summary */}
                {cleanedResume.summary && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                      Professional Summary
                    </h3>
                    <p className="text-[#4B5563] leading-relaxed">
                      {cleanedResume.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {cleanedResume.experience.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                      Experience
                    </h3>
                    <ul className="space-y-2">
                      {cleanedResume.experience.map((exp, idx) => (
                        <li
                          key={idx}
                          className="text-[#4B5563] leading-relaxed"
                        >
                          • {exp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Education */}
                {cleanedResume.education.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {cleanedResume.education.map((edu, idx) => (
                        <li
                          key={idx}
                          className="text-[#4B5563] leading-relaxed"
                        >
                          • {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {cleanedResume.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cleanedResume.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-[#DBEAFE] text-[#1D4ED8] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

          {/* Template Selection */}
          <div className="lg:col-span-1">
            <SectionCard title="Select Template">
              <div className="space-y-3 mb-6">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? "border-[#1D4ED8] bg-[#EFF6FF]"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                    disabled={isPending}
                  >
                    <h3 className="font-semibold text-[#1F2937]">
                      {template.name}
                    </h3>
                    <p className="text-sm text-[#4B5563]">
                      {template.description}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={handleGeneratePdf}
                disabled={isPending}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-transform ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1D4ED8] hover:bg-[#2563EB] active:scale-95"
                }`}
              >
                {isPending ? "Generating PDF..." : "Generate PDF"}
              </button>
            </SectionCard>
          </div>
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8">
              <LoadingSpinner message="Generating your PDF..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
