import React from "react";

interface PdfViewerProps {
  pdfUrl: string;
  title?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  title = "PDF Preview",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-[#1F2937] mb-4 pb-2 border-b border-gray-300">
        {title}
      </h3>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={pdfUrl}
          title={title}
          className="w-full h-96 md:h-[520px] border-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
