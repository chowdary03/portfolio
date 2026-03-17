'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '@/types';
import { SectionHeading } from '@/components/SectionHeading';

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="px-4 py-14 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Certifications" subtitle="Credentials that reinforce software, cloud, and engineering foundations" />
        <div className="grid gap-5 md:grid-cols-2">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {(() => {
                const previewUrl = c.imageUrl ?? c.credentialUrl;
                const isPdf = !!previewUrl && previewUrl.toLowerCase().endsWith('.pdf');
                if (!previewUrl) {
                  return (
                    <div className="h-36 bg-[linear-gradient(135deg,#1f2937,#111827)] p-5">
                      <div className="flex h-full items-end rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.2),transparent_35%),rgba(255,255,255,0.03)] p-5">
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">Certified Learning</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <a
                    href={c.credentialUrl ?? previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-white/10 bg-zinc-900/50"
                  >
                    {isPdf ? (
                      <object
                        data={previewUrl}
                        type="application/pdf"
                        className="h-40 w-full"
                        aria-label={`${c.name} certificate preview`}
                      >
                        <div className="flex h-40 items-center justify-center text-sm text-zinc-400">
                          PDF preview unavailable. Click to open certificate.
                        </div>
                      </object>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt={`${c.name} certificate`}
                        className="h-40 w-full object-contain object-center"
                      />
                    )}
                  </a>
                );
              })()}
              <div className="p-5">
                <h3 className="font-semibold text-zinc-100">{c.name}</h3>
                <p className="mt-1 text-sm text-sky-300">{c.issuer}</p>
                <p className="mt-1 text-sm text-zinc-500">{c.period}</p>
                {c.summary && <p className="mt-3 text-sm leading-7 text-zinc-400">{c.summary}</p>}
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors duration-200 hover:text-teal-200"
                  >
                    <ExternalLink size={16} />
                    View Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
