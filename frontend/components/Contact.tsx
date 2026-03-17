'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import type { Profile } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';

interface ContactProps {
  profile: Profile;
}

const iconSize = 24;

export function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="section-anchor-offset px-4 py-12 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading title="Contact" subtitle="Reach out for collaboration, ideas, or project conversations." />
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-sky-300 transition-colors duration-200 hover:border-sky-300/30"
              aria-label={`Email: ${profile.email}`}
            >
              <Mail size={iconSize} strokeWidth={1.5} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-teal-300 transition-colors duration-200 hover:border-teal-300/30"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={iconSize} strokeWidth={1.5} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-zinc-100 transition-colors duration-200 hover:border-zinc-300/40"
              aria-label="GitHub profile"
            >
              <Github size={iconSize} strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
