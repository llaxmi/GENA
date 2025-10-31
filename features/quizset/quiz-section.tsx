"use client";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuizCompletion } from "./quiz-completion";

export const QuizSection = ({
  questions,
  quizId,
}: {
  questions: Question[];
  quizId: string;
}) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [isComplete, setIsComplete] = useState(false);

  const q = questions[current];

  const onSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
  };

  const onSubmit = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const onNext = () => {
    setShowFeedback(false);
    setSelected(answers[current + 1] ?? null);
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setIsComplete(true);
    }
  };
  const router = useRouter();

  const onPrev = () => {
    setShowFeedback(false);
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(answers[current - 1] ?? null);
    }
  };
  const onRetake = () => {
    router.replace(`/quiz/${quizId}?retake=true`);
    setIsComplete(false);
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowFeedback(false);
  };

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

  if (isComplete) {
    return (
      <QuizCompletion
        questions={questions}
        onRetake={onRetake}
        selected={selected}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto my-8 rounded-lg shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 p-7">
      <div className="mb-6 flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
        <span>
          Question {current + 1} / {questions.length}
        </span>
        {answers[current] !== null ? (
          <span className="text-green-600">Answered</span>
        ) : (
          <span className="text-slate-400">Not answered</span>
        )}
      </div>
      <div className="mb-5 text-lg font-medium text-slate-900 dark:text-slate-100">
        {q.question}
      </div>
      <div className="space-y-3 mb-6">
        {q.options.map((option, idx) => {
          let optionClass =
            "w-full p-4 text-left border-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between";
          let icon = null;

          if (showFeedback) {
            if (idx === q.correctIndex) {
              optionClass +=
                " bg-green-100/50 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-400 shadow";
              icon = (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              );
            } else if (idx === selected) {
              optionClass +=
                " bg-red-100/50 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-400";
              icon = (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              );
            } else {
              optionClass += " opacity-60";
            }
          } else {
            if (idx === selected) {
              optionClass +=
                " bg-blue-100/80 dark:bg-blue-400/30 border-blue-400 text-blue-700 dark:text-blue-200";
            } else {
              optionClass +=
                " hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600";
            }
          }

          return (
            <button
              key={option}
              type="button"
              className={optionClass}
              onClick={() => onSelect(idx)}
              disabled={showFeedback}
              aria-pressed={selected === idx}
            >
              <span className="text-base">{option}</span>
              {icon}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div
          className={`mb-6 p-4 rounded-lg border border-slate-200 dark:border-slate-600 ${
            selected === q.correctIndex
              ? "bg-green-100 dark:bg-green-900/50 border-green-300 text-green-700"
              : "bg-red-100 dark:bg-red-900/50 border-red-300 text-red-700"
          }`}
        >
          {selected === q.correctIndex ? (
            <span className="font-medium">Correct! 🎉</span>
          ) : (
            <span>
              The correct answer is:{" "}
              <span className="font-semibold">{q.options[q.correctIndex]}</span>
            </span>
          )}
        </div>
      )}
      <div className="flex justify-between items-center gap-2 mt-4">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition"
        >
          Previous
        </button>
        {!showFeedback && (
          <button
            onClick={onSubmit}
            disabled={selected === null}
            className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            Submit
          </button>
        )}
        {showFeedback && (
          <button
            onClick={onNext}
            className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {current === questions.length - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};
