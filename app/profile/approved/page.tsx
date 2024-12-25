"use client";

import { createSession } from "@/store/thunk/auth-thunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ApprovedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");
    const approved = urlParams.get("approved");

    if (approved === "true" && requestToken) {
      dispatch(createSession(requestToken))
        .unwrap()
        .then((session: { session_id: string }) => {
          sessionStorage.setItem("sessionId", session.session_id);
          console.log("Session created:", session.session_id);
          window.location.href = window.location.origin;
        })
        .catch((error) => {
          console.error("Failed to create session:", error);
        });
    }
  }, [dispatch]);

  return <div>Processing...</div>;
};

export default ApprovedPage;