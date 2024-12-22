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
import { CATEGORIES, GENRESICON } from "@/data/sidebar-data";
import Line from "./ui/line";
import { useDispatch } from "react-redux";
import { setCategory, setGenreId } from "@/store/movie-slice";
import Link from "next/link";
import { useGetMovieGenresQuery } from "@/services/tmdb-api";
import { GenreType } from "@/types/genres";

type GenreWithIconsType = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const AppSidebar = () => {
  const { state } = useSidebar();
  const dispatch = useDispatch();
  const { data: genres } = useGetMovieGenresQuery({});

  const genresWithIcons: GenreWithIconsType[] = genres?.genres?.map(
    (genre: GenreType, index: number) => ({
      ...genre,
      icon: GENRESICON[index]?.icon || null,
    })
  );

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
                    <Link
                      href={`#${category.apiName}`}
                      onClick={() => dispatch(setCategory(category.apiName))}
                      className="text-xl flex space-x-2 cursor-pointer"
                    >
                      <span className="w-fit h-fit">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-medium text-gray-500">
              Genres
            </SidebarGroupLabel>
            <SidebarMenu>
              {genres &&
                genresWithIcons.map((genre: GenreWithIconsType) => {
                  console.log(genre);
                  return (
                    <SidebarMenuItem key={genre.id}>
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-gray-200"
                      >
                        <Link
                          href={`#${genre.name}`}
                          onClick={() => dispatch(setGenreId(genre.id))}
                          className="text-xl flex space-x-2 cursor-pointer"
                        >
                          <span className="w-fit h-fit">{genre.icon}</span>
                          <span>{genre.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton className="h-fit">
            <div className="flex items-center gap-2">
              <img
                src="https://placehold.co/400x400"
                alt="logo"
                className="rounded-full w-10 h-10"
              />
              <div>
                <h1 className="font-semibold">Name</h1>
                <p>email</p>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
