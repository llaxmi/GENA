"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/features/page-header";
import { Quiz } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { CheckCircle2, Library, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getScoreVariant(score: number, total: number) {
  if (total === 0) return "bg-slate-200 text-slate-500";
  const ratio = score / total;
  if (ratio === 1) return "bg-green-100 text-green-800 border-green-400";
  if (ratio > 0.7) return "bg-blue-100 text-blue-800 border-blue-400";
  if (ratio > 0.4) return "bg-yellow-100 text-yellow-900 border-yellow-400";
  return "bg-red-100 text-red-800 border-red-400";
}

export const RecentActivity = ({ quizzes }: { quizzes: Quiz[] }) => {
  const router = useRouter();
  return (
    <section>
      <PageHeader
        title="Recent Quiz Sets"
        description="Track your progress and access your quiz sets."
      />
      <div className=" overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Questions</TableHead>
              <TableHead className="font-semibold">Difficulty</TableHead>
              <TableHead className="text-right font-semibold">
                Created At
              </TableHead>
              <TableHead className="text-right font-semibold">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!quizzes || quizzes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground">
                        No recent quiz sets
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        When you create or complete a quiz, it will appear here
                        for quick access and progress tracking.
                      </p>
                    </div>
                    <Link
                      href="/generate"
                      className={cn(
                        buttonVariants({ variant: "primary" }),
                        "flex gap-2 items-center px-6 py-3 mt-2"
                      )}
                    >
                      <PlusIcon className="w-4 h-4" />
                      Generate your first quiz
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              quizzes.map((quiz) => (
                <TableRow
                  key={quiz.id}
                  className="group transition-colors cursor-pointer hover:bg-accent/50"
                  onClick={() => router.push(`/quiz/${quiz.id}`)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Library
                        className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Open"
                        strokeWidth={2.25}
                      />
                      <span className="truncate max-w-[200px]">
                        {quiz.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md font-medium text-xs bg-secondary text-secondary-foreground">
                      {quiz.numberOfQuestions}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-sm text-muted-foreground">
                      {quiz.difficultyLevel}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(quiz.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center">
                      {typeof quiz.score === "number" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-medium text-sm">
                          <span>{quiz.score}</span>
                          <span className="text-xs opacity-70 pl-1">
                            /{quiz.numberOfQuestions}
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground font-medium text-sm">
                          --
                          <span className="text-xs opacity-70 pl-1">
                            /{quiz.numberOfQuestions}
                          </span>
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
