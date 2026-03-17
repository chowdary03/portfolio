'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { getProjects, getProfile } from '@/lib/api';
import { BackToHome } from '@/components/BackToHome';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import type { Project, Profile } from '@/types';

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getProjects(), getProfile()])
      .then(([projData, p]) => {
        const res = projData as { projects: Project[] };
        setProjects(res.projects ?? []);
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
            Featured Projects
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            AI/ML and full-stack work with measurable impact
          </p>
        </div>
        <div className="space-y-6">
          {projects.map((project, i) => {
            const isExpanded = expandedId === project.id;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 overflow-hidden transition-all duration-200 hover:border-accent/40"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-100">{project.title}</h2>
                      <p className="mt-1 text-sm text-zinc-500">{project.period}</p>
                    </div>
                    <span className="text-zinc-400">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-400 line-clamp-2">{project.description}</p>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-zinc-700/50"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-sm text-zinc-300 leading-relaxed">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.metrics.map((m) => (
                            <span
                              key={m.label}
                              className="rounded-md bg-zinc-700/50 px-2 py-1 text-xs font-medium text-zinc-300"
                            >
                              {m.label}: {m.value}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                            >
                              <Github size={18} />
                              Repository
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                            >
                              <ExternalLink size={18} />
                              Live demo
                            </a>
                          )}
                          {!project.githubUrl && !project.liveUrl && (
                            <span className="text-sm text-zinc-500">Links not available</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
        <BackToHome align="center" className="mt-12" />
      </div>
      {profile && <Footer name={profile.name} />}
    </div>
  );
}
