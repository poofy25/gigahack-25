import { useMutation, useQuery } from "@tanstack/react-query";
import {
  scanDomain,
  submitEmail,
  fetchScanResults,
  type DomainScanRequest,
  type EmailSubmissionRequest,
  type ScanResultsResponse,
} from "./api";

// Types for survey submission
export interface SurveyResponse {
  questionId: number;
  question: string;
  answer: string;
  lawArticle: string;
  risk?: string;
}

export interface SurveySubmissionRequest {
  responses: SurveyResponse[];
  finalResult?: {
    status: string;
    risk?: string;
  };
  completedAt: string;
}

// Hook for domain scanning
export const useScanDomain = () => {
  return useMutation({
    mutationFn: (data: DomainScanRequest) => scanDomain(data),
    onSuccess: (data) => {
      console.log("Domain scan completed:", data);
    },
    onError: (error) => {
      console.error("Domain scan failed:", error);
    },
  });
};

// Hook for email submission
export const useSubmitEmail = () => {
  return useMutation({
    mutationFn: (data: EmailSubmissionRequest) => submitEmail(data),
    onSuccess: (data) => {
      console.log("Email submitted successfully:", data);
    },
    onError: (error) => {
      console.error("Email submission failed:", error);
    },
  });
};

// Hook for survey submission
export const useSubmitSurvey = () => {
  return useMutation({
    mutationFn: async (responses: SurveyResponse[]) => {
      console.log("Submitting survey responses to webhook:", responses);

      const response = await fetch(
        "https://cloneteamjob.uk/webhook/340ac2da-ad5f-45ff-9d39-1026714b3d08",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responses),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    },
    onSuccess: (data) => {
      console.log("Survey submitted successfully to webhook:", data);
    },
    onError: (error) => {
      console.error("Survey submission failed:", error);
    },
  });
};

// Hook for fetching scan results
export const useScanResults = () => {
  return useQuery({
    queryKey: ['scanResults'],
    queryFn: async () => {
      console.log("Fetching scan results from webhook with placeholder data");

      const response = await fetch(
        "https://cloneteamjob.uk/webhook/340ac2da-ad5f-45ff-9d39-1026714b3d08",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "scan_results_request" }), // Placeholder body
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Scan results fetched successfully from webhook:", result);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: 3,
  });
};
