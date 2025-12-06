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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
        <iframe
          src={pdfUrl}
          title={title}
          className="w-full h-screen md:h-96 border-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
