import { useState } from "react";
import { summarize } from "../api";

function SummarizeTab({ content }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState("short");

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");
    try {
      const res = await summarize(content, detail);
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("Error fetching summary.");
    }
    setLoading(false);
  };

  return (
    <div>
      <label>Summary Length: </label>
      <select value={detail} onChange={(e) => setDetail(e.target.value)}>
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="long">Long</option>
      </select>
      <button onClick={handleSummarize}>Summarize</button>

      {loading && <p>Loading...</p>}
      {summary && (
        <div>
          <h3>Summary</h3>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default SummarizeTab;