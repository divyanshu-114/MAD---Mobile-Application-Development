import { useState } from 'react'
import './App.css'

const API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'openai/gpt-oss-20b'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function askQuestion(question) {
    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          // No context window: only the current question is sent.
          messages: [{ role: 'user', content: question }],
        }),
      })
      if (!res.ok) throw new Error(`Groq API error (${res.status})`)
      const data = await res.json()
      const answer = data.choices[0].message.content
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Something went wrong: ${err.message}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const question = input.trim()
    if (!question || loading) return
    setInput('')
    askQuestion(question)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Chat</h1>
      </header>

      <main className="chat">
        {messages.length === 0 && <p className="empty">Ask me anything!</p>}
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="bubble">Thinking...</div>
          </div>
        )}
      </main>

      <form className="input-bar" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default App

// heheheh