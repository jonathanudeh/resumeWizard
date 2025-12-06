import { createContext } from "react";
import type { CleanedResume } from "../services/api";

interface ResumeContextType {
  cleanedResume: CleanedResume | null;
  setCleanedResume: (resume: CleanedResume | null) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  pdfUrl: string | null;
  setPdfUrl: (url: string | null) => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined
);
