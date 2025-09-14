"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("overview");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/scan-results") {
      setActiveTab("overview");
    } else if (pathname === "/scan-results/incident-report") {
      setActiveTab("incident-report");
    } else if (pathname === "/scan-results/trainings") {
      setActiveTab("trainings");
    }
  }, [activeTab, pathname]);

  let website_url = "https://makler.md";

  return (
    <PageLayout width="w-[950px]">
      <div className="flex flex-col items-center justify-center mt-[150px]">
        <Card className="w-full border-none bg-zinc-800 p-4 flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-zinc-700 text-zinc-300 rounded-[20px]">
              <TabsTrigger value="overview" className="rounded-[20px] data-[state=active]:bg-zinc-600">
                <Link href="/scan-results">Overview</Link>
              </TabsTrigger>
              <TabsTrigger value="incident-report" className="rounded-[20px] data-[state=active]:bg-zinc-600">
                <Link href="/scan-results/incident-report">
                  Incident Report
                </Link>
              </TabsTrigger>
              <TabsTrigger value="trainings" className="rounded-[20px] data-[state=active]:bg-zinc-600">
                <Link href="/scan-results/trainings">Trainings</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="text-zinc-300 text-sm">{website_url}</div>
        </Card>
        {children}
      </div>
    </PageLayout>
  );
}
