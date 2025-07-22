"use client";

import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface QuickStartOption {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  iconBgColor: string;
  borderColor: string;
}

const quickStartOptions: QuickStartOption[] = [
  {
    title: "Generate using text",
    description: "Generate quiz sets just by typing in a text.",
    icon: "sparkles",
    iconBgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    borderColor: "border-blue-200",
  },
  {
    title: "Generate using PDF",
    description: "Upload your document and generate quiz sets.",
    icon: "fileText",
    iconBgColor: "bg-gradient-to-br from-red-100 to-red-200",
    borderColor: "border-red-200",
  },
];

export const QuickStart = () => {
  const router = useRouter();
  return (
    <section className="py-8 px-4">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Quick Start
        </h2>
        <p className="text-gray-600 text-base font-light italic">
          Choose your preferred method to generate quiz sets.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickStartOptions.map((option) => {
          const IconComponent = Icons[option.icon];
          return (
            <Card
              key={option.title}
              className={`group cursor-pointer border-[0.1px] border-l-4 ${option.borderColor} bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              onClick={() => {
                router.push("/generate");
              }}
            >
              <CardContent className="p-0 px-4">
                <div className="flex gap-4 items-start">
                  <div
                    className={`w-12 h-12 rounded-xl ${option.iconBgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md flex-shrink-0`}
                  >
                    <IconComponent className="w-7 h-7 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
