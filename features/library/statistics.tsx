"use client";

import { Icons } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/page-header";
import { Question, Quiz, QuizAnswer } from "@/lib/generated/prisma";
import { CheckCircle2, PlusIcon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatisticsCard } from "./statistics-card";

interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: keyof typeof Icons;
  iconBgColor: string;
  borderColor: string;
}

type QuizAnswerWithRelations = QuizAnswer & {
  question: Question;
  quiz: Pick<Quiz, "id" | "name">;
};

const LibraryStatistics = ({
  totalCorrectAnswers,
  totalIncorrectAnswers,
  allQuestions,
  quizAnswers,
}: {
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  allQuestions: number;
  quizAnswers: QuizAnswerWithRelations[];
}) => {
  const router = useRouter();
  const [showIncorrect, setShowIncorrect] = useState(false);

  const handleQuizGeneration = () => {
    router.push("/generate");
  };

  // Filter questions based on current view
  const filteredAnswers = quizAnswers.filter((answer) =>
    showIncorrect ? !answer.isCorrect : answer.isCorrect
  );

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Your Statistics"
          description="Track your learning progress and performance."
        />

        <Button onClick={handleQuizGeneration} className="sm:ml-auto">
          <PlusIcon className="w-4 h-4 mr-2" />
          Generate Quiz
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatisticsCard
          title="Total Correct Answers"
          value={totalCorrectAnswers}
          description="Click to view correctly answered questions."
          icon="sparkles"
          bgColor="bg-blue-500/10 dark:bg-blue-500/20"
          className="border-l-4 border-l-blue-500 cursor-pointer"
          onClick={() => setShowIncorrect(false)}
          isActive={!showIncorrect}
        />

        <StatisticsCard
          title="Total Incorrect Answers"
          value={totalIncorrectAnswers}
          description="Click to view incorrect answers for review."
          icon="xCircle"
          bgColor="bg-orange-500/10 dark:bg-orange-500/20"
          className="border-l-4 border-l-orange-500 cursor-pointer"
          onClick={() => setShowIncorrect(true)}
          isActive={showIncorrect}
        />

        <StatisticsCard
          title="Total Questions Attempted"
          value={allQuestions}
          description="Total number of questions you've attempted."
          icon="book"
          bgColor="bg-purple-500/10 dark:bg-purple-500/20"
          className="border-l-4 border-l-purple-500"
        />
      </div>

      {/* Questions List */}
      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-bold text-foreground">
          {showIncorrect
            ? "Incorrectly Answered Questions"
            : "Correctly Answered Questions"}
        </h2>
        <p className="text-muted-foreground">
          {filteredAnswers.length === 0
            ? `No ${showIncorrect ? "incorrect" : "correct"} answers yet.`
            : `Showing ${filteredAnswers.length} ${
                showIncorrect ? "incorrect" : "correct"
              } ${filteredAnswers.length === 1 ? "answer" : "answers"}.`}
        </p>

        {filteredAnswers.length > 0 && (
          <div className="space-y-4">
            {filteredAnswers.map((answer) => {
              const question = answer.question;
              const selectedIndex =
                answer.selectedIndex !== null
                  ? answer.selectedIndex
                  : undefined;
              const selectedOption =
                selectedIndex !== undefined &&
                Array.isArray(question.options) &&
                selectedIndex >= 0 &&
                selectedIndex < question.options.length
                  ? question.options[selectedIndex]
                  : null;
              const correctOption =
                typeof question.correctIndex === "number" &&
                Array.isArray(question.options) &&
                question.correctIndex >= 0 &&
                question.correctIndex < question.options.length
                  ? question.options[question.correctIndex]
                  : "";

              return (
                <div
                  key={answer.id}
                  className="border rounded-lg p-4 space-y-3 bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block rounded-lg px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm">
                          {answer.quiz.name}
                        </span>
                        {answer.isCorrect ? (
                          <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border-2 border-green-700 bg-green-50 text-green-800 dark:border-green-400 dark:bg-green-500/20 dark:text-green-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border-2 border-red-700 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-500/20 dark:text-red-200">
                            <XCircle className="w-3 h-3" />
                            Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-base font-semibold text-foreground">
                        {question.question}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Your answer:
                      </span>
                      {selectedOption !== null ? (
                        <span
                          className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                            answer.isCorrect
                              ? "bg-green-200/80 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                              : "bg-red-200/80 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                          }`}
                        >
                          {selectedOption}
                        </span>
                      ) : (
                        <span className="italic text-muted-foreground">
                          No answer submitted
                        </span>
                      )}
                    </div>

                    {!answer.isCorrect && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Correct answer:
                        </span>
                        <span className="rounded-lg px-3 py-1 text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 shadow">
                          {correctOption}
                        </span>
                      </div>
                    )}
                  </div>

                  {question.explanation && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${answer.id}`}>
                        <AccordionTrigger className="text-blue-700 dark:text-blue-400 underline underline-offset-4 text-sm">
                          ⓘ See explanation
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                          <div className="italic text-muted-foreground">
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
        )}
      </div>
    </section>
  );
};

export default LibraryStatistics;
