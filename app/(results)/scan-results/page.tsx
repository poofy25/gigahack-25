"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { CheckCircle, Circle, CircleCheck, Loader2 } from "lucide-react";
import VulnerabilityDetailsDialog from "@/components/sections/VulnerabilityDetailsDialog";
import { useScanResults } from "@/lib/hooks";
import { ActionItem, ScanResultsResponse } from "@/lib/api";

type VulnerabilityItem = ActionItem;

export default function ScanResultsPage() {
  const [selectedVuln, setSelectedVuln] = useState<VulnerabilityItem | null>(null);
  const [scanResults, setScanResults] = useState<ScanResultsResponse | null>(null);
  const { data: initialScanResults, isLoading, error } = useScanResults();

  // Initialize scanResults when data is loaded
  useEffect(() => {
    if (initialScanResults) {
      // Initialize completed field as false for all items from webhook
      const initializedResults = {
        ...initialScanResults,
        action_items: initialScanResults.action_items.map((item: ActionItem) => ({
          ...item,
          completed: false
        }))
      };
      setScanResults(initializedResults);
    }
  }, [initialScanResults]);

  if (isLoading) {
    return (
      <div className="bg-zinc-900 min-h-screen w-full flex items-center justify-center min-w-[800px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
          <p className="text-zinc-400">Loading scan results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-900 min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-400">Failed to load scan results. Please try again.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!scanResults) {
    return (
      <div className="bg-zinc-900 min-h-screen w-full flex items-center justify-center">
        <p className="text-zinc-400">No scan results available.</p>
      </div>
    );
  }

  // Calculate completion percentage combining webhook audit_percent and frontend completion
  const totalCompletedActionItems = scanResults.action_items.filter(item => item.completed).length;
  const frontendCompletionPercent = Math.round((totalCompletedActionItems / scanResults.action_items.length) * 100);
  
  // Start with webhook audit_percent as base score, then add progress from completed items
  // Each completed item improves the score by a percentage of remaining work
  const remainingWorkPercent = 100 - scanResults.audit_percent;
  const improvementFromCompletedItems = (frontendCompletionPercent / 100) * remainingWorkPercent;
  const actionItemsCompletionPercent = Math.min(100, Math.round(scanResults.audit_percent + improvementFromCompletedItems));

  // Determine color based on completion percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "#10b981"; // green-500
    if (percentage >= 60) return "#eab308"; // yellow-500
    if (percentage >= 40) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  const progressColor = getProgressColor(actionItemsCompletionPercent);

  // Sort all action items to show uncompleted first, then by priority
  const sortedActionItems = [...scanResults.action_items].sort((a, b) => {
    if (a.completed === b.completed) {
      // If both have same completion status, sort by priority
      const priorityOrder = { "Critic": 0, "Înalt": 1, "Mediu": 2, "Scăzut": 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    return a.completed ? 1 : -1; // Uncompleted items first
  });

  // Filter out completed technical compliances and sort remaining ones
  const sortedTechnicalCompliances = scanResults.action_items
    .filter(item => item.is_technical_complience && !item.completed)
    .sort((a, b) => {
      // Sort by priority: Critical > High > Medium > Low
      const priorityOrder = { "Critic": 0, "Înalt": 1, "Mediu": 2, "Scăzut": 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    });

  // Handler for marking items as resolved
  const handleMarkResolved = (item: VulnerabilityItem) => {
    if (!scanResults) return;

    // Find the original index of the item
    const itemIndex = scanResults.action_items.findIndex(ai => ai.title === item.title);
    
    if (itemIndex !== -1) {
      if (item.is_technical_complience) {
        // It's a technical compliance - remove from list
        setScanResults(prev => {
          if (!prev) return prev;
          const updatedActionItems = prev.action_items.filter((_, index) => index !== itemIndex);
          return { ...prev, action_items: updatedActionItems };
        });
      } else {
        // It's a survey action item - mark as completed
        setScanResults(prev => {
          if (!prev) return prev;
          const updatedActionItems = [...prev.action_items];
          updatedActionItems[itemIndex] = { ...updatedActionItems[itemIndex], completed: true };
          return { ...prev, action_items: updatedActionItems };
        });
      }
    }
    
    // Close the dialog
    setSelectedVuln(null);
  };

  return (
    <div className="bg-zinc-900 min-h-screen w-full min-w-[800px]">
      {/* Main Content */}
      <main className="mt-4 pb-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Audit Progress */}
          <Card className="bg-zinc-800">
            <CardHeader>
              <CardTitle>Audit Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-[210px] h-[110px] mx-auto">
                <svg className="w-[210px] h-[110px]" viewBox="0 0 120 70">
                  <path
                    d="M 10 60 A 50 50 0 0 1 110 60"
                    stroke="#3f3f46"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 60 A 50 50 0 0 1 110 60"
                    stroke={progressColor}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.PI * 50}`}
                    strokeDashoffset={`${Math.PI * 50 * (1 - actionItemsCompletionPercent / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-cente mt-12">
                  <span
                    className="text-2xl font-bold text-white"
                    data-testid="security-score"
                  >
                    {actionItemsCompletionPercent}%
                  </span>
                  <p className="text-sm text-zinc-400">Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Findings */}
          <Card className="bg-zinc-800 border-zinc-700 col-span-2">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex flex-col items-start justify-start gap-1">
                <CardTitle>Your Action Items</CardTitle>
                <p className="text-zinc-400 text-xs">{actionItemsCompletionPercent}% Complete</p>
              </div>
              <Button className="!mt-0">View All</Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-start">
              {sortedActionItems.slice(0, 5).map((item, index) => (
                <div 
                  key={`action-${index}`}
                  className="flex items-center gap-2 cursor-pointer hover:bg-zinc-700/30 rounded px-2 py-1 transition-colors w-full"
                  style={{ opacity: item.completed ? 0.5 : 1 }}
                  onClick={() => setSelectedVuln(item)}
                >
                  {item.completed ? (
                    <CircleCheck className="w-5 h-5 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-white" />
                  )}
                  <span className="text-sm text-zinc-300">{item.title}</span>
                  {item.is_technical_complience && (
                    <span className="text-xs text-zinc-500 bg-zinc-700/50 px-2 py-0.5 rounded">
                      Technical
                    </span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Technical Compliance */}
          <div className="col-span-3">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle>
                Technical Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                        <TableHead className="text-zinc-400 font-medium pl-6">Priority</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Location</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Issue</TableHead>
                        <TableHead className="text-zinc-400 font-medium pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedTechnicalCompliances.map((item, index) => (
                        <TableRow
                          key={`tech-${index}`}
                          className="border-zinc-700/50 hover:bg-zinc-800/30 transition-colors"
                          data-testid={`vulnerability-row-${index}`}
                        >
                          <TableCell className="pl-6">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                item.priority === "Critic"
                                  ? "bg-red-600/20 text-red-300 border border-red-400/30"
                                  : item.priority === "Înalt"
                                  ? "bg-red-400/15 text-red-400 border border-red-400/25"
                                  : item.priority === "Mediu"
                                  ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/25"
                                  : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                              }`}
                              data-testid={`priority-${index}`}
                            >
                              {item.priority}
                            </span>
                          </TableCell>
                          <TableCell>
                            <code
                              className="text-xs text-zinc-300 bg-zinc-700/50 px-2 py-1 rounded font-mono"
                              data-testid={`location-${index}`}
                            >
                              {item.location}
                            </code>
                          </TableCell>
                          <TableCell>
                            <h3
                              className="font-medium text-white text-sm"
                              data-testid={`issue-title-${index}`}
                            >
                              {item.title}
                            </h3>
                          </TableCell>
                          <TableCell className="pr-6">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white h-8 px-3 text-xs"
                              data-testid={`view-more-${index}`}
                              onClick={() => setSelectedVuln(item)}
                            >
                              View More
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Vulnerability Details Dialog */}
      <VulnerabilityDetailsDialog
        selectedVuln={selectedVuln}
        onClose={() => setSelectedVuln(null)}
        onMarkResolved={handleMarkResolved}
      />
    </div>
  );
}
