import React from "react";
import { Button } from "@/components/ui/button";

interface ProgressStep {
  id: number;
  text: string;
  completed: boolean;
  active: boolean;
}

interface ScanningProgressCardProps {
  timeRemaining: number;
  progressSteps: ProgressStep[];
}

export function ScanningProgressCard({
  timeRemaining,
  progressSteps,
}: ScanningProgressCardProps) {
  return (
    <div className="w-[800px] h-[500px] bg-zinc-800 rounded-[36px] p-6 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3 mb-4">
        <div className="w-[80px] h-[80px] rounded flex items-center justify-center">
          <svg
            width="86"
            height="78"
            viewBox="0 0 86 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M83.8337 39H67.5003L55.2503 75.75L30.7503 2.25L18.5003 39H2.16699"
              stroke="#0EA5E9"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white">Scanning...</h2>
      </div>

      <p className="text-zinc-400 text-xs mb-6 max-w-[300px] text-center">
        We are discovering your tech stack. It can take, depending on the size
        of your website.
      </p>

      <div className="text-center mb-8">
        <div className="text-xl font-semibold text-white mb-1">
          ~{timeRemaining} Minutes
        </div>
        <div className="text-xs text-zinc-400">Time Remaining</div>
      </div>

      <Button
        className=""
      >
        Remind me when done
      </Button>
    </div>
  );
}
