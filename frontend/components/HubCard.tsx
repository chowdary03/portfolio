'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Code, Award, Layers, GraduationCap, Trophy } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  briefcase: Briefcase,
  code: Code,
  award: Award,
  layers: Layers,
  graduation: GraduationCap,
  trophy: Trophy,
};

interface HubCardProps {
  title: string;
  href: string;
  description: string;
  icon: string;
  index: number;
}

export function HubCard({ title, href, description, icon: iconKey, index }: HubCardProps) {
  const Icon = ICONS[iconKey] ?? Code;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={href}
        className="group block rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6 backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-zinc-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-600 bg-zinc-800/50 text-accent transition-colors group-hover:border-accent group-hover:bg-accent/10">
            <Icon size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{description}</p>
            <span className="mt-2 inline-block text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
