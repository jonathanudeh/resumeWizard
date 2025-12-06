import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SectionCard, PdfViewer } from "../components";
import { useResumeContext } from "../context/useResumeContext";

interface LocationState {
  pdfData?: string;
  downloadUrl?: string;
}

export const PdfResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPdfUrl } = useResumeContext();
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const state = location.state as LocationState | null;

  useEffect(() => {
    if (state?.pdfData) {
      // Create a data URL from base64 PDF
      const dataUrl = `data:application/pdf;base64,${state.pdfData}`;
      setPdfDataUrl(dataUrl);
    } else if (state?.downloadUrl) {
      setDownloadUrl(state.downloadUrl);
    }
  }, [state]);

  useEffect(() => {
    if (pdfDataUrl) {
      setPdfUrl(pdfDataUrl);
    } else if (downloadUrl) {
      setPdfUrl(downloadUrl);
    }
  }, [pdfDataUrl, downloadUrl, setPdfUrl]);

  const handleDownload = () => {
    if (pdfDataUrl) {
      const link = document.createElement("a");
      link.href = pdfDataUrl;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] to-[#E0E7FF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-2">
            Your Resume PDF
          </h1>
          <p className="text-lg text-[#4B5563]">
            Your resume is ready to download!
          </p>
        </div>

        {/* Success Message */}
        <div className="mb-8 p-4 bg-[#ECFDF3] border border-[#BBF7D0] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-[#16A34A] font-semibold">
                PDF Generated Successfully!
              </p>
              <p className="text-[#16A34A] text-sm">
                Your resume PDF has been generated with your selected template.
              </p>
            </div>
          </div>
        </div>

        {/* PDF Preview */}
        {(pdfDataUrl || downloadUrl) && (
          <SectionCard title="PDF Preview">
            <PdfViewer pdfUrl={(pdfDataUrl || downloadUrl)!} />
          </SectionCard>
        )}

        {/* Download Section */}
        <SectionCard title="Download Your Resume">
          <div className="space-y-4">
            <p className="text-[#4B5563]">
              Your resume is ready to download. Click the button below to save
              your PDF file.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 px-6 bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-semibold rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 px-6 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold rounded-lg transition-transform active:scale-95"
              >
                Start Over
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Want to create another resume?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Start a new one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
