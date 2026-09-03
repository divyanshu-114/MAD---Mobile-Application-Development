# AI Chat

A simple AI chat application built with React + Vite, powered by the [Groq API](https://groq.com).
No context window — each question is sent on its own and answered.

## Setup

1. Create a `.env` file in this directory with your Groq API key:

   ```
   VITE_GROQ_API_KEY=your_key_here
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser.

## Desktop app (Electron)

With the dev server running, launch the desktop window:

```bash
npm run electron
```