'use client';

import { motion } from 'framer-motion';
import type { Education as EducationType } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  return (
    <section id="education" className="px-4 py-14 bg-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Education" subtitle="Academic foundation in AI, mathematics, systems, and engineering" />
        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.article
              key={edu.institution}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 transition-all duration-200 hover:border-sky-300/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100">{edu.degree}</h3>
                  <p className="mt-1 text-base font-medium text-sky-300">{edu.institution}</p>
                  <p className="mt-2 text-sm text-zinc-500">{edu.location} • {edu.start} – {edu.end}</p>
                </div>
                {edu.gpa && (
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
              {edu.coursework.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Coursework</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span key={course} className="rounded-full bg-zinc-950 px-3 py-1.5 text-xs text-zinc-400">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
