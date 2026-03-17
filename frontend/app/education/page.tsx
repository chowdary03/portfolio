'use client';

import { useState, useEffect } from 'react';
import { getEducation, getProfile } from '@/lib/api';
import { BackToHome } from '@/components/BackToHome';
import { Education } from '@/components/Education';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import type { Profile, Education as EducationType } from '@/types';

export default function EducationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [education, setEducation] = useState<{ education: EducationType[] } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getEducation(), getProfile()])
      .then(([edu, p]) => {
        setEducation(edu as { education: EducationType[] });
        setProfile(p as Profile);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !education) {
    return <ErrorState message={error || 'Failed to load'} />;
  }

  return (
    <>
      <div className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <BackToHome className="mb-8" />
          <Education education={education.education} />
        </div>
      </div>
      {profile && <Footer name={profile.name} />}
    </>
  );
}
