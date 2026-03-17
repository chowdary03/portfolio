'use client';

import { Nav } from '@/components/Nav';
import { ChatWidget } from '@/components/ChatWidget';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-zinc-950 text-zinc-200 pt-14">
        {children}
      </main>
      <ChatWidget />
    </>
  );
}
