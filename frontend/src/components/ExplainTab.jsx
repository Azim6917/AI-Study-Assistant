import { useState } from "react";
import { explain } from "../api";

function ExplainTab({ content }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [audience, setAudience] = useState("student");

  const handleExplain = async () => {
    setLoading(true);
    setExplanation("");
    try {
      const res = await explain(content, audience);
      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation("Error generating explanation.");
    }
    setLoading(false);
  };

  return (
    <div>
      <label>Explain for: </label>
      <select value={audience} onChange={(e) => setAudience(e.target.value)}>
        <option value="kid">Kid</option>
        <option value="student">Student</option>
        <option value="professional">Professional</option>
      </select>
      <button onClick={handleExplain}>Explain</button>

      {loading && <p>Loading...</p>}
      {explanation && (
        <div>
          <h3>Explanation</h3>
          <pre>{explanation}</pre>
        </div>
      )}
    </div>
  );
}

export default ExplainTab;