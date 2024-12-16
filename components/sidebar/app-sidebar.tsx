import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";

const AppSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-2xl font-bold">Movie Nest</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
};

export default AppSidebar;
