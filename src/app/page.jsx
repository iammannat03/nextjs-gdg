"use client";

import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import EventBanner from "@/components/EventsBanner";
import React from "react";

const page = (props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between container mx-auto my-5">
      <nav className="mx-auto border bg-gray-900 w-full py-2 rounded-lg px-4 text-white flex justify-between items-center">
        <div className="text-xl font-semibold text-white">
          MeowManager
        </div>
        <div className="flex gap-x-3 items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/sign-in")}
          >
            Login
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </Button>
          <Button
            variant="default"
            className=""
            onClick={() => router.push("/events")}
          >
            Go to Console
          </Button>
        </div>
      </nav>
      <span className="text-4xl font-bold ">Page</span>
    </div>
  );
};

export default page;
