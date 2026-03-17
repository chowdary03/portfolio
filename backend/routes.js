const chatService = require('./services/chat');

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

function validateChatBody(body) {
  const { messages } = body;
  if (!Array.isArray(messages)) {
    return { status: 400, body: { error: 'messages must be an array' } };
  }
  if (messages.length === 0) {
    return { status: 400, body: { error: 'messages array cannot be empty' } };
  }
  if (messages.length > MAX_MESSAGES) {
    return { status: 400, body: { error: `Too many messages (max ${MAX_MESSAGES})` } };
  }
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m || typeof m !== 'object') {
      return { status: 400, body: { error: `messages[${i}] must be an object` } };
    }
    if (typeof m.role !== 'string' || !['user', 'assistant', 'system'].includes(m.role)) {
      return { status: 400, body: { error: `messages[${i}].role must be "user", "assistant", or "system"` } };
    }
    if (typeof m.content !== 'string') {
      return { status: 400, body: { error: `messages[${i}].content must be a string` } };
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return { status: 400, body: { error: `messages[${i}].content must be at most ${MAX_MESSAGE_LENGTH} characters` } };
    }
  }
  return null;
}

function registerRoutes(app, content) {
  app.get('/api/profile', (req, res) => res.json(content.profile));
  app.get('/api/projects', (req, res) => res.json(content.projects));
  app.get('/api/experience', (req, res) => res.json(content.experience));
  app.get('/api/education', (req, res) => res.json(content.education));
  app.get('/api/achievements', (req, res) => res.json(content.achievements));
  app.get('/api/certifications', (req, res) => res.json(content.certifications));
  app.get('/api/skills', (req, res) => res.json(content.skills));

  app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Chat is not configured. Set OPENROUTER_API_KEY on the server.',
      });
    }

    const validationError = validateChatBody(req.body);
    if (validationError) {
      return res.status(validationError.status).json(validationError.body);
    }

    const { messages } = req.body;
    const systemPrompt = chatService.buildSystemPrompt(content);

    try {
      const result = await chatService.callOpenRouter(
        apiKey,
        messages,
        systemPrompt,
        { frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000' }
      );
      res.json({ message: { role: 'assistant', content: result.content } });
    } catch (err) {
      console.error('Chat error', err);
      if (err.message && err.message.startsWith('OpenRouter')) {
        return res.status(502).json({
          error: 'AI service temporarily unavailable. Try again later.',
        });
      }
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  });

  app.get('/health', (req, res) => res.json({ ok: true }));
}

module.exports = { registerRoutes };
