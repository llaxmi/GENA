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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {quickStartOptions.map((option, idx) => {
          const IconComponent = Icons[option.icon];
          return (
            <Card
              key={option.title}
              className={`
                group cursor-pointer transition-all duration-300 relative
                bg-card border border-border shadow-sm hover:shadow-lg
                hover:-translate-y-0.5 hover:border-primary/20 py-4
                overflow-hidden
              `}
              onClick={() => {
                router.push("/generate");
              }}
            >
              <CardContent className="flex gap-4 px-4 py-0">
                <div
                  className={`
                    flex items-center justify-center 
                    w-14 h-14 rounded-xl
                    ${option.iconBgColor} 
                    shadow-sm group-hover:shadow-md
                    transition-all duration-300 group-hover:scale-110
                    flex-shrink-0
                  `}
                >
                  <IconComponent className="w-7 h-7 text-gray-800" />
                </div>
                <div className="flex flex-col justify-center gap-1 flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
