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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES, GENRESICON } from "@/data/sidebar-data";
import Line from "./ui/line";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setGenreId } from "@/lib/features/slice/movie-slice";
import Link from "next/link";
import { useGetMovieGenresQuery } from "@/services/tmdb-api";
import { GenreType } from "@/types/genres";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchRequestToken } from "@/lib/features/thunk/auth-thunk";
import { setUserData } from "@/lib/features/slice/auth-slice";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import ToggleMode from "./toggle-mode";
import LogoutButton from "./logout-button";
import { Skeleton } from "./ui/skeleton";

type GenreWithIconsType = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const AppSidebar = () => {
  const pathname = usePathname();

  const { state } = useSidebar();
  const dispatch = useDispatch<AppDispatch>();
  const { data: genres, isLoading } = useGetMovieGenresQuery({});
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

  const displayCategories = CATEGORIES.map((category) => {
    const hrefLink = pathname === "/" ? `#${category.apiName}` : `/`;

    return (
      <SidebarMenuItem key={category.id}>
        <SidebarMenuButton
          asChild
          className="hover:bg-gray-200 dark:hover:text-black"
        >
          <Link
            href={hrefLink}
            onClick={() => dispatch(setCategory(category.apiName))}
            className="text-xl flex space-x-2 cursor-pointer dark:active:text-white"
          >
            <span className="w-fit h-fit">{category.icon}</span>
            <span>{category.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });

  const displayGenreIcon = useMemo(
    () =>
      genresWithIcons?.map((genre: GenreWithIconsType) => {
        const hrefLink = pathname === "/" ? `#${genre.name}` : `/`;

        return (
          <SidebarMenuItem key={genre.id}>
            <SidebarMenuButton
              asChild
              className="hover:bg-gray-200 dark:hover:text-black"
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
      }),
    [dispatch, genresWithIcons, pathname]
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
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-6"
                  ></Skeleton>
                ))}
              </div>
            ) : (
              <>
                <SidebarGroupLabel className="text-base font-medium text-gray-500">
                  Categories
                </SidebarGroupLabel>
                <SidebarMenu>{displayCategories}</SidebarMenu>
              </>
            )}
          </SidebarGroup>
          <SidebarGroup>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-6"
                  ></Skeleton>
                ))}
              </div>
            ) : (
              <>
                <SidebarGroupLabel className="text-base font-medium text-gray-500">
                  Genres
                </SidebarGroupLabel>
                <SidebarMenu>{displayGenreIcon}</SidebarMenu>
              </>
            )}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    className={`${
                      !isAuthenticated
                        ? "flex justify-center items-center text-center bg-black text-white mb-1 dark:bg-white dark:text-black rounded border font-semibold"
                        : "w-full h-fit"
                    }`}
                  >
                    {isAuthenticated ? (
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 w-10 h-10"
                      >
                        <Image
                          src={`https://gravatar.com/avatar/${user?.avatar?.gravatar?.hash}`}
                          alt="logo"
                          width={40}
                          height={40}
                          className={`rounded aspect-square w-10 h-10 object-cover ${
                            state === "collapsed" ? "-ml-3 -mt-1" : ""
                          }`}
                        />
                        <h1 className="font-semibold">{user?.username}</h1>
                      </Link>
                    ) : (
                      <h1>Login</h1>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span className="w-full">
                      {isAuthenticated ? (
                        <LogoutButton />
                      ) : (
                        <Button
                          asChild
                          onClick={handleLogin}
                          variant={"default"}
                        >
                          <h1 className="flex items-center gap-2 w-full cursor-pointer">
                            Login
                          </h1>
                        </Button>
                      )}
                    </span>
                  </DropdownMenuItem>
                  {isAuthenticated && (
                    <DropdownMenuItem>
                      <span className="w-full">
                        <Button asChild>
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 w-full cursor-pointer"
                          >
                            Profile
                          </Link>
                        </Button>
                      </span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <span className="w-full">
                      <ToggleMode />
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
