import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { apiService } from "../services/api";
import type { ResumeInputData, CleanResumeResponse } from "../services/api";
import { toast } from "react-hot-toast";

export const useCleanResume = (): UseMutationResult<
  CleanResumeResponse,
  Error,
  ResumeInputData
> => {
  return useMutation({
    mutationFn: (data: ResumeInputData) => apiService.cleanResume(data),
    onSuccess: () => {
      toast.success("Resume cleaned successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clean resume";
      toast.error(errorMessage);
    },
  });
};
