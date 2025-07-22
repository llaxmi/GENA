"use client";

import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityItem } from "./types";

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    title: "Science Quiz Set",
    time: "2 hours ago",
    detail: "Generated from 'Biology Chapter 3' PDF",
    status: "success",
  },
  {
    id: "2",
    title: "Mathematics Practice",
    time: "5 hours ago",
    detail: "Generated from keyword 'algebra'",
    status: "success",
  },
  {
    id: "3",
    title: "History Review",
    time: "1 day ago",
    detail: "Generated from paragraph about WWI",
    status: "success",
  },
  {
    id: "4",
    title: "Chemistry Quiz",
    time: "2 days ago",
    detail: "Generated from 'Chemistry' PDF",
    status: "success",
  },
];

const getStatusConfig = (status: ActivityItem["status"]) => {
  const configs = {
    success: {
      badge: "bg-green-100 text-green-800 hover:bg-green-200",
      icon: "checkCircle",
      iconColor: "text-green-600",
    },
    warning: {
      badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      icon: "alertTriangle",
      iconColor: "text-yellow-600",
    },
    info: {
      badge: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      icon: "info",
      iconColor: "text-blue-600",
    },
    error: {
      badge: "bg-red-100 text-red-800 hover:bg-red-200",
      icon: "x",
      iconColor: "text-red-600",
    },
  };
  return configs[status];
};

export const RecentActivity = () => {
  return (
    <section className="py-8 px-4">
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Recent Activity
        </h2>
        <p className="text-gray-600 text-base font-light italic">
          Quick access to your recently generated quiz sets.
        </p>
      </header>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {recentActivities.map((activity) => {
          const config = getStatusConfig(activity.status);
          const IconComponent = Icons[config.icon as keyof typeof Icons];

          return (
            <Card
              key={activity.id}
              className="group cursor-pointer border-[0.1px] bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${config.iconColor}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-800 truncate">
                          {activity.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {activity.detail}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    Resume
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {recentActivities.length === 0 && (
          <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
            <CardContent className="p-8 text-center">
              <Icons.clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No recent activity
              </h3>
              <p className="text-gray-500 mb-4">
                Start generating quiz sets to see your recent activity here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
