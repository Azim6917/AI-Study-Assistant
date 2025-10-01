import { useState } from "react";
import { generateQuiz } from "../api";

function QuizTab({ content }) {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const handleQuiz = async () => {
    setLoading(true);
    setQuiz("");
    try {
      const res = await generateQuiz(content, difficulty);
      setQuiz(res.data.quiz);
    } catch (err) {
      setQuiz("Error generating quiz.");
    }
    setLoading(false);
  };

  return (
    <div>
      <label>Difficulty: </label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleQuiz}>Generate Quiz</button>

      {loading && <p>Loading...</p>}
      {quiz && (
        <div>
          <h3>Quiz</h3>
          <pre>{quiz}</pre>
        </div>
      )}
    </div>
  );
}

export default QuizTab;