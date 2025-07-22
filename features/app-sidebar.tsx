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
    <Sidebar>
      <SidebarHeader>
        <Image src="/gena.svg" alt="GENA" width={250} height={20} />
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-4 p-4 font-secondary ${
                      isActive
                        ? "font-bold text-foreground bg-accent rounded-none"
                        : " "
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
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
