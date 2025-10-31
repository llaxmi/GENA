"use client";

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

export const RecentActivity = ({ quizzes }: { quizzes: Quiz[] }) => {
  console.log(quizzes);
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
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell className="font-medium">{quiz.name}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
