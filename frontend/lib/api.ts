import { SITE } from './site-config';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data && data.error) || res.statusText);
  }
  return data as T;
}

export async function getHealth(): Promise<{ ok: boolean }> {
  const res = await fetch(`${SITE.apiUrl}/health`);
  return handleResponse(res);
}

export async function getProfile() {
  const res = await fetch(`${SITE.apiUrl}/api/profile`);
  return handleResponse(res);
}

export async function getProjects() {
  const res = await fetch(`${SITE.apiUrl}/api/projects`);
  return handleResponse(res);
}

export async function getExperience() {
  const res = await fetch(`${SITE.apiUrl}/api/experience`);
  return handleResponse(res);
}

export async function getEducation() {
  const res = await fetch(`${SITE.apiUrl}/api/education`);
  return handleResponse(res);
}

export async function getAchievements() {
  const res = await fetch(`${SITE.apiUrl}/api/achievements`);
  return handleResponse(res);
}

export async function getCertifications() {
  const res = await fetch(`${SITE.apiUrl}/api/certifications`);
  return handleResponse(res);
}

export async function getSkills() {
  const res = await fetch(`${SITE.apiUrl}/api/skills`);
  return handleResponse(res);
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: ChatMessage;
}

/** Send chat messages to the backend. System prompt is built server-side from backend data. */
export async function postChat(messages: ChatMessage[]): Promise<ChatResponse> {
  const res = await fetch(`${SITE.apiUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  return handleResponse(res);
}

export function isApiLikelyUnavailable(): boolean {
  if (typeof window === 'undefined') return false;
  const apiUrl = SITE.apiUrl;
  const isLocalApi = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1');
  const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocalApi && !isLocalHost;
}
