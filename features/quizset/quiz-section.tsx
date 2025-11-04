"use client";
import { Button } from "@/components/ui/button";
import type { Question, Quiz } from "@/lib/generated/prisma";
import { redirect, useRouter } from "next/navigation";
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
      redirect(`/quiz/${quizId}/result`);
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
    redirect(`/quiz/${quizId}/result`);
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
    <div className="max-w-4xl mx-auto my-8">
      {/* Question Navigation Bar */}
      <div className="mb-6 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Questions Progress
          </h3>
          <span className="text-xs text-slate-600 dark:text-slate-400">
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
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  isCurrent
                    ? "bg-blue-600 text-white border-2 border-blue-600 shadow-md"
                    : isAnswered
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-2 border-green-400 dark:border-green-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
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
      <div className="rounded-lg shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 p-7">
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Question {current + 1} of {questions.length}
          </span>
          {answers[current] !== null && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-400 dark:border-green-600">
              Answered
            </span>
          )}
        </div>

        <div className="mb-5 text-lg font-medium text-slate-900 dark:text-slate-100">
          {q.question}
        </div>

        <div className="space-y-3 mb-6">
          {q.options.map((option, idx) => {
            const isSelected = idx === selected;
            const optionClass = `w-full p-4 text-left border-2 rounded-lg cursor-pointer transition-colors ${
              isSelected
                ? "bg-blue-100/80 dark:bg-blue-400/30 border-blue-400 text-blue-700 dark:text-blue-200"
                : "hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
            }`;

            return (
              <button
                key={option}
                type="button"
                className={optionClass}
                onClick={() => onSelect(idx)}
                aria-pressed={isSelected}
              >
                <span className="text-base">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation and Submit Buttons */}
        <div className="flex justify-between items-center gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
          <button
            onClick={onPrev}
            disabled={current === 0}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <div className="flex gap-3">
            {current < questions.length - 1 ? (
              <button
                onClick={onNext}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                disabled={isSubmitting || answeredCount === 0}
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
