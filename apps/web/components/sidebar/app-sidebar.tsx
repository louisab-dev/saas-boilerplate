"use client";

import * as React from "react";
import { Boxes, ChevronLeft } from "lucide-react";

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
import { useI18n } from "@/locales/client";
import { MobileHeader } from "./mobile-header";

function getSidebarItems() {
  const t = useI18n();
  const data = [
    {
      title: t("nav.main.firstSection"),
      url: "#",
      icon: Boxes,
      isActive: true,
      items: [
        {
          title: t("nav.main.firstRoute"),
          url: "#",
        },
        {
          title: t("nav.main.secondRoute"),
          url: "#",
        },
      ],
    },
    {
      title: t("nav.main.secondSection"),
      url: "#",
      icon: Boxes,
      items: [
        {
          title: t("nav.main.thirdRoute"),
          url: "#",
        },
        {
          title: t("nav.main.fourthRoute"),
          url: "#",
        },
      ],
    },
  ];
  return data;
}

export function SidebarToggle(
  { toggleSidebar }: { toggleSidebar: () => void },
) {
  const t = useI18n();
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
        <span className="text-sm">{t("nav.sidebar.toggle")}</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground">
          <span className="text-xs text-foreground">⌘</span>B
        </kbd>
      </TooltipContent>
    </Tooltip>
  );
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar();
  const sidebarItems = getSidebarItems();

  return (
    <>
      <MobileHeader />
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <SidebarTop toggleSidebar={toggleSidebar} />
            <SidebarToggle toggleSidebar={toggleSidebar} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarItems} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
