import { useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: msg,
      });
      setReply(res.data.response);
    } catch (error) {
      setReply("❌ Backend not connected");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧪 Lab Assistant</h1>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>

      <h3>Response:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;