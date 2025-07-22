"use client";

import LogoutDialog from "@/components/logout";
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

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold">GENA</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-3 px-4 py-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setShowLogoutModal(true)}>
              <div className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
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
