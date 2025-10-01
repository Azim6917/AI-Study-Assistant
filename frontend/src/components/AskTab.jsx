import { useState } from "react";
import { ask } from "../api";

function AskTab({ content }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await ask(content, question);
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error answering question.");
    }
    setLoading(false);
  };

  return (
    <div>
      <textarea
        rows="2"
        cols="50"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      <button onClick={handleAsk}>Ask</button>

      {loading && <p>Thinking...</p>}
      {answer && (
        <div>
          <h3>Answer</h3>
          <pre>{answer}</pre>
        </div>
      )}
    </div>
  );
}

export default AskTab;