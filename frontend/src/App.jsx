import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

async function api(path, opts={}) {
  const res = await fetch(`${API}${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export default function App() {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function load() {
    setBusy(true); setError('')
    try { setMessages(await api('/messages')) } catch(e){ setError(e.message) } finally { setBusy(false) }
  }
  useEffect(()=>{ load() }, [])

  async function submit(e){
    e.preventDefault(); setBusy(true); setError('')
    try {
      await api('/messages', { method: 'POST', body: JSON.stringify({ username: username.trim(), text: text.trim() }) })
      setText(''); await load()
    } catch(e){ setError(e.message) } finally { setBusy(false) }
  }

  async function save(id){
    setBusy(true); setError('')
    try {
      await api(`/messages/${id}`, { method:'PUT', body: JSON.stringify({ text: editText.trim() }) })
      setEditId(null); setEditText(''); await load()
    } catch(e){ setError(e.message) } finally { setBusy(false) }
  }

  return (
    <main>
      <header><h1>Shui Board (G)</h1></header>

      <section className="card stack">
        <h2>Nytt meddelande</h2>
        <form onSubmit={submit} className="stack">
          <div className="row">
            <input placeholder="Användarnamn" value={username} onChange={e=>setUsername(e.target.value)} />
            <input placeholder="Meddelande" value={text} onChange={e=>setText(e.target.value)} />
          </div>
          <div className="stack">
            <button disabled={!username.trim() || !text.trim() || busy}>Posta</button>
            {error && <span className="muted">Fel: {error}</span>}
          </div>
        </form>
      </section>

      <section className="card stack">
        <h2>Alla meddelanden</h2>
        <button onClick={load} disabled={busy}>Uppdatera</button>
        <div className="stack">
          {messages.map(m => (
            <article key={m.id} className="msg stack">
              <div className="muted">@{m.username} — {new Date(m.createdAt).toLocaleString()}</div>
              {editId === m.id ? (
                <>
                  <textarea value={editText} onChange={e=>setEditText(e.target.value)} />
                  <div>
                    <button onClick={()=>save(m.id)} disabled={!editText.trim() || busy}>Spara</button>
                    <button type="button" onClick={()=>{ setEditId(null); setEditText('') }}>Avbryt</button>
                  </div>
                </>
              ) : (<p>{m.text}</p>)}
              {editId !== m.id && (<button onClick={()=>{ setEditId(m.id); setEditText(m.text) }}>Redigera</button>)}
            </article>
          ))}
          {messages.length === 0 && <p className="muted">Inga meddelanden.</p>}
        </div>
      </section>
    </main>
  )
}
