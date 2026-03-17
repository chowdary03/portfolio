'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getCertifications, getProfile } from '@/lib/api';
import { BackToHome } from '@/components/BackToHome';
import { Footer } from '@/components/Footer';
import { LoadingState, ErrorState } from '@/components/PageState';
import type { Certification, Profile } from '@/types';

export default function CertificationsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    Promise.all([getCertifications(), getProfile()])
      .then(([certData, p]) => {
        const res = certData as { certifications: Certification[] };
        setCertifications(res.certifications ?? []);
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
            Certifications
          </h1>
          <p className="mt-2 text-lg text-zinc-400">Training and credentials</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 overflow-hidden transition-all duration-200 hover:border-accent/40"
            >
              {(() => {
                const previewUrl = c.imageUrl ?? c.credentialUrl;
                const isPdf = !!previewUrl && previewUrl.toLowerCase().endsWith('.pdf');
                if (!previewUrl) return null;
                return (
                  <a
                    href={c.credentialUrl ?? previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-zinc-700/50 bg-zinc-900/50"
                  >
                    {isPdf ? (
                      <object
                        data={previewUrl}
                        type="application/pdf"
                        className="h-48 w-full"
                        aria-label={`${c.name} certificate preview`}
                      >
                        <div className="flex h-48 items-center justify-center text-sm text-zinc-400">
                          PDF preview unavailable. Click to open certificate.
                        </div>
                      </object>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt={`${c.name} certificate`}
                        className="h-48 w-full object-contain object-center"
                      />
                    )}
                  </a>
                );
              })()}
              <div className="p-6">
                <h2 className="font-semibold text-zinc-100">{c.name}</h2>
                <p className="mt-1 text-sm text-accent">{c.issuer}</p>
                <p className="mt-1 text-sm text-zinc-500">{c.period}</p>
                {(c.credentialUrl || (c.imageUrl && !c.credentialUrl)) && (
                  <a
                    href={c.credentialUrl ?? c.imageUrl ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    <ExternalLink size={16} />
                    {c.credentialUrl ? 'View credential / verify' : 'Open certificate'}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
        <BackToHome align="center" className="mt-12" />
      </div>
      {profile && <Footer name={profile.name} />}
    </div>
  );
}
