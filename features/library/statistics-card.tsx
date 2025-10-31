import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatisticsCardProps {
  title: string;
  value: number;
  description: string;
  icon: keyof typeof Icons;
  className: string;
  bgColor: string;
}

export const StatisticsCard = ({
  title,
  value,
  description,
  icon,
  className,
  bgColor,
}: StatisticsCardProps) => {
  const IconComponent = Icons[icon];
  return (
    <Card
      className={cn(
        "group border-[0.1px] border-l-4 bg-white shadow-sm hover:shadow-xl ",
        className
      )}
    >
      <CardContent>
        <div className="flex gap-2 sm:gap-4 items-start">
          <div
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md flex-shrink-0 flex items-center justify-center",
              bgColor
            )}
          >
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 transition-colors mb-1">
              {title}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {value}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
