import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    try {
      const text = await file.text();
      setMsg(text.slice(0, 10000));
    } catch (err) {
      setError("Failed to read file");
    }
  };

  const sendMessage = async () => {
    if (!msg.trim()) {
      setError("Please enter a question or upload a report.");
      return;
    }
    setLoading(true);
    setError("");
    setReply("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message: msg });
      setReply(res.data.response || JSON.stringify(res.data));
    } catch (err) {
      setError("Backend not connected");
    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    if (!reply) return;
    try {
      await navigator.clipboard.writeText(reply);
    } catch {}
  };

  return (
    <div className="app-container">
      <header>
        <h1>Lab Report Analyzer</h1>
        <p className="subtitle">Ask questions about your lab report or upload a file to analyze.</p>
      </header>

      <main>
        <div className="controls">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Paste report text or type a question..."
            rows={8}
          />

          <div className="row">
            <label className="file-input">
              <input type="file" accept=".txt,.md,.pdf" onChange={handleFile} />
              <span>{fileName ? `Uploaded: ${fileName}` : "Upload report"}</span>
            </label>

            <button className="primary" onClick={sendMessage} disabled={loading}>
              {loading ? <span className="spinner" /> : "Analyze"}
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </div>

        <section className="response">
          <h3>Response</h3>
          <div className="response-card">
            {reply ? (
              <>
                <pre>{reply}</pre>
                <div className="response-actions">
                  <button onClick={copyReply}>Copy</button>
                </div>
              </>
            ) : (
              <div className="placeholder">No response yet</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;