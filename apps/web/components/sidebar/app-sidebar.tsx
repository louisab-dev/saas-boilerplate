"use client";

import * as React from "react";
import {
  Bot,
  ChevronLeft,
  Frame,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { SidebarTop } from "@/components/sidebar/sidebar-top";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@supabase/supabase-js";
import { nan } from "zod";

const data = {
  navMain: [
    {
      title: "Some title",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Some route",
          url: "#",
        },
        {
          title: "Some other route",
          url: "#",
        },
      ],
    },
    {
      title: "Some other section",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "More route",
          url: "#",
        },
        {
          title: "Some other route",
          url: "#",
        },
      ],
    },
  ],
};

export function SidebarToggle(
  { toggleSidebar }: { toggleSidebar: () => void },
) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-9 w-9 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-2">
        <span className="text-sm">Toggle sidebar</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground">
          <span className="text-xs text-foreground">⌘</span>B
        </kbd>
      </TooltipContent>
    </Tooltip>
  );
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <SidebarTop toggleSidebar={toggleSidebar} />
          <SidebarToggle toggleSidebar={toggleSidebar} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
