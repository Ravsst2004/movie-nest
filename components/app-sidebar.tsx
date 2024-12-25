"use client";

import React, { useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setGenreId } from "@/store/slice/movie-slice";
import Link from "next/link";
import { useGetMovieGenresQuery } from "@/services/tmdb-api";
import { GenreType } from "@/types/genres";
import { Button } from "./ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRequestToken } from "@/store/thunk/auth-thunk";
import { setUserData } from "@/store/slice/auth-slice";
import Image from "next/image";
import { usePathname } from "next/navigation";

type GenreWithIconsType = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const AppSidebar = () => {
  const pathname = usePathname();

  const { state } = useSidebar();
  const dispatch = useDispatch<AppDispatch>();
  const { data: genres } = useGetMovieGenresQuery({});
  const { requestToken, user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) return;

    (async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const userData = await res.json();
        dispatch(setUserData(userData));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, [dispatch]);

  const handleLogin = async () => {
    try {
      await dispatch(fetchRequestToken()).unwrap();

      if (!requestToken) return;

      localStorage.setItem("requestToken", requestToken);
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/profile/approved`;
    } catch (error) {
      console.error("Failed to fetch request token:", error);
    }
  };

  const genresWithIcons: GenreWithIconsType[] = genres?.genres?.map(
    (genre: GenreType, index: number) => ({
      ...genre,
      icon: GENRESICON[index]?.icon || null,
    })
  );

  const displayCategories = useMemo(() => {
    return CATEGORIES.map((category) => {
      let hrefLink;
      if (pathname === "/") {
        hrefLink = `#${category.apiName}`;
      } else {
        hrefLink = `/`;
      }

      return (
        <SidebarMenuItem key={category.id}>
          <SidebarMenuButton
            asChild
            className="hover:bg-gray-200"
          >
            <Link
              href={hrefLink}
              onClick={() => dispatch(setCategory(category.apiName))}
              className="text-xl flex space-x-2 cursor-pointer"
            >
              <span className="w-fit h-fit">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  }, [dispatch, pathname]);

  const displayGenreIcon = useMemo(() => {
    return genresWithIcons?.map((genre: GenreWithIconsType) => {
      let hrefLink;
      if (pathname === "/") {
        hrefLink = `#${genre.name}`;
      } else {
        hrefLink = `/`;
      }

      return (
        <SidebarMenuItem key={genre.id}>
          <SidebarMenuButton
            asChild
            className="hover:bg-gray-200"
          >
            <Link
              href={hrefLink}
              onClick={() => dispatch(setGenreId(genre.id))}
              className="text-xl flex space-x-2 cursor-pointer"
            >
              <span className="w-fit h-fit">{genre.icon}</span>
              <span>{genre.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  }, [dispatch, genresWithIcons, pathname]);

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
            <SidebarMenu>{displayCategories}</SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-medium text-gray-500">
              Genres
            </SidebarGroupLabel>
            <SidebarMenu>{displayGenreIcon}</SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton className="h-fit">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center gap-2"
              >
                <Image
                  src={`https://gravatar.com/avatar/${user?.avatar?.gravatar?.hash}`}
                  alt="logo"
                  width={100}
                  height={100}
                  className="rounded-full w-10 h-10"
                />
                <h1 className="font-semibold">{user?.username}</h1>
              </Link>
            ) : (
              <Button
                asChild
                onClick={handleLogin}
                variant={"default"}
                className="w-full"
              >
                <h1 className="flex items-center gap-2">Login</h1>
              </Button>
            )}
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
