'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/site-config';

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setMobileOpen(false);
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '/#contact');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-zinc-100 hover:text-accent transition-colors">
          Lahari
        </Link>
        <ul className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                {link.label === 'Contact' ? (
                  <a
                    href="/#contact"
                    className={`text-sm transition-colors duration-200 underline-offset-4 hover:underline ${
                      isActive ? 'text-accent' : 'text-zinc-400 hover:text-accent'
                    }`}
                    onClick={handleContactClick}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-200 underline-offset-4 hover:underline ${
                      isActive ? 'text-accent' : 'text-zinc-400 hover:text-accent'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="md:hidden text-zinc-400 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-800 bg-zinc-900/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.label === 'Contact' ? (
                    <a
                      href="/#contact"
                      className="block py-2 text-zinc-300 hover:text-accent transition-colors"
                      onClick={handleContactClick}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 text-zinc-300 hover:text-accent transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
