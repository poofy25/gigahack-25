"use client";
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <PageLayout>
      <div className="flex justify-center items-center w-[690px] h-[500px]">
        {/* Cyber Security Audit Card */}
        <Card className="bg-zinc-800 w-[690px] h-[500px] text-center rounded-[36px] flex flex-col items-center justify-center">
          <CardHeader className="pb-4 max-w-[500px]">
            <CardTitle className="text-3xl font-bold leading-tight">
              <span className="text-blue-400">Avoid fines</span> with the
              CyberDoc Cyber Security Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-[500px]">
            <CardDescription className="text-zinc-400 text-sm leading-relaxed mb-8">
              Moldova's Cybersecurity Law (
              <span className="underline">Law 142/2023</span>) will start
              enforcing penalties from January 1, 2026, including fines up to
              MDL 15,000 for non-compliance. This tool helps you self-assess and
              fix gaps now to avoid costly sanctions.
            </CardDescription>

            <Link href="/survey" className="pt-8">
              <Button>Start Self-Audit</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
