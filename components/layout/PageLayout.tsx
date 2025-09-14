"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PageLayoutProps {
  children: React.ReactNode;
  showFounders?: boolean;
  showEmployees?: boolean;
  width?: string;
}

export function PageLayout({
  children,
  showFounders = false,
  showEmployees = false,
  width = "686px",
}: PageLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="bg-transparent grid justify-items-center [align-items:start] w-full h-full">
      <div className="w-[1440px] h-full">
        <div className="relative h-full bg-zinc-900">
          <header className="flex w-[454px] h-[58px] items-center justify-between px-6 py-3 absolute top-[30px] left-[493px] bg-zinc-800 rounded-[36px] overflow-hidden shadow-shadow">
            <Link href="/scan-results">
              <img
                className="relative w-10 h-10 mt-[-3.00px] mb-[-3.00px]"
                alt="Frame"
                src="/figmaAssets/frame.svg"
              />
            </Link>
            <nav className="flex w-[260.5px] items-center justify-end gap-4 relative">
              {pathname === "/" ? (
                <Button
                  variant="ghost"
                  className="!text-white relative w-fit mt-[-1.00px] font-p font-[number:var(--p-font-weight)] text-sky-500 text-[length:var(--p-font-size)] text-center tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] whitespace-nowrap [font-style:var(--p-font-style)] h-auto p-0 hover:bg-transparent"
                  data-testid="button-signup"
                >
                  Sign In
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="!text-white relative w-fit mt-[-1.00px] font-p font-[number:var(--p-font-weight)] text-sky-500 text-[length:var(--p-font-size)] text-center tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] whitespace-nowrap [font-style:var(--p-font-style)] h-auto p-0 hover:bg-transparent"
                    data-testid="button-dashboard"
                  >
                    Dashboard
                  </Button>
                </Link>
              )}
            </nav>
          </header>

          <main className="flex flex-col w-full h-full items-center justify-center gap-[60px]">
            <div
              className={`flex flex-col items-center justify-center gap-[60px] ${width}`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
