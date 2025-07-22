"use client";

import { cn } from "@/lib/utils";
import { MetricItem as MetricItemType } from "./types";

interface MetricItemProps {
  metric: MetricItemType;
}

export const MetricItem = ({ metric }: MetricItemProps) => {
  return (
    <div className="flex items-center justify-between hover:bg-muted/50 rounded-sm px-2 py-2 -mx-2 transition-colors">
      <span className="text-sm text-muted-foreground">{metric.label}</span>
      <div className="text-right">
        <span className="text-sm font-medium">{metric.value}</span>
        <span
          className={cn(
            "ml-2 text-xs",
            metric.changeType === "positive" && "text-green-600",
            metric.changeType === "negative" && "text-red-600",
            metric.changeType === "neutral" && "text-muted-foreground"
          )}
        >
          {metric.change}
        </span>
      </div>
    </div>
  );
};
