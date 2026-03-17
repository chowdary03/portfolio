'use client';

import { motion } from 'framer-motion';
import type { Achievement, Publication } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';

interface AchievementsProps {
  achievements: Achievement[];
  publication: Publication;
}

export function Achievements({ achievements, publication }: AchievementsProps) {
  return (
    <section id="achievements" className="px-4 py-14 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Achievements & Publication" subtitle="Hackathons, research, and recognition" />
        <div className="space-y-6">
          <motion.div
            className="rounded-xl border border-accent-muted bg-accent-muted p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs font-mono uppercase text-accent">Publication ({publication.status})</span>
            <h3 className="mt-2 font-semibold text-zinc-100">{publication.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{publication.journal}</p>
          </motion.div>
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="font-semibold text-zinc-100">{a.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{a.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
