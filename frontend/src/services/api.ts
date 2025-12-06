import axios from "axios";
import type { AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ResumeInputData {
  name: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
}

export interface CleanedResume {
  name: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
}

export interface CleanResumeResponse {
  cleanedResume: CleanedResume;
}

export interface GeneratePdfRequest {
  cleanedResume: CleanedResume;
  template: string;
}

export interface GeneratePdfResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
  pdfData?: string; // base64 encoded PDF
}

// API calls
export const apiService = {
  cleanResume: async (data: ResumeInputData): Promise<CleanResumeResponse> => {
    const response = await apiClient.post<CleanResumeResponse>(
      "/clean-resume",
      data
    );
    return response.data;
  },

  generatePdf: async (
    data: GeneratePdfRequest
  ): Promise<GeneratePdfResponse> => {
    const response = await apiClient.post<GeneratePdfResponse>(
      "/generate-pdf",
      data,
      {
        responseType: "json",
      }
    );
    return response.data;
  },

  downloadPdf: async (url: string): Promise<Blob> => {
    const response = await apiClient.get(url, {
      responseType: "blob",
    });
    return response.data;
  },
};

export default apiClient;
