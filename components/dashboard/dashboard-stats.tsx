import { StatCard } from "./stat-card";
import { DashboardOptions } from "./types";

export const DashboardStats = ({ stats }: { stats: DashboardOptions[] }) => {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
