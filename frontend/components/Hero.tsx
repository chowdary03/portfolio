'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const statsData = profile.stats as {
    yearsExperience: string;
    projectsHighlighted: string | number;
    publications?: string;
    accuracyHighlight?: string;
    hackathonPlace: string;
  };
  const publicationValue = statsData.publications || '1';
  const stats = [
    { value: statsData.yearsExperience, label: 'Years experience' },
    { value: statsData.projectsHighlighted.toString(), label: 'Projects' },
    { value: publicationValue, label: 'Publications' },
    { value: statsData.hackathonPlace, label: 'Hackathon' },
  ];
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-10 pt-16 sm:pb-12 sm:pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#60a5fa14,transparent_28%),radial-gradient(circle_at_80%_20%,#14b8a61f,transparent_22%),linear-gradient(180deg,#09090b_0%,#111827_55%,#09090b_100%)]" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80')",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(96,165,250,0.04)_25%,transparent_50%,rgba(20,184,166,0.04)_75%,transparent_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.95fr] lg:items-center">
        <div>
          <motion.p
            className="mb-3 text-base font-medium tracking-wide text-sky-300/90"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Hi, I&apos;m Lahari
          </motion.p>
          <motion.h1
            className="max-w-4xl text-3xl font-semibold tracking-[-0.03em] text-zinc-100 sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {profile.headline}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {profile.intro ?? profile.about}
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-200">
              {profile.title}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-teal-300" />
              {profile.location}
            </span>
          </motion.div>
          <motion.div
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
              >
                <span className="block text-2xl font-semibold text-zinc-100">{stat.value}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[22rem]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" aria-hidden />
          <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-teal-400/20 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="relative h-[24rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-zinc-950/85">
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profileImage}
                  alt={`${profile.name} profile`}
                  className="h-full w-full object-cover object-[center_8%]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,#60a5fa33,#18181b_65%)] p-6 text-center">
                  <p className="text-sm leading-6 text-zinc-300">
                    Add your photo by setting <span className="text-zinc-100">profileImage</span> in backend/data/profile.json
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
