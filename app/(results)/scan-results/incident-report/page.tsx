"use client";
import React, { useEffect, useState } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

export default function IncidentReportPage() {
  const [chatInitialized, setChatInitialized] = useState(false);

  useEffect(() => {
    // Initialize n8n chat when component mounts
    const initializeChat = () => {
      try {
        createChat({
          webhookUrl: 'https://cloneteamjob.uk/webhook/205f2710-0578-4919-aa63-8b4f887a6372/chat',
          target: '#n8n-chat-container',
          mode: 'fullscreen',
          loadPreviousSession: true,
          i18n: {
            en: {
              title: 'AI Assistant',
              subtitle: 'How can I help you with your incident report?',
              footer: 'Powered by n8n',
              getStarted: 'Get Started',
              inputPlaceholder: 'Type your message...',
              closeButtonTooltip: 'Close chat'
            }
          }
        });
        
        setChatInitialized(true);
      } catch (error) {
        console.error('Failed to initialize n8n chat:', error);
      }
    };

    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(initializeChat, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Custom CSS for n8n chat to match our design system */}
      <style jsx global>{`
        :root {
          --chat--color-primary: #0ea5e9; /* sky-500 */
          --chat--color-primary-shade-50: #0284c7; /* sky-600 */
          --chat--color-primary-shade-100: #0369a1; /* sky-700 */
          --chat--color-secondary: #22c55e; /* green-500 */
          --chat--color-secondary-shade-50: #16a34a; /* green-600 */
          --chat--color-white: #ffffff;
          --chat--color-light: #f4f4f5; /* zinc-100 */
          --chat--color-light-shade-50: #e4e4e7; /* zinc-200 */
          --chat--color-light-shade-100: #a1a1aa; /* zinc-400 */
          --chat--color-medium: #71717a; /* zinc-500 */
          --chat--color-dark: #18181b; /* zinc-900 */
          --chat--color-disabled: #52525b; /* zinc-600 */
          --chat--color-typing: #3f3f46; /* zinc-700 */
          --chat--input--text-color: #27272a; /* zinc-100 */

          --chat--spacing: 1rem;
          --chat--border-radius: 0.5rem; /* Match your radius */
          --chat--transition-duration: 0.15s;

          --chat--window--width: 100%;
          --chat--window--height: 100%;

          --chat--header-height: auto;
          --chat--header--padding: var(--chat--spacing);
          --chat--header--background: #27272a; /* zinc-800 */
          --chat--header--color: #f4f4f5; /* zinc-100 */
          --chat--header--border-top: none;
          --chat--header--border-bottom: 1px solid #3f3f46; /* zinc-700 */
          --chat--heading--font-size: 1.5rem;
          --chat--subtitle--font-size: 0.875rem;
          --chat--subtitle--line-height: 1.5;

          --chat--textarea--height: 50px;
          --chat--textarea--background: #3f3f46; /* zinc-700 */
          --chat--textarea--color: #f4f4f5; /* zinc-100 */
          --chat--textarea--border: 1px solid #52525b; /* zinc-600 */

          --chat--message--font-size: 0.875rem;
          --chat--message--padding: var(--chat--spacing);
          --chat--message--border-radius: var(--chat--border-radius);
          --chat--message-line-height: 1.5;
          --chat--message--bot--background: #3f3f46; /* zinc-700 */
          --chat--message--bot--color: #f4f4f5; /* zinc-100 */
          --chat--message--bot--border: none;
          --chat--message--user--background: #0ea5e9; /* sky-500 */
          --chat--message--user--color: #ffffff;
          --chat--message--user--border: none;
          --chat--message--pre--background: rgba(0, 0, 0, 0.2);

          --chat--toggle--background: #0ea5e9; /* sky-500 */
          --chat--toggle--hover--background: #0284c7; /* sky-600 */
          --chat--toggle--active--background: #0369a1; /* sky-700 */
          --chat--toggle--color: #ffffff;
          --chat--toggle--size: 64px;
        }
      `}</style>
      
      <div className="bg-zinc-900 min-h-screen w-[800px]">
        
        {/* Chat Container */}
        <div 
          id="n8n-chat-container" 
          className="w-full pt-[16px] h-[calc(100vh-120px)]"
          style={{ width: '100%', height: 'calc(100vh - 120px)' }}
        />
      </div>
    </>
  );
}
