'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="px-4 py-14 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Selected systems and products with measurable outcomes"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.24)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="h-44 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.35),transparent_35%),linear-gradient(135deg,#18181b,#111827)] p-6">
                <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">{project.period}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
                    {project.highlight && (
                      <p className="mt-2 max-w-lg text-sm text-zinc-300">{project.highlight}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-zinc-400">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <span
                      key={m.label}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300"
                    >
                      {m.label}: {m.value}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition-colors duration-200 hover:text-sky-200"
                    >
                      <ExternalLink size={16} />
                      Live Project
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors duration-200 hover:text-teal-200"
                    >
                      <Github size={16} />
                      Repository
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
