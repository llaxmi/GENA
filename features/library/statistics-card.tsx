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
  onClick?: () => void;
  isActive?: boolean;
}

export const StatisticsCard = ({
  title,
  value,
  description,
  icon,
  className,
  bgColor,
  onClick,
  isActive = false,
}: StatisticsCardProps) => {
  const IconComponent = Icons[icon];
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group border border-border shadow-sm hover:shadow-lg  p-x-2 py-0 transition-all duration-300 hover:-translate-y-0.5 bg-card",
        onClick && "cursor-pointer",
        isActive && "ring-2 ring-blue-800 ring-offset-2",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex gap-3 items-start">
          <div
            className={cn(
              "w-12 h-12 rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
              bgColor
            )}
          >
            <IconComponent className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
