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
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Number of Questions</TableHead>
            <TableHead>Difficulty Level</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!quizzes || quizzes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-12 text-center bg-slate-50/50 dark:bg-slate-800/50"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="mt-2 text-lg font-semibold text-slate-600 dark:text-slate-300">
                    No recent quiz sets
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    When you create or complete a quiz, it will appear here for
                    quick access and progress tracking.
                  </p>
                  <Link
                    href="/generate"
                    className={cn(buttonVariants({ variant: "primary" }))}
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
                className="cursor-pointer"
                onClick={() => router.push(`/quiz/${quiz.id}`)}
              >
                <TableCell className="font-medium w-1/4">{quiz.name}</TableCell>
                <TableCell>{quiz.numberOfQuestions}</TableCell>
                <TableCell className="capitalize">
                  {quiz.difficultyLevel}
                </TableCell>
                <TableCell className="text-right">
                  {quiz.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right ">
                  <span className="bg-green-50 border-green-300 border  text-green-700 font-medium rounded-full px-2">
                    {quiz.score} / {quiz.numberOfQuestions}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
};
