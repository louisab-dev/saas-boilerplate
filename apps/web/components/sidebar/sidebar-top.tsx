"use client";
import * as React from "react";
import { Boxes } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarTop(
  { toggleSidebar }: { toggleSidebar: () => void },
) {
  return (
    <SidebarMenu>
      <SidebarMenuItem onClick={toggleSidebar}>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Boxes className="size-4" />
          </div>
          <div className="grid flex-1 text-left">
            <span className="truncate font-semibold">CHANGEME.</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
