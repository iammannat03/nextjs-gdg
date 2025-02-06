"use client";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Dashboard" />
        <Button
          onClick={() => router.push("/console/events/new")}
        >
          <Plus /> Create Event
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
