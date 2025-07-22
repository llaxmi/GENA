"use client";

import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/features/page-header";
import { Button } from "../ui/button";
import { ActivityItem } from "./types";

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    title: "C++ Practice",
    time: "2 hours ago",
    detail: "Generated from keyword 'algebra'",
    status: "success",
  },
  {
    id: "2",
    title: "Python Review",
    time: "5 hours ago",
    detail: "Generated from paragraph about WWI",
    status: "success",
  },
  {
    id: "3",
    title: "Java Review",
    time: "1 day ago",
    detail: "Generated from 'Java' PDF",
    status: "success",
  },
  {
    id: "4",
    title: "Java Review",
    time: "2 days ago",
    detail: "Generated from 'Java' PDF",
    status: "success",
  },
];

const getStatusConfig = (status: ActivityItem["status"]) => {
  const configs = {
    success: {
      badge: "bg-green-100 text-green-800",
      icon: "checkCircle",
      iconColor: "text-green-500",
    },
    warning: {
      badge: "bg-yellow-100 text-yellow-800",
      icon: "alertTriangle",
      iconColor: "text-yellow-500",
    },
    info: {
      badge: "bg-blue-100 text-blue-800",
      icon: "info",
      iconColor: "text-blue-500",
    },
    error: {
      badge: "bg-red-100 text-red-800",
      icon: "x",
      iconColor: "text-red-500",
    },
  };
  return configs[status];
};

export const RecentActivity = () => {
  return (
    <section className="p-4">
      <PageHeader
        title="Recent Activity"
        description="See what you've been working on lately."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {recentActivities.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
            <CardContent className="p-8 text-center">
              <Icons.clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No recent activity
              </h3>
              <p className="text-gray-500 mb-4">
                Start generating quiz sets to see your recent activity here.
              </p>
            </CardContent>
          </Card>
        ) : (
          recentActivities.map((activity) => {
            const config = getStatusConfig(activity.status);
            const IconComponent = Icons[config.icon as keyof typeof Icons];

            return (
              <Card
                key={activity.id}
                className="group border border-gray-100 bg-white shadow hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-2 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${config.badge}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${config.iconColor}`}
                      />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {activity.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {activity.detail}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end flex-1 h-full">
                    <Button
                      size="sm"
                      className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors mt-auto"
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
};
