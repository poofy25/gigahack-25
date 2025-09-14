"use client";

import React, { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Shield,
} from "lucide-react";
import {
  useSubmitSurvey,
  type SurveyResponse,
} from "@/lib/hooks";
import employeeSurveyData from "@/data/employee-survey.json";
import { cn } from "@/lib/utils";

// Types for the employee survey
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
  answers: Record<string, SurveyAnswer>;
}

interface SurveyState {
  currentQuestionId: number;
  responses: SurveyResponse[];
  isComplete: boolean;
  textInputValue: string;
  selectedAnswers: string[];
  finalResult?: {
    status: string;
    risk?: string;
  };
}

export default function EmployeeSurveyPage() {
  const router = useRouter();
  const submitSurveyMutation = useSubmitSurvey();
  const [surveyState, setSurveyState] = useState<SurveyState>({
    currentQuestionId: 1,
    responses: [],
    isComplete: false,
    textInputValue: "",
    selectedAnswers: [],
  });

  // Get current question
  const currentQuestion = employeeSurveyData.survey.find(
    (q) => q.id === surveyState.currentQuestionId
  );
  const totalQuestions = employeeSurveyData.survey.length;
  const progress = (surveyState.responses.length / totalQuestions) * 100;

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

    setSurveyState((prev) => ({
      ...prev,
      responses: [...prev.responses, newResponse],
      textInputValue: "",
      selectedAnswers: [],
    }));

    // Check if this is the end of the survey
    if (answerData.end) {
      setSurveyState((prev) => ({
        ...prev,
        isComplete: true,
        finalResult: {
          status: answerData.end!,
          risk: answerData.risk,
        },
      }));
    } else if (answerData.next) {
      setSurveyState((prev) => ({
        ...prev,
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
        isComplete: false,
        finalResult: undefined,
        textInputValue: "",
        selectedAnswers: [],
      }));
    }
  };

  // Submit survey results
  const handleSubmit = async () => {
    submitSurveyMutation.mutate(surveyState.responses, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error("Failed to submit survey:", error);
      },
    });
  };

  // Get risk level color
  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case "Critic":
        return "destructive";
      case "Înalt":
        return "destructive";
      case "Mediu":
        return "default";
      case "Scăzut":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Get status icon
  const getStatusIcon = (status?: string) => {
    if (!status) return null;

    if (status.includes("CONFORM"))
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status.includes("NECONFORM"))
      return <XCircle className="h-5 w-5 text-red-500" />;
    if (status.includes("PARȚIAL"))
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-blue-500" />;
  };

  if (surveyState.isComplete && surveyState.finalResult) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto p-6">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getStatusIcon(surveyState.finalResult.status)}
              </div>
              <CardTitle className="text-2xl">Evaluare Completă - Angajat</CardTitle>
              <CardDescription>
                Rezultatul evaluării de conștientizare în securitatea cibernetică
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Badge
                  variant={getRiskColor(surveyState.finalResult.risk)}
                  className="text-lg px-4 py-2"
                >
                  {surveyState.finalResult.status}
                </Badge>
                {surveyState.finalResult.risk && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Nivel de risc: {surveyState.finalResult.risk}
                  </p>
                )}
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Această evaluare vă ajută să înțelegeți nivelul de conștientizare în securitatea cibernetică. 
                  Pentru îmbunătățirea continuă, participați la training-urile organizate de companie.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Răspunsuri furnizate:</h3>
                <div className="space-y-2">
                  {surveyState.responses.map((response, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="font-medium">{response.question}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{response.answer}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {response.lawArticle}
                        </span>
                        {response.risk && (
                          <Badge variant={getRiskColor(response.risk)}>
                            {response.risk}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    setSurveyState({
                      currentQuestionId: 1,
                      responses: [],
                      isComplete: false,
                      textInputValue: "",
                      selectedAnswers: [],
                    })
                  }
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Restart Survey
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitSurveyMutation.isPending}
                >
                  {submitSurveyMutation.isPending
                    ? "Se trimite..."
                    : "Trimite rezultatele"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

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
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Întrebarea {surveyState.currentQuestionId} din {totalQuestions}</span>
            <span>{Math.round(progress)}% completat</span>
          </div>
          <Progress value={progress} className="h-2 bg-zinc-700" />
        </div>

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
                  placeholder="Introduceți răspunsul..."
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
