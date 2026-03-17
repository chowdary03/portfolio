'use client';

import { useState, useEffect } from 'react';
import { getSkills, getProfile } from '@/lib/api';
import { BackToHome } from '@/components/BackToHome';
import { Skills } from '@/components/Skills';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import type { Profile, SkillsCategory } from '@/types';

export default function SkillsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<{ categories: SkillsCategory[] } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getSkills(), getProfile()])
      .then(([sk, p]) => {
        setSkills(sk as { categories: SkillsCategory[] });
        setProfile(p as Profile);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !skills) {
    return <ErrorState message={error || 'Failed to load'} />;
  }

  return (
    <>
      <div className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <BackToHome className="mb-8" />
          <Skills categories={skills.categories} />
        </div>
      </div>
      {profile && <Footer name={profile.name} />}
    </>
  );
}
