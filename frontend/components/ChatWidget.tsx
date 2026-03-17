'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postChat, getHealth, isApiLikelyUnavailable, type ChatMessage } from '@/lib/api';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatAvailable, setChatAvailable] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!open || chatAvailable !== null) return;
    if (isApiLikelyUnavailable()) {
      setChatAvailable(false);
      return;
    }
    getHealth()
      .then(() => setChatAvailable(true))
      .catch(() => setChatAvailable(false));
  }, [open, chatAvailable]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || chatAvailable !== true) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    setError(null);
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    try {
      const data = await postChat(newMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message?.content ?? '' }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      const networkError = message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('network');
      setError(networkError ? 'Could not reach the server. Is the backend running?' : message);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const unavailable = chatAvailable === false;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
              <span className="font-medium text-zinc-100">Ask me about Lahari</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-200"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {unavailable && (
                <p className="text-sm text-sky-400">
                  Chat is unavailable. The backend may be down or not configured. Try again later or contact me directly.
                </p>
              )}
              {!unavailable && messages.length === 0 && chatAvailable === true && (
                <p className="text-sm text-zinc-500">
                  Ask anything about my experience, projects, or skills.
                </p>
              )}
              {!unavailable && chatAvailable === null && messages.length === 0 && (
                <p className="text-sm text-zinc-500">Checking connection...</p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <span
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      m.role === 'user'
                        ? 'bg-accent/20 text-zinc-100'
                        : 'bg-zinc-700/50 text-zinc-200'
                    }`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <span className="rounded-lg bg-zinc-700/50 px-3 py-2 text-sm text-zinc-400">
                    Thinking...
                  </span>
                </div>
              )}
              {error && (
                <p className="text-xs text-sky-400">{error}</p>
              )}
              <div ref={bottomRef} />
            </div>
            <form
              className="flex border-t border-zinc-700 p-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={unavailable ? 'Chat unavailable' : 'Type a message...'}
                className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none disabled:opacity-50"
                disabled={loading || unavailable}
              />
              <button
                type="submit"
                className="ml-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-accent-hover disabled:opacity-50 transition-colors duration-200"
                disabled={loading || !input.trim() || unavailable}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-zinc-900 shadow-lg hover:bg-accent-hover transition-colors duration-200"
        aria-label="Open chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">💬</span>
      </motion.button>
    </>
  );
}
