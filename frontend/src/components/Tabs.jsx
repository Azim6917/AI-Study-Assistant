import { useState } from "react";
import SummarizeTab from "./SummarizeTab";
import QuizTab from "./QuizTab";
import ExplainTab from "./ExplainTab";
import AskTab from "./AskTab.jsx";

function Tabs({ content }) {
  const [tab, setTab] = useState("summarize");

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab("summarize")}>Summarize</button>
        <button onClick={() => setTab("quiz")}>Quiz</button>
        <button onClick={() => setTab("explain")}>Explain</button>
        <button onClick={() => setTab("ask")}>Ask</button>
      </div>

      {tab === "summarize" && <SummarizeTab content={content} />}
      {tab === "quiz" && <QuizTab content={content} />}
      {tab === "explain" && <ExplainTab content={content} />}
      {tab === "ask" && <AskTab content={content} />}
    </div>
  );
}

export default Tabs;
