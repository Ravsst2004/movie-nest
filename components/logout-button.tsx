"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/features/slice/auth-slice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <Button
        variant={"destructive"}
        onClick={handleLogout}
        className="w-full"
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
