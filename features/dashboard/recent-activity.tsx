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
    <section className="p-4">
      <PageHeader
        title="Recent Quiz Sets"
        description="See your recent quiz sets."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Name</TableHead>
            <TableHead className="w-[70px]">Questions</TableHead>
            <TableHead className="w-[90px]">Difficulty</TableHead>
            <TableHead className="text-right w-[130px]">Created At</TableHead>
            <TableHead className="text-right w-[95px]">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!quizzes || quizzes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-14 text-center bg-slate-50/60 dark:bg-slate-800/60"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <CheckCircle2 className="w-9 h-9 text-slate-300 dark:text-slate-600 mb-2" />
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-200">
                    No recent quiz sets
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    When you create or complete a quiz, it will appear here for
                    quick access and progress tracking.
                  </p>
                  <Link
                    href="/generate"
                    className={cn(
                      buttonVariants({ variant: "primary" }),
                      "flex gap-2 items-center px-5 py-2.5"
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
                className="group transition rounded-xl cursor-pointer hover:bg-blue-50/40 dark:hover:bg-blue-900/20"
                onClick={() => router.push(`/quiz/${quiz.id}`)}
              >
                <TableCell className="relative font-medium w-1/3 flex gap-2 items-center">
                  <Library
                    className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition"
                    aria-label="Open"
                    strokeWidth={2.25}
                  />
                  <span className="block max-w-[130px]">{quiz.name}</span>
                </TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-sm bg-slate-100 text-slate-700">
                    {quiz.numberOfQuestions}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="capitalize">{quiz.difficultyLevel}</span>
                </TableCell>
                <TableCell className="text-right text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(quiz.createdAt)}
                </TableCell>
                <TableCell className="text-right align-middle">
                  <div className="flex justify-end items-center">
                    {typeof quiz.score === "number" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-50 border border-green-300 text-green-700  text-sm min-w-[56px] justify-center">
                        <span>{quiz.score}</span>
                        <span className="text-xs opacity-60 pl-0.5">
                          /{quiz.numberOfQuestions}
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-300 text-gray-500 font-semibold text-sm min-w-[56px] justify-center">
                        --
                        <span className="text-xs opacity-60 pl-0.5">
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
    </section>
  );
};
