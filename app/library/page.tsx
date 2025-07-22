"use client";

import { DashboardLayout } from "@/components/dashboard";
import { Icons } from "@/components/icons";
import PrimaryButton from "@/components/primary-button";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/features/page-header";
import { useRouter } from "next/navigation";

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: keyof typeof Icons;
  iconBgColor: string;
  borderColor: string;
}

const stats: StatCard[] = [
  {
    title: "Total Sets Generated",
    value: "24",
    description: "Quiz sets created",
    icon: "sparkles",
    iconBgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    borderColor: "border-blue-200",
  },
  {
    title: "Sets Played",
    value: "18",
    description: "Times you've taken quizzes",
    icon: "checkCircle",
    iconBgColor: "bg-gradient-to-br from-green-100 to-green-200",
    borderColor: "border-green-200",
  },
  {
    title: "All Question Sets",
    value: "156",
    description: "Total questions across all sets",
    icon: "fileText",
    iconBgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
    borderColor: "border-purple-200",
  },
];

const Library = () => {
  const router = useRouter();
  const handleQuizGeneration = () => {
    router.push("/generate");
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Section */}

        <section className="py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
          <div className="flex justify-between items-center">
            <PageHeader
              title="Your Statistics"
              description="Overview of your quiz generation and usage."
            />

            <PrimaryButton title="+ Generate" onClick={handleQuizGeneration} />
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const IconComponent = Icons[stat.icon];
              return (
                <Card
                  key={stat.title}
                  className={`group border-[0.1px] border-l-4 ${stat.borderColor} bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <CardContent>
                    <div className="flex gap-3 sm:gap-4 items-start">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${stat.iconBgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md flex-shrink-0`}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 transition-colors mb-1">
                          {stat.title}
                        </h3>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Library;
