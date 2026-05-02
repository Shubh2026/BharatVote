<div align="center">
  <img src="public/india-map-bg.png" alt="BharatVote Guide Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  # 🇮🇳 BharatVote Guide
  
  **An interactive, bilingual (English/Hindi) election education platform empowering Indian citizens to understand and participate in the democratic process.**

  [![CI](https://github.com/Shubh2026/BharatVote/actions/workflows/ci.yml/badge.svg)](https://github.com/Shubh2026/BharatVote/actions/workflows/ci.yml)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
  [![Google Gemini](https://img.shields.io/badge/Google_Gemini-Grounding-8E75B2?style=for-the-badge&logo=google-bard)](https://deepmind.google/technologies/gemini/)
  [![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

  [View Live Demo](https://bharatvote-95155929385.asia-south1.run.app/) · [Report Bug](https://github.com/Shubh2026/BharatVote/issues) · [Request Feature](https://github.com/Shubh2026/BharatVote/issues)
</div>

<hr />

## ✨ Features

- 🌍 **Bilingual Support**: Fully accessible in both English and Hindi.
- 🎓 **Interactive Education Wizard**: Step-by-step guidance on how to register and vote.
- ⏳ **Election Timeline**: Visual timeline of important upcoming election dates.
- 🤖 **AI Assistant (Gemini)**: Grounded in **Google Search** for real-time, accurate answers to election queries.
- 📝 **Knowledge Quiz**: Test your understanding and save your progress to **Firestore**.
- 🗺️ **State-Specific Info**: Detailed guides with **Google Maps** integration for CEO office locations.
- 📈 **Performance Tracking**: Integrated with **Google Analytics 4** for user engagement insights.
- ⚡ **Lightning Fast UI**: Built with Vite and React 19 for snappy, instant page transitions.
- 🔒 **Secure by Design**: Server-side AI proxy keeps API keys off the client entirely.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Backend**: [Express 5](https://expressjs.com/) (Node.js) — secure AI proxy server
- **AI Integration**: [Google Gemini 1.5 Flash](https://ai.google.dev/) (with Google Search Grounding)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) (Anonymous score storage)
- **Hosting**: [Google Cloud Run](https://cloud.google.com/run) (Full-stack container)
- **Maps**: [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
- **Analytics**: [Google Analytics 4](https://analytics.google.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🔐 Security Architecture

BharatVote uses a **server-side proxy pattern** to ensure the Gemini API key is never exposed to the browser.

```
Browser (React)  →  POST /api/chat  →  Node.js/Express Proxy  →  Google Gemini API
                        ↑                        ↑
                   No API key               GEMINI_API_KEY
                   in client              (server env only)
```

**Key security layers:**

| Layer | Mechanism |
|---|---|
| API key isolation | `GEMINI_API_KEY` stored only as a Cloud Run environment secret — never bundled into the frontend |
| Rate limiting | `express-rate-limit`: 100 requests / 15 minutes per IP |
| Input validation | Server rejects empty prompts or prompts > 500 characters |
| HTTP headers | `helmet` middleware sets `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, and more |
| CORS | Restricted to the production Cloud Run domain only |
| Client sanitization | HTML stripped and input capped at 500 chars before being sent to the proxy |

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubh2026/BharatVote.git
   cd BharatVote
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Rename `.env.example` to `.env` and configure your API keys:
   ```env
   # Server-side only — never exposed to the browser
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the app!

> **Note:** In development, the Vite dev server proxies `/api/chat` requests to `http://localhost:8080`. Run `npm start` in a separate terminal to start the Express proxy server locally.

## 🐳 Docker & Cloud Run Deployment

This project includes a production-ready `Dockerfile` multi-stage build using Node and Nginx.

```bash
docker build -t bharat-vote-guide .
docker run -p 8080:8080 -e GEMINI_API_KEY=your_key bharat-vote-guide
```

## 📂 Project Structure

```text
├── public/                 # Static assets (images, icons)
├── src/
│   ├── assets/             # Bundled assets
│   ├── components/         # Reusable React components (UI, Chat, Quiz, Timeline)
│   │   └── index.ts        # Barrel exports for clean imports
│   ├── data/               # Static data files (Election, Quiz, State Data)
│   │   └── index.ts        # Barrel exports for clean imports
│   ├── lib/                # Utility functions and configurations
│   │   └── index.ts        # Barrel exports for clean imports
│   ├── App.tsx             # Main Application layout and routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind styles
├── server.js               # Express proxy server (keeps GEMINI_API_KEY server-side)
├── Dockerfile              # Docker configuration for production
├── nginx.conf              # Nginx configuration for routing
├── .env.example            # Example environment variables
├── package.json            # Project metadata and dependencies
└── vite.config.ts          # Vite + Vitest configuration
```

## 🤝 Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

**Shubh** - [@Shubh2026](https://github.com/Shubh2026)

Project Link: [https://github.com/Shubh2026/BharatVote](https://github.com/Shubh2026/BharatVote)

---
<div align="center">
  <i>Built with ❤️ for the world's largest democracy.</i>
</div>
