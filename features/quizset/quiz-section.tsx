"use client";
import { Button } from "@/components/ui/button";
import type { Question, Quiz } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface QuizSectionProps {
  questions: Question[];
  quizId: string;
  quiz: Quiz;
}

export const QuizSection = ({ questions, quizId, quiz }: QuizSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const isCompleted = quiz.status === "COMPLETED";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const q = questions[current];
  const selected = answers[current];
  const onSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    const formattedAnswers = questions
      .map((question, idx) => {
        if (answers[idx] !== null) {
          return {
            questionId: question.id,
            selectedIndex: answers[idx] as number,
          };
        }
        return null;
      })
      .filter((answer) => answer !== null);

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/quiz/${quizId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload) {
        const message =
          (payload as { error?: string } | null)?.error ??
          "Failed to save quiz results";
        throw new Error(message);
      }
      router.push(`/quiz/${quizId}/result`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        alert(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    }
  };

  const onPrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  const goToQuestion = (idx: number) => {
    setCurrent(idx);
  };

  const answeredCount = answers.filter((a) => a !== null).length;

  if (isCompleted) {
    router.push(`/quiz/${quizId}/result`);
  }

  if (!questions.length) {
    return (
      <div className="p-6 text-center text-lg text-slate-800 dark:text-slate-200">
        <div>Generate a quiz first</div>
        <Button
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 text-lg font-medium rounded-2xl transition-all duration-300"
          onClick={() => router.push("/generate")}
        >
          Generate Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Question Navigation Bar */}
      <div className=" mt-20 p-5 rounded-lg bg-card border border-border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            Questions Progress
          </h3>
          <span className="text-xs text-muted-foreground font-medium">
            {answeredCount} / {questions.length} answered
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {questions.map((_, idx) => {
            const isAnswered = answers[idx] !== null;
            const isCurrent = idx === current;
            return (
              <button
                key={idx}
                onClick={() => goToQuestion(idx)}
                className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isCurrent
                    ? "bg-blue-600 text-white border-2 border-blue-600 shadow-md scale-105"
                    : isAnswered
                    ? "bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-2 border-green-500/50 hover:border-green-500"
                    : "bg-muted text-muted-foreground border-2 border-border hover:border-blue-600/50 hover:bg-blue-600/10"
                }`}
                aria-label={`Go to question ${idx + 1}${
                  isAnswered ? " (answered)" : " (not answered)"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-lg shadow-sm bg-card border border-border p-6 sm:p-8">
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-medium">
            Question {current + 1} of {questions.length}
          </span>
          {answers[current] !== null && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-700 border border-green-500/50">
              Answered
            </span>
          )}
        </div>

        <div className="mb-6 text-lg font-semibold text-foreground leading-relaxed">
          {q.question}
        </div>

        <div className="space-y-3 mb-8">
          {q.options.map((option, idx) => {
            const isSelected = idx === selected;
            const optionClass = `w-full p-4 text-left border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              isSelected
                ? "bg-blue-600/10 border-blue-600 text-blue-600 font-medium shadow-sm"
                : "hover:bg-accent border-border text-foreground hover:border-primary/50"
            }`;

            return (
              <button
                key={option}
                type="button"
                className={optionClass}
                onClick={() => onSelect(idx)}
                aria-pressed={isSelected}
              >
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation and Submit Buttons */}
        <div className="flex justify-between items-center gap-3 pt-6 border-t border-border">
          <Button
            onClick={onPrev}
            disabled={current === 0}
            variant="outline"
            className="min-w-[100px]"
          >
            Previous
          </Button>

          <div className="flex gap-3">
            {current < questions.length - 1 ? (
              <Button onClick={onNext} className="min-w-[100px]">
                Next
              </Button>
            ) : (
              <Button
                onClick={submitQuiz}
                disabled={isSubmitting || answeredCount === 0}
                className="min-w-[140px] bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
