"use client";

import { Icons } from "@/components/icons";
import PrimaryButton from "@/components/primary-button";
import PageHeader from "@/features/page-header";
import { useRouter } from "next/navigation";
import { StatisticsCard } from "./statistics-card";

interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: keyof typeof Icons;
  iconBgColor: string;
  borderColor: string;
}

const LibraryStatistics = ({
  totalCorrectAnswers,
  totalIncorrectAnswers,
  allQuestions,
}: {
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  allQuestions: number;
}) => {
  const router = useRouter();
  const handleQuizGeneration = () => {
    router.push("/generate");
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Your Statistics"
          description="Overview of your quiz generation and usage."
        />

        <PrimaryButton title="+ Generate" onClick={handleQuizGeneration} />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatisticsCard
          title="Total Correct Answers"
          value={totalCorrectAnswers}
          description="This is the number of correct answers you have gotten."
          icon="sparkles"
          bgColor="bg-blue-200"
          className="border-blue-300"
        />

        <StatisticsCard
          title="Total Incorrect Answers"
          value={totalIncorrectAnswers}
          description="This is the number of incorrect answers you have gotten."
          icon="xCircle"
          bgColor="bg-orange-200"
          className="border-orange-300"
        />

        <StatisticsCard
          title="Total Questions Attempted"
          value={allQuestions}
          description="This is the number of questions you have attempted."
          icon="book"
          bgColor="bg-purple-200"
          className="border-purple-300"
        />
      </div>
    </section>
  );
};

export default LibraryStatistics;
