import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(express.json());

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/chat', async (req, res) => {
  const { messages, lang } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: {
        role: "system",
        parts: [{ text: `You are an expert AI assistant for "BharatVote Guide", an interactive platform to educate Indian citizens about the election process. 
          Provide accurate, unbiased, and helpful information about:
          - Voter registration and eligibility
          - Polling process (EVM, VVPAT, NOTA)
          - Election timeline and phases
          - Candidate requirements
          - Election Commission of India (ECI) rules
          - Indian democracy and Constitution
          
          Respond in the language the user speaks (${lang === 'en' ? 'English' : 'Hindi'}). 
          Keep responses concise, professional, and use markdown for formatting. 
          If you don't know something, suggest checking the official ECI website (eci.gov.in).` }]
      }
    });

    const lastMessage = messages[messages.length - 1].content;
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // Gemini SDK requires history to start with a 'user' role if present
    const validHistory = history.length > 0 && history[0].role === 'model' ? history.slice(1) : history;

    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with Gemini AI' });
  }
});

// Fallback to index.html for SPA routing
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
