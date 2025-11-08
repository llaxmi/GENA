"use client";

import LogoutDialog from "@/components/logout";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpen, Home, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Minimal menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Library",
    url: "/library",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="transition-opacity hover:opacity-80">
          <Image
            src="/gena.svg"
            alt="GENA"
            width={200}
            height={20}
            className="h-auto"
          />
        </Link>
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent className="px-2">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 border-l-4 rounded-l-none border-blue-800 text-primary font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isActive ? "text-primary" : ""}`}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setShowLogoutModal(true)}
              className="w-full justify-start px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <LogoutDialog
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </Sidebar>
  );
};

export default AppSidebar;
