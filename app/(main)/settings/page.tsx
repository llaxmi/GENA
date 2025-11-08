import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PageHeader from "@/features/page-header";
import { getUser } from "@/lib/session";
import { User } from "lucide-react";

function formatDate(dateString?: string | Date) {
  if (!dateString) return "Unknown";
  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Unknown";
  }
}

const SettingsPage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <div className="max-w-3xl">
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences."
        />
        <Card className="border border-border shadow-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Unable to load user information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userInitial =
    user.name?.charAt(0)?.toUpperCase() ??
    user.email?.charAt(0)?.toUpperCase() ??
    "U";

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>
            View your account information. Name and email cannot be edited.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                <span className="text-primary text-2xl font-bold">
                  {userInitial}
                </span>
              </div>
              <div className="flex-1 space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="px-3 py-2 rounded-md border border-border bg-muted/50 text-sm">
                    {user.name || "Not provided"}
                  </div>
                </div>
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="px-3 py-2 rounded-md border border-border bg-muted/50 text-sm">
                    {user.email || "Not provided"}
                  </div>
                </div>
                {/* Account Created Field */}
                <div className="space-y-2">
                  <Label htmlFor="created" className="text-sm font-medium">
                    Member Since{" "}
                  </Label>
                  <p className="px-3 py-2 rounded-md border border-border bg-muted/50 text-sm">
                    {user.createdAt ? formatDate(user.createdAt) : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
