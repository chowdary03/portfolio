'use client';

import { useState, useEffect } from 'react';
import { getAchievements, getProfile } from '@/lib/api';
import { BackToHome } from '@/components/BackToHome';
import { Achievements } from '@/components/Achievements';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import type { Profile, Achievement, Publication } from '@/types';

export default function AchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ achievements: Achievement[]; publication: Publication } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getAchievements(), getProfile()])
      .then(([ach, p]) => {
        setData(ach as { achievements: Achievement[]; publication: Publication });
        setProfile(p as Profile);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return <ErrorState message={error || 'Failed to load'} />;
  }

  return (
    <>
      <div className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <BackToHome className="mb-8" />
          <Achievements achievements={data.achievements} publication={data.publication} />
        </div>
      </div>
      {profile && <Footer name={profile.name} />}
    </>
  );
}
