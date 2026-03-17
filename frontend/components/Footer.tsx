'use client';

export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-6">
      <div className="mx-auto max-w-6xl text-center text-sm text-zinc-500">
        © {year} {name}. All rights reserved.
      </div>
    </footer>
  );
}
