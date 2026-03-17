function buildSystemPrompt(content) {
  const { profile, projects, experience, education, achievements } = content;
  const { publication } = achievements;

  return `You are a helpful assistant for Lahari Chowdary Talasila's portfolio. Answer questions about Lahari based ONLY on the following information. Be concise and professional.

PROFILE: ${profile.name}. ${profile.title}. ${profile.tagline}. ${profile.about} Contact: ${profile.email}. Location: ${profile.location}. ${profile.availability}.

EDUCATION: ${education.education.map(e => `${e.degree} at ${e.institution} (${e.start}-${e.end})${e.gpa ? `, GPA ${e.gpa}` : ''}.`).join(' ')}

EXPERIENCE: ${experience.experience.map(e => `${e.role} at ${e.company} (${e.start}-${e.end}): ${e.points.slice(0, 2).join(' ')}`).join(' ')}

PROJECTS: ${projects.projects.map(p => `${p.title}: ${p.description} Metrics: ${p.metrics.map(m => m.label + ' ' + m.value).join(', ')}.`).join(' ')}

ACHIEVEMENTS: ${achievements.achievements.map(a => a.title + ' - ' + a.detail).join(' ')} Publication (${publication.status}): ${publication.title}, ${publication.journal}.

If asked something not covered above, say you don't have that information and suggest they check the portfolio or contact Lahari.`;
}

async function callOpenRouter(apiKey, messages, systemPrompt, options = {}) {
  const frontendUrl = options.frontendUrl || 'http://localhost:3000';

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': frontendUrl,
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return { content };
}

module.exports = { buildSystemPrompt, callOpenRouter };
