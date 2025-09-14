'use client';
import React, { useEffect, useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ScanningProgressCard } from '@/components/sections/ScanningProgressCard';
import { QuestionnaireCard } from '@/components/sections/QuestionnaireCard';

export default function DashboardPage() {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(17);

  useEffect(() => {
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setScanComplete(true);
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 2);
      });
    }, 1000);

    // Simulate time countdown
    const timeInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timeInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Decrease every minute

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const progressSteps = [
    { id: 1, text: "Starting Technology Stack Detector", completed: true, active: false },
    { id: 2, text: "Launching parallel processing jobs...", completed: true, active: false },
    { id: 3, text: "Launching parallel processing jobs...", completed: true, active: false },
    { id: 4, text: "Analyzing security vulnerabilities...", completed: false, active: true },
  ];

  return (
    <PageLayout width="100%">
      {/* Two Card Layout */}
      <div className="flex justify-center items-start gap-8 w-full h-full">
        <ScanningProgressCard 
          timeRemaining={timeRemaining}
          progressSteps={progressSteps}
        />
      </div>
    </PageLayout>
  );
}