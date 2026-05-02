<div align="center">
  <img src="public/india-map-bg.png" alt="BharatVote Guide Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  # 🇮🇳 BharatVote Guide
  
  **An interactive, bilingual (English/Hindi) election education platform empowering Indian citizens to understand and participate in the democratic process.**

  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
  [![Google Gemini](https://img.shields.io/badge/Google_Gemini-Grounding-8E75B2?style=for-the-badge&logo=google-bard)](https://deepmind.google/technologies/gemini/)
  [![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

  [View Live Demo](https://bharatvote-95155929385.asia-south1.run.app/) · [Report Bug](https://github.com/Shubh2026/Vote-Path-/issues) · [Request Feature](https://github.com/Shubh2026/Vote-Path-/issues)
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

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Backend**: [Express 5](https://expressjs.com/) (Node.js)
- **AI Integration**: [Google Gemini 1.5 Flash](https://ai.google.dev/) (with Google Search Grounding)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) (Anonymous score storage)
- **Hosting**: [Google Cloud Run](https://cloud.google.com/run) (Backend) + [Firebase Hosting](https://firebase.google.com/docs/hosting) (Static Assets)
- **Maps**: [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
- **Analytics**: [Google Analytics 4](https://analytics.google.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubh2026/Vote-Path-.git
   cd Vote-Path-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Rename `.env.example` to `.env` and configure your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the app!

## 🐳 Docker & Cloud Run Deployment

This project includes a production-ready `Dockerfile` multi-stage build using Node and Nginx.

```bash
docker build -t bharat-vote-guide .
docker run -p 8080:8080 bharat-vote-guide
```

## 📂 Project Structure

```text
├── public/                 # Static assets (images, icons)
├── src/
│   ├── assets/             # Bundled assets
│   ├── components/         # Reusable React components (UI, Chat, Quiz, Timeline)
│   ├── data/               # Static data files (Election, Quiz, State Data)
│   ├── lib/                # Utility functions and configurations
│   ├── App.tsx             # Main Application layout and routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind styles
├── Dockerfile              # Docker configuration for production
├── nginx.conf              # Nginx configuration for routing
├── .env.example            # Example environment variables
├── package.json            # Project metadata and dependencies
└── vite.config.ts          # Vite configuration
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

Project Link: [https://github.com/Shubh2026/Vote-Path-](https://github.com/Shubh2026/Vote-Path-)

---
<div align="center">
  <i>Built with ❤️ for the world's largest democracy.</i>
</div>
