import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/features/sidebar/app-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-6 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <div className="min-h-[calc(100vh-3rem)]">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
