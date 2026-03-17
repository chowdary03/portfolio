'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getExperience, getProfile } from '@/lib/api';
import { BackToHome } from '@/components/BackToHome';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import type { Experience as ExperienceType, Profile } from '@/types';

export default function ExperiencePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getExperience(), getProfile()])
      .then(([expData, p]) => {
        const res = expData as { experience: ExperienceType[] };
        setExperience(res.experience ?? []);
        setProfile(p as Profile);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Experience
          </h1>
          <p className="mt-2 text-lg text-zinc-400">Roles and impact</p>
        </div>
        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-zinc-700" />
          <ul className="space-y-0">
            {experience.map((job, i) => {
              const id = `${job.company}-${job.role}-${i}`;
              const isExpanded = expandedId === id;
              return (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative pl-12 pb-10"
                >
                  <div className="absolute left-0 top-0 h-6 w-6 rounded-full border-2 border-accent bg-zinc-950" />
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : id)}
                    className="w-full rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6 text-left transition-all duration-200 hover:border-accent/40 hover:bg-zinc-800/50"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold text-zinc-100">{job.role}</h2>
                        <p className="text-accent font-medium">{job.company}</p>
                        <p className="text-sm text-zinc-500">
                          {job.start} – {job.end} · {job.location}
                        </p>
                      </div>
                      <span className="text-zinc-400">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2 border-t border-zinc-700/50 pt-4 text-sm text-zinc-400">
                            {job.points.map((point) => (
                              <li key={point.slice(0, 40)} className="flex gap-2">
                                <span className="text-accent/80">◦</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {job.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded bg-zinc-700/50 px-2 py-0.5 text-xs text-zinc-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
        <BackToHome align="center" className="mt-12" />
      </div>
      {profile && <Footer name={profile.name} />}
    </div>
  );
}
