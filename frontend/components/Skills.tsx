'use client';

import { motion } from 'framer-motion';
import type { SkillsCategory } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';
import { getSkillIcon, getSkillColor } from '@/lib/skill-icons';

interface SkillsProps {
  categories: SkillsCategory[];
}

const iconSize = 18;

export function Skills({ categories }: SkillsProps) {
  return (
    <section id="skills" className="px-4 py-14 bg-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Skills & Technologies" subtitle="AI frameworks, software stacks, databases, and infrastructure tools" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 transition-all duration-200 hover:scale-[1.02] hover:border-teal-300/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                {cat.name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const Icon = getSkillIcon(item);
                  const color = getSkillColor(item);
                  return (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:border-white/20"
                    >
                      <Icon size={iconSize} className="shrink-0" style={{ color }} />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
