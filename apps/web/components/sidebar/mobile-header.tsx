"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed bottom-4 left-4 z-50 md:hidden">
      <Button
        size="icon"
        onClick={toggleSidebar}
        className="rounded-full text-white shadow-lg"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
}
