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
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setGenreId } from "@/store/slice/movie-slice";
import Link from "next/link";
import { useGetMovieGenresQuery } from "@/services/tmdb-api";
import { GenreType } from "@/types/genres";
import { Button } from "./ui/button";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRequestToken } from "@/store/thunk/auth-thunk";

type GenreWithIconsType = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const AppSidebar = () => {
  const { state } = useSidebar();
  const dispatch = useDispatch<AppDispatch>();
  const { data: genres } = useGetMovieGenresQuery({});
  const { requestToken } = useSelector((state: RootState) => state.auth);

  // const handleRequestToken = async () => {
  //   try {
  //     if (requestToken) {
  //       dispatch(createSession(requestToken))
  //         .unwrap()
  //         .then((session) => {
  //           console.log(session);
  //           sessionStorage.setItem("sessionId", session.session_id);
  //         });
  //     }
  //   } catch (error) {
  //     console.error("Failed to create session:", error);
  //   }
  // };

  // useEffect(() => {
  //   handleRequestToken();
  // }, [dispatch, requestToken]);

  const handleLogin = async () => {
    try {
      await dispatch(fetchRequestToken());

      if (requestToken) {
        localStorage.setItem("requestToken", requestToken);
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/profile/approved`;
      }
    } catch (error) {
      console.error("Failed to fetch request token:", error);
    }
  };

  // const handleFetchRequestToken = () => {
  //   dispatch(fetchRequestToken());
  // };

  // const handleCreateSession = () => {
  //   if (requestToken) {
  //     dispatch(createSession(requestToken));
  //   }
  // };

  const genresWithIcons: GenreWithIconsType[] = genres?.genres?.map(
    (genre: GenreType, index: number) => ({
      ...genre,
      icon: GENRESICON[index]?.icon || null,
    })
  );

  const isAuthenticated = false;

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
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center gap-2"
              >
                <img
                  src="https://placehold.co/400x400"
                  alt="logo"
                  className="rounded-full w-10 h-10"
                />
                <div>
                  <h1 className="font-semibold">Name</h1>
                  <p>email</p>
                </div>
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
