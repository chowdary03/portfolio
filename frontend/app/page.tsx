'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { HubCard } from '@/components/HubCard';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import { getProfile } from '@/lib/api';
import type { Profile } from '@/types';

const HUB_SECTIONS = [
  {
    title: 'Experience',
    href: '/experience',
    description: 'Work history, internships, and roles in AI and software engineering.',
    icon: 'briefcase',
  },
  {
    title: 'Projects',
    href: '/projects',
    description: 'AI systems, software tools, and applied ML projects.',
    icon: 'code',
  },
  {
    title: 'Skills',
    href: '/skills',
    description: 'Programming languages, ML frameworks, and technical tooling.',
    icon: 'layers',
  },
  {
    title: 'Education',
    href: '/education',
    description: 'Academic background at UB and IIT Palakkad.',
    icon: 'graduation',
  },
  {
    title: 'Certifications',
    href: '/certifications',
    description: 'Professional certifications and credentials.',
    icon: 'award',
  },
  {
    title: 'Achievements',
    href: '/achievements',
    description: 'Hackathons, competitions, and publications.',
    icon: 'trophy',
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile()
      .then((p) => setProfile(p as Profile))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState minHeightClassName="min-h-screen bg-zinc-950" />;
  }

  if (error || !profile) {
    return <ErrorState message={error || 'Failed to load portfolio. Is the backend running?'} minHeightClassName="min-h-screen bg-zinc-950" />;
  }

  return (
    <>
      <Hero profile={profile} />
      <section id="portfolio" className="px-4 py-12 bg-zinc-950">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-zinc-100">Portfolio</h2>
            <p className="mt-2 text-sm text-zinc-500">Explore each section in detail</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUB_SECTIONS.map((section, i) => (
              <HubCard key={section.href} {...section} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Contact profile={profile} />
      <Footer name={profile.name} />
    </>
  );
}
