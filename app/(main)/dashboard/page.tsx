import { QuickStart } from "@/components/dashboard";
import { Separator } from "@/components/ui/separator";
import { RecentActivity } from "@/features/dashboard/recent-activity";
import { prisma } from "@/lib/auth";
import { getUser } from "@/lib/session";

const Dashboard = async () => {
  const user = await getUser();
  const quizzes = await prisma.quiz.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className="space-y-8">
      {/* Quick Start Section */}
      <QuickStart />

      <Separator />

      {/* Recent Activity Section */}
      <RecentActivity quizzes={quizzes} />
    </div>
  );
};

export default Dashboard;
