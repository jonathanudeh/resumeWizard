import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { apiService } from "../services/api";
import type { GeneratePdfRequest, GeneratePdfResponse } from "../services/api";
import { toast } from "react-hot-toast";

export const useGeneratePdf = (): UseMutationResult<
  GeneratePdfResponse,
  Error,
  GeneratePdfRequest
> => {
  return useMutation({
    mutationFn: (data: GeneratePdfRequest) => apiService.generatePdf(data),
    onSuccess: () => {
      toast.success("PDF generated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate PDF";
      toast.error(errorMessage);
    },
  });
};
