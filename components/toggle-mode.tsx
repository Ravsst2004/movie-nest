"use client";

import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLayoutEffect } from "react";

function ToggleMode() {
  const { setTheme } = useTheme();

  useLayoutEffect(() => {
    const originalPointerEvents = document.body.style.pointerEvents;

    return () => {
      document.body.style.pointerEvents = originalPointerEvents;
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:text-black"
      >
        <span
          className={`w-full p-2 ${buttonVariants({ variant: "outline" })}`}
        >
          Toggle theme
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ToggleMode;
