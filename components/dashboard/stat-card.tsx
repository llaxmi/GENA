"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardOptions } from "./types";

export const StatCard = ({ title, value, change, icon }: DashboardOptions) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium text-green-600">{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
