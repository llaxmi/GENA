"use client";

import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/features/page-header";
import { useRouter } from "next/navigation";

interface QuickStartOption {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  iconBgColor: string;
}

const quickStartOptions: QuickStartOption[] = [
  {
    title: "Generate using text",
    description: "Generate quiz sets just by typing in a text.",
    icon: "sparkles",
    iconBgColor: "bg-gradient-to-br from-blue-100 to-blue-300",
  },
  {
    title: "Generate using PDF",
    description: "Upload your document and generate quiz sets.",
    icon: "fileText",
    iconBgColor: "bg-gradient-to-br from-pink-100 to-red-300",
  },
];

export const QuickStart = () => {
  const router = useRouter();
  return (
    <section>
      <PageHeader
        title="Quick Start"
        description="Choose your preferred way to get started creating quiz sets."
      />

      <div className="flex md:flex-row gap-4 w-full">
        {quickStartOptions.map((option, idx) => {
          const IconComponent = Icons[option.icon];
          return (
            <Card
              key={option.title}
              className={`
                group cursor-pointer transition-all duration-300 relative
                bg-white  shadow-lg hover:shadow-2xl 
                hover:-translate-y-1 hover:border-slate-400
                overflow-hidden px-0 md:px-3 
              `}
              onClick={() => {
                router.push("/generate");
              }}
            >
              <CardContent className="flex gap-4">
                <div
                  className={`
                    flex items-center justify-center 
                    w-12 h-12 rounded-2xl
                    ${option.iconBgColor} 
                    shadow-md group-hover:shadow-lg
                    transition-all duration-300 group-hover:scale-105
                  `}
                >
                  <IconComponent className="w-8 h-8 text-gray-700 drop-shadow-sm" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-500 text-sm text-center leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
