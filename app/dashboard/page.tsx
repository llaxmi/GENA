"use client";

import { DashboardLayout, QuickStart } from "@/components/dashboard";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Quick Start Section */}
        <QuickStart />

        <Separator />

        {/* Recent Activity Section */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
