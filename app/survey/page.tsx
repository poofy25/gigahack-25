"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  useSubmitSurvey,
  type SurveyResponse,
} from "@/lib/hooks";
import surveyData from "@/data/survey.json";
import { cn } from "@/lib/utils";

// Types for the survey
interface SurveyAnswer {
  next?: number;
  risk?: string;
  end?: string;
}

interface SurveyQuestion {
  id: number;
  question: string;
  law_article: string;
  type?: string;
  options?: string[];
  input_placeholder?: string;
  answers: Record<string, SurveyAnswer>;
}

interface SurveyState {
  currentQuestionId: number;
  responses: SurveyResponse[];
  textInputValue: string;
  selectedAnswers: string[];
}

export default function SurveyPage() {
  const router = useRouter();
  const submitSurveyMutation = useSubmitSurvey();
  const [surveyState, setSurveyState] = useState<SurveyState>({
    currentQuestionId: 1,
    responses: [],
    textInputValue: "",
    selectedAnswers: [],
  });

  // Get current question
  const currentQuestion = surveyData.survey.find(
    (q) => q.id === surveyState.currentQuestionId
  );

  // Check if current question is text input
  const isTextInputQuestion = currentQuestion?.type === "text_input";

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion) return;

    setSurveyState((prev) => {
      // For multiple choice questions, allow multiple selections
      if (currentQuestion.type === "multiple_choice") {
        const isSelected = prev.selectedAnswers.includes(answer);
        if (isSelected) {
          // Remove from selection
          return {
            ...prev,
            selectedAnswers: prev.selectedAnswers.filter(a => a !== answer),
          };
        } else {
          // Add to selection
          return {
            ...prev,
            selectedAnswers: [...prev.selectedAnswers, answer],
          };
        }
      } else {
        // For single choice questions, only allow one selection
        return {
          ...prev,
          selectedAnswers: [answer],
        };
      }
    });
  };

  // Handle answer selection and continue
  const handleAnswerSelectAndContinue = (answer: string) => {
    handleAnswerSelect(answer);
    
    // For single choice questions, automatically continue after selection
    if (currentQuestion && currentQuestion.type !== "multiple_choice") {
      // Use setTimeout to ensure state is updated before continuing
      setTimeout(() => {
        handleContinue();
      }, 0);
    }
  };

  // Handle continue action
  const handleContinue = () => {
    if (!currentQuestion) return;

    let answerToSubmit: string;
    let answerData: SurveyAnswer | undefined;

    if (currentQuestion.type === "text_input") {
      if (!surveyState.textInputValue.trim()) return;
      answerToSubmit = surveyState.textInputValue.trim();
      answerData = currentQuestion.answers[
        "Continue" as keyof typeof currentQuestion.answers
      ] as SurveyAnswer | undefined;
    } else {
      if (surveyState.selectedAnswers.length === 0) return;
      answerToSubmit = surveyState.selectedAnswers.join(", ");
      
      // For multiple choice, we need to find the answer data
      // We'll use the first selected answer to determine the next step
      const firstSelectedAnswer = surveyState.selectedAnswers[0];
      answerData = currentQuestion.answers[
        firstSelectedAnswer as keyof typeof currentQuestion.answers
      ] as SurveyAnswer | undefined;
    }

    if (!answerData) return;

    const newResponse: SurveyResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer: answerToSubmit,
      lawArticle: currentQuestion.law_article,
      risk: answerData.risk,
    };

    const updatedResponses = [...surveyState.responses, newResponse];

    // Check if this is the end of the survey
    if (answerData.end) {
      // Survey is complete, submit immediately and redirect
      submitSurveyMutation.mutate(updatedResponses, {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          console.error("Failed to submit survey:", error);
          // Still redirect to dashboard even if submission fails
          router.push("/dashboard");
        },
      });
    } else if (answerData.next) {
      // Continue to next question
      setSurveyState((prev) => ({
        ...prev,
        responses: updatedResponses,
        textInputValue: "",
        selectedAnswers: [],
        currentQuestionId: answerData.next!,
      }));
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (surveyState.responses.length > 0) {
      const lastResponse =
        surveyState.responses[surveyState.responses.length - 1];
      setSurveyState((prev) => ({
        ...prev,
        currentQuestionId: lastResponse.questionId,
        responses: prev.responses.slice(0, -1),
        textInputValue: "",
        selectedAnswers: [],
      }));
    }
  };


  if (!currentQuestion) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Eroare</CardTitle>
              <CardDescription>
                Nu s-a putut încărca întrebarea curentă.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/")}>
                Înapoi la pagina principală
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="w-[768px] min-h-[700px] mx-auto p-6 mt-[150px]">
        {/* Question Card */}
        <Card className="mb-6 bg-zinc-800 border-none">
          <CardHeader>
            <div className="flex items-center text-zinc-400 font-normal">
              {currentQuestion.law_article}
            </div>
            <h3 className="text-2xl text-white font-semibold">
              {currentQuestion.question}
            </h3>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "text_input" ? (
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder={
                    currentQuestion.input_placeholder || "Introduceți URL-ul..."
                  }
                  value={surveyState.textInputValue}
                  onChange={(e) =>
                    setSurveyState((prev) => ({
                      ...prev,
                      textInputValue: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      surveyState.textInputValue.trim()
                    ) {
                      handleContinue();
                    }
                  }}
                  className="w-full bg-zinc-700 border !border-zinc-700 rounded-[36px] h-[58px] px-[24px] placeholder:text-zinc-200"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.type === "multiple_choice" && currentQuestion.options
                  ? currentQuestion.options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className={cn(
                          "bg-zinc-700 border-zinc-600 w-full justify-start h-auto p-4 rounded-[16px] text-left hover:bg-accent hover:bg-sky-700 hover:border-sky-500 transition-colors",
                          surveyState.selectedAnswers.includes(option)
                            ? "bg-sky-900 text-white border-sky-500"
                            : ""
                        )}
                        onClick={() => handleAnswerSelect(option)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleAnswerSelect(option);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base leading-relaxed">
                            {option}
                          </span>
                        </div>
                      </Button>
                    ))
                  : Object.keys(currentQuestion.answers).map((answer) => (
                      <Button
                        key={answer}
                        variant="outline"
                        className={cn(
                          "bg-zinc-700 border-zinc-600 w-full justify-start h-auto p-4 rounded-[16px] text-left hover:bg-accent hover:bg-sky-700 hover:border-sky-500 transition-colors",
                          surveyState.selectedAnswers.includes(answer)
                            ? "bg-sky-900 text-white border-sky-500"
                            : ""
                        )}
                        onClick={() => handleAnswerSelectAndContinue(answer)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleAnswerSelectAndContinue(answer);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base leading-relaxed">
                            {answer}
                          </span>
                        </div>
                      </Button>
                    ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end items-center gap-4 pt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={surveyState.responses.length === 0}
                className="flex items-center gap-2 bg-transparent border-white rounded-full hover:bg-white hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" />
                Înapoi
              </Button>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleContinue}
                  disabled={
                    isTextInputQuestion
                      ? !surveyState.textInputValue.trim()
                      : surveyState.selectedAnswers.length === 0
                  }
                  className="flex items-center gap-2 border-white rounded-full"
                >
                  Continuă
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
