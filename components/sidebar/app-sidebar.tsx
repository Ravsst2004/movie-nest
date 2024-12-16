import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { CATEGORIES } from "@/data/sidebar-data";
import Line from "../ui/line";

const AppSidebar = () => {
  return (
    <>
      <Sidebar variant="sidebar">
        <SidebarHeader>
          <h1 className="text-3xl font-extrabold text-center">Movie Nest</h1>
          <Line />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base text-gray-500">
              Categories
            </SidebarGroupLabel>
            {CATEGORIES.map((category) => (
              <SidebarMenuItem
                key={category.id}
                className="flex items-center"
              >
                <SidebarMenuButton asChild>
                  <Link
                    href={"/"}
                    className="text-xl space-x-2"
                  >
                    <span className="w-fit h-fit">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
          <p className="h-[1px] w-full bg-gray-200"></p>
          {/* <SidebarGroup>
            <SidebarGroupLabel className="text-base">Genres</SidebarGroupLabel>
          </SidebarGroup> */}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton>See all</SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;