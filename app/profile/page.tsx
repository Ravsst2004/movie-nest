"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/store/slice/auth-slice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="px-2">
      Profile
      <h1>{user?.username}</h1>
      <Button
        variant={"destructive"}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
