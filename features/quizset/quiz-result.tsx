"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Question, QuizAnswer } from "@/lib/generated/prisma";
import {
  CheckCircle2,
  CircleCheck,
  Home,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getPerformanceBg, getPerformanceText } from "./constants";

interface QuizResultProps {
  quizAnswer: (QuizAnswer & { question: Question })[];
}

export default function QuizResult({ quizAnswer }: QuizResultProps) {
  const router = useRouter();

  // Extract questions from quizAnswer array
  const questions = Array.isArray(quizAnswer)
    ? quizAnswer.map((qa) => qa.question).filter(Boolean)
    : [];

  // Calculate totals from quizAnswer
  const totalQuestions = quizAnswer.length;
  const totalCorrect = quizAnswer.filter((qa) => qa.isCorrect).length;
  const totalIncorrect = totalQuestions - totalCorrect;

  // Build answer lookup map
  const answerLookup = new Map(
    quizAnswer.map((answer) => [
      answer.questionId,
      {
        questionId: answer.questionId,
        selectedIndex: answer.selectedIndex,
        isCorrect: answer.isCorrect,
      },
    ])
  );

  const scorePercent =
    totalQuestions === 0
      ? 0
      : Math.round((totalCorrect / totalQuestions) * 100);
  const performanceText = getPerformanceText(scorePercent);
  const performanceBg = getPerformanceBg(scorePercent);

  // Get quizId from first answer (all should have same quizId)
  const quizId = quizAnswer[0]?.quizId || "";

  const onRetake = () => {
    router.push(`/quiz/${quizId}?retake=true`);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-[85vh]">
      {/* Banner */}
      <div
        className={`rounded-3xl flex flex-col items-center justify-center p-8 mb-7 shadow-lg text-center relative overflow-hidden ${performanceBg}`}
      >
        <div className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fadein">
          <CheckCircle2 className="w-10 h-10 text-white drop-shadow-md" />
          Quiz Completed!
        </div>
        <div className="mt-2 font-jakarta-sans text-base md:text-lg text-white/90 font-semibold">
          {performanceText}
        </div>

        <div className="flex flex-col justify-center items-center mt-5 gap-2 md:flex-row md:gap-8">
          <div className="flex items-center gap-2 bg-white/80 text-emerald-700 rounded-2xl shadow px-8 py-4 mt-2 animate-scalein">
            <span className="font-semibold text-3xl md:text-4xl">
              {typeof totalCorrect === "number" && !isNaN(totalCorrect)
                ? totalCorrect
                : 0}
            </span>
            <span className="text-xl font-bold">
              /{" "}
              {typeof totalQuestions === "number" && !isNaN(totalQuestions)
                ? totalQuestions
                : 0}
            </span>
          </div>
          <div className="flex flex-row gap-4 mt-2 items-center">
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100/80 text-green-700 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Correct:{" "}
              {typeof totalCorrect === "number" && !isNaN(totalCorrect)
                ? totalCorrect
                : 0}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100/80 text-red-700 font-medium">
              <XCircle className="w-5 h-5" />
              Incorrect:{" "}
              {typeof totalIncorrect === "number" && !isNaN(totalIncorrect)
                ? totalIncorrect
                : 0}
            </span>
          </div>
        </div>
        <div className="absolute bottom-3 right-5 opacity-20 text-8xl pointer-events-none select-none">
          🏆
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200/90 rounded-xl h-4 mb-8 overflow-hidden shadow-inner">
        <div
          className="h-full transition-all duration-700 rounded-xl bg-emerald-400"
          style={{ width: `${scorePercent}%` }}
        />
      </div>
      <div className="mb-7 flex items-center text-xl justify-center text-slate-600 dark:text-slate-400 font-semibold">
        Your score:{" "}
        <span className="ml-1 text-indigo-600 font-bold">
          {isNaN(scorePercent) ? 0 : scorePercent}%
        </span>
      </div>

      <div className="space-y-4">
        {Array.isArray(questions) &&
          questions.map((question) => {
            const answer = answerLookup.get(question.id);
            const hasAnswer =
              answer &&
              typeof answer.selectedIndex === "number" &&
              answer.selectedIndex >= 0 &&
              Array.isArray(question.options) &&
              answer.selectedIndex < question.options.length;
            const selectedIndex =
              hasAnswer && answer ? (answer.selectedIndex as number) : null;
            const selectedOption =
              selectedIndex !== null &&
              Array.isArray(question.options) &&
              typeof selectedIndex === "number" &&
              question.options[selectedIndex] !== undefined
                ? question.options[selectedIndex]
                : null;
            const isCorrect = !!(answer && answer.isCorrect);
            const correctOption =
              typeof question.correctIndex === "number" &&
              Array.isArray(question.options) &&
              question.correctIndex >= 0 &&
              question.correctIndex < question.options.length
                ? question.options[question.correctIndex]
                : "";

            return (
              <div key={question.id}>
                <div className="flex items-center w-full gap-3">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100 flex-1">
                    <span className="inline-block mr-1 rounded-lg px-2 py-0.5 bg-indigo-100 text-indigo-700 font-semibold">
                      {typeof question.order === "number" ? question.order : ""}
                    </span>
                    {question.question}
                  </span>
                  <span
                    className={`ml-auto flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border-2 ${
                      isCorrect
                        ? "border-green-700 bg-green-50 text-green-800 dark:border-green-400 dark:bg-green-500/20 dark:text-green-200"
                        : "border-red-700 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-500/20 dark:text-red-200"
                    }`}
                  >
                    {isCorrect ? "Correct answer" : "Incorrect answer"}
                  </span>
                </div>
                <div className="flex flex-col md:flex-col text-xs md:items-start flex-wrap gap-3 mt-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="w-full font-medium flex-1 text-slate-700 dark:text-slate-300">
                      Your answer:
                    </span>

                    {hasAnswer && selectedOption !== null ? (
                      <span
                        className={`rounded-lg px-2 py-1 text-xs md:text-sm font-semibold 
                          ${
                            isCorrect
                              ? "bg-green-200/80 text-green-800 "
                              : "bg-red-200/80 text-red-800"
                          }
                        `}
                      >
                        {selectedOption}
                      </span>
                    ) : (
                      <span className="italic text-slate-500">
                        No answer submitted
                      </span>
                    )}
                  </div>
                  {hasAnswer && !isCorrect && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        <CircleCheck className="w-5 h-5" color="green" />{" "}
                      </span>
                      <span className="rounded-lg px-3 py-1 text-xs md:text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 shadow">
                        {correctOption}
                      </span>
                    </div>
                  )}
                </div>
                {question.explanation && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${question.id}`}>
                      <AccordionTrigger className="text-blue-700 underline underline-offset-4">
                        ⓘ See explanation
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
                        <div className="italic text-slate-700 dark:text-slate-400 flex items-center gap-2">
                          {question.explanation}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            );
          })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-7 w-full justify-center items-center">
        <Button
          variant="outline"
          className="w-full sm:w-auto flex gap-2 items-center cursor-pointer text-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:text-white hover:from-green-700 hover:to-emerald-700 font-semibold rounded-xl px-8 py-4 shadow transition-all duration-150"
          onClick={() => router.push("/dashboard")}
        >
          <Home className="w-5 h-5" />
          Dashboard
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto flex gap-2 items-center cursor-pointer text-lg bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:text-white hover:from-blue-800 hover:to-indigo-800 font-semibold rounded-xl px-8 py-4 shadow transition-all duration-150"
          onClick={onRetake}
        >
          <RefreshCcw className="w-5 h-5" />
          Retake Quiz
        </Button>
      </div>
      <div className="w-full text-center text-xs opacity-60 mt-8 mb-2">
        Thank you for participating! Keep learning and growing.
      </div>
    </div>
  );
}
