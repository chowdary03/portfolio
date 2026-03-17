'use client';

import { motion } from 'framer-motion';
import type { Experience as ExperienceType } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="px-4 py-14 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Experience" subtitle="AI engineering, accessibility systems, automation, and production software delivery" />
        <div className="space-y-7">
          {experience.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              className="relative rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 pl-8 transition-colors duration-200 hover:border-sky-300/30"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-sky-300 via-cyan-400 to-teal-300" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100">{job.role}</h3>
                  <p className="mt-1 text-base font-medium text-sky-300">{job.company}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400">
                  {job.start} – {job.end}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{job.location}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-zinc-400">
                {job.points.map((point) => (
                  <li key={point.slice(0, 30)} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-xs text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
