import React, { useState } from "react";
import type { CleanedResume } from "../services/api";
import { ResumeContext } from "./ResumeContext.type";

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cleanedResume, setCleanedResume] = useState<CleanedResume | null>(
    null
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>("template1");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <ResumeContext.Provider
      value={{
        cleanedResume,
        setCleanedResume,
        selectedTemplate,
        setSelectedTemplate,
        pdfUrl,
        setPdfUrl,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
