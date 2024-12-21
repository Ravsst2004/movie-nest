"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { CATEGORIES } from "@/data/sidebar-data";
import Line from "./ui/line";
import { useDispatch } from "react-redux";
import { setCategory } from "@/store/movie-slice";
import Link from "next/link";

const AppSidebar = () => {
  const { state } = useSidebar();
  const dispatch = useDispatch();

  return (
    <>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
      >
        <SidebarHeader className={state === "collapsed" ? "hidden" : ""}>
          <Link
            href={"/"}
            className="text-3xl font-bold text-center"
          >
            Movie Nest
          </Link>
          <Line />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-medium text-gray-500">
              Categories
            </SidebarGroupLabel>
            <SidebarMenu>
              {CATEGORIES.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-200"
                  >
                    <div
                      onClick={() => dispatch(setCategory(category.apiName))}
                      className="text-xl flex space-x-2 cursor-pointer"
                    >
                      <span className="w-fit h-fit">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
