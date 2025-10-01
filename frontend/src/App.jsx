// // import { useState } from "react";
// // import axios from "axios";
// // import { FiUpload, FiDownload, FiCopy } from "react-icons/fi";

// // const API = "http://127.0.0.1:8000";

// // function App() {
// //   const [activeTab, setActiveTab] = useState("summarize");
// //   const [inputMode, setInputMode] = useState("upload"); // upload | write
// //   const [file, setFile] = useState(null);
// //   const [manualText, setManualText] = useState("");
// //   const [pdfText, setPdfText] = useState(""); // extracted text from PDF
// //   const [result, setResult] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [question, setQuestion] = useState(""); // for Ask tab

// //   // File upload
// //   const handleUpload = async () => {
// //     if (!file) return;
// //     const formData = new FormData();
// //     formData.append("file", file);
// //     try {
// //       const res = await axios.post(`${API}/upload`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       setPdfText(res.data.content); // store but don't display
// //       alert("✅ File uploaded successfully!");
// //     } catch (err) {
// //       alert("❌ Upload failed!");
// //     }
// //   };

// //   // API call
// //   const handleAction = async (endpoint, option = "short") => {
// //     const text =
// //       inputMode === "upload"
// //         ? pdfText
// //         : manualText;

// //     if (!text) {
// //       alert("Please upload or paste text first.");
// //       return;
// //     }

// //     let payload = { text, option };
// //     if (endpoint === "ask") {
// //       if (!question) {
// //         alert("Please enter your question.");
// //         return;
// //       }
// //       payload.option = question; // user question
// //     }

// //     setLoading(true);
// //     setResult("");
// //     try {
// //       const res = await axios.post(`${API}/${endpoint}`, payload);
// //       setResult(
// //         res.data.summary ||
// //         res.data.quiz ||
// //         res.data.explanation ||
// //         res.data.answer
// //       );
// //     } catch (err) {
// //       console.error(err);
// //       setResult("⚠️ Error occurred. Check server logs.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const tabs = [
// //     { id: "summarize", label: "📝 Summarize" },
// //     { id: "quiz", label: "🎯 Quiz" },
// //     { id: "explain", label: "📖 Explain" },
// //     { id: "ask", label: "💬 Ask" },
// //   ];

// //   // Helper to render parsed quiz
// //   const renderQuiz = () => {
// //     if (!result) return null;

// //     const questions = result.split(/\n(?=\d+\.)/); // split by numbered questions
// //     return (
// //       <div className="space-y-4">
// //         {questions.map((q, idx) => {
// //           if (!q.trim()) return null;
// //           const [questionLine, ...options] = q.split("\n").filter(Boolean);
// //           const answerLine = options.find((o) =>
// //             o.toLowerCase().includes("answer:")
// //           );
// //           const choices = options.filter(
// //             (o) => !o.toLowerCase().includes("answer:")
// //           );

// //           return (
// //             <div
// //               key={idx}
// //               className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm"
// //             >
// //               <p className="font-semibold mb-2">{questionLine}</p>
// //               {choices.map((opt, i) => (
// //                 <label key={i} className="block">
// //                   <input
// //                     type="radio"
// //                     name={`q-${idx}`}
// //                     className="mr-2"
// //                   />
// //                   {opt}
// //                 </label>
// //               ))}
// //               {answerLine && (
// //                 <details className="mt-2">
// //                   <summary className="cursor-pointer text-purple-600">
// //                     Show Answer
// //                   </summary>
// //                   <p className="text-green-600">{answerLine}</p>
// //                 </details>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col items-center p-6">
// //       {/* Header */}
// //       <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
// //         🚀 AI Study Assistant
// //       </h1>

// //       {/* Input Mode Toggle */}
// //       <div className="flex gap-4 mb-6">
// //         <button
// //           onClick={() => setInputMode("upload")}
// //           className={`px-4 py-2 rounded-lg ${
// //             inputMode === "upload"
// //               ? "bg-purple-500 text-white"
// //               : "bg-white border"
// //           }`}
// //         >
// //           Upload
// //         </button>
// //         <button
// //           onClick={() => setInputMode("write")}
// //           className={`px-4 py-2 rounded-lg ${
// //             inputMode === "write"
// //               ? "bg-purple-500 text-white"
// //               : "bg-white border"
// //           }`}
// //         >
// //           Write
// //         </button>
// //       </div>

// //       {/* Upload / Write Section */}
// //       {inputMode === "upload" ? (
// //         <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full max-w-4xl mb-8 border border-purple-200">
// //           <div className="flex items-center gap-3">
// //             <input
// //               type="file"
// //               accept=".pdf,.txt"
// //               onChange={(e) => setFile(e.target.files[0])}
// //               className="flex-1 border border-purple-300 p-2 rounded-lg"
// //             />
// //             <button
// //               onClick={handleUpload}
// //               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
// //             >
// //               <FiUpload /> Upload
// //             </button>
// //           </div>
// //         </div>
// //       ) : (
// //         <textarea
// //           rows="5"
// //           value={manualText}
// //           onChange={(e) => setManualText(e.target.value)}
// //           placeholder="✍️ Paste or write your study material here..."
// //           className="w-full max-w-4xl p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-8 bg-white shadow"
// //         />
// //       )}

// //       {/* Tabs */}
// //       <div className="flex justify-center gap-4 mb-6 flex-wrap">
// //         {tabs.map((tab) => (
// //           <button
// //             key={tab.id}
// //             onClick={() => setActiveTab(tab.id)}
// //             className={`px-6 py-2 rounded-full font-semibold transition-all ${
// //               activeTab === tab.id
// //                 ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
// //                 : "bg-white text-gray-600 border border-gray-200 hover:bg-purple-100"
// //             }`}
// //           >
// //             {tab.label}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Result Card */}
// //       <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-pink-200">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
// //           <button
// //             onClick={() => handleAction(activeTab, "short")}
// //             className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform shadow-md"
// //             disabled={loading}
// //           >
// //             {loading ? "⏳ Processing..." : "▶ Run"}
// //           </button>
// //         </div>

// //         {/* Special Ask input */}
// //         {activeTab === "ask" && (
// //           <input
// //             type="text"
// //             value={question}
// //             onChange={(e) => setQuestion(e.target.value)}
// //             placeholder="💬 Type your question about the uploaded text..."
// //             className="w-full p-2 border border-purple-300 rounded-lg mb-4"
// //           />
// //         )}

// //         {result &&
// //           (activeTab === "quiz" ? (
// //             renderQuiz()
// //           ) : (
// //             <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap relative border border-gray-200">
// //               {result}
// //               {/* Copy & Download */}
// //               <div className="absolute top-2 right-2 flex gap-2">
// //                 <button
// //                   onClick={() => navigator.clipboard.writeText(result)}
// //                   className="bg-purple-100 p-2 rounded-full hover:bg-purple-200"
// //                 >
// //                   <FiCopy />
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     const blob = new Blob([result], { type: "text/plain" });
// //                     const link = document.createElement("a");
// //                     link.href = URL.createObjectURL(blob);
// //                     link.download = `${activeTab}.txt`;
// //                     link.click();
// //                   }}
// //                   className="bg-yellow-100 p-2 rounded-full hover:bg-yellow-200"
// //                 >
// //                   <FiDownload />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// // -------------------------------------

// import { useState } from "react";
// import axios from "axios";
// import { FiUpload, FiDownload, FiCopy } from "react-icons/fi";

// const API = "http://127.0.0.1:8000";

// function App() {
//   const [activeTab, setActiveTab] = useState("summarize");
//   const [inputMode, setInputMode] = useState("upload"); // upload | write
//   const [file, setFile] = useState(null);
//   const [manualText, setManualText] = useState("");
//   const [pdfText, setPdfText] = useState("");
//   const [results, setResults] = useState({}); // store results per tab
//   const [loading, setLoading] = useState(false);
//   const [question, setQuestion] = useState("");
//   const [quizAnswers, setQuizAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   // File upload
//   const handleUpload = async () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const res = await axios.post(`${API}/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setPdfText(res.data.content);
//       alert("✅ File uploaded successfully!");
//     } catch (err) {
//       alert("❌ Upload failed!");
//     }
//   };

//   // API call
//   // const handleAction = async (endpoint) => {
//   //   const text = inputMode === "upload" ? pdfText : manualText;
//   //   if (!text) {
//   //     alert("Please upload or paste text first.");
//   //     return;
//   //   }

//   //   let payload = { text };
//   //   if (endpoint === "ask") {
//   //     if (!question) {
//   //       alert("Please enter your question.");
//   //       return;
//   //     }
//   //     payload.option = question;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const res = await axios.post(`${API}/${endpoint}`, payload);
//   //     setResults((prev) => ({
//   //       ...prev,
//   //       [endpoint]:
//   //         res.data.summary ||
//   //         res.data.quiz ||
//   //         res.data.explanation ||
//   //         res.data.answer,
//   //     }));
//   //     setSubmitted(false);
//   //     setQuizAnswers({});
//   //   } catch (err) {
//   //     console.error(err);
//   //     setResults((prev) => ({
//   //       ...prev,
//   //       [endpoint]: "⚠️ Error occurred. Check server logs.",
//   //     }));
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleAction = async (endpoint) => {
//     const text = inputMode === "upload" ? pdfText : manualText;
//     if (!text) {
//       alert("Please upload or paste text first.");
//       return;
//     }

//     let payload = { text };
//     if (endpoint === "ask") {
//       if (!question) {
//         alert("Please enter your question.");
//         return;
//       }
//       payload.option = question;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/${endpoint}`, payload);

//       let data;
//       if (endpoint === "quiz") {
//         // Expecting quiz JSON from backend
//         try {
//           data = JSON.parse(res.data.quiz);
//         } catch (err) {
//           console.error("Quiz parse failed:", err);
//           data = [];
//         }
//       } else {
//         data =
//           res.data.summary ||
//           res.data.explanation ||
//           res.data.answer ||
//           "⚠️ No response.";
//       }

//       setResults((prev) => ({
//         ...prev,
//         [endpoint]: data,
//       }));
//       setSubmitted(false);
//       setQuizAnswers({});
//     } catch (err) {
//       console.error(err);
//       setResults((prev) => ({
//         ...prev,
//         [endpoint]: "⚠️ Error occurred. Check server logs.",
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const tabs = [
//     { id: "summarize", label: "📝 Summarize" },
//     { id: "quiz", label: "🎯 Quiz" },
//     { id: "explain", label: "📖 Explain" },
//     { id: "ask", label: "💬 Ask" },
//   ];

//   // // Parse quiz into structured format
//   // const parseQuiz = (raw) => {
//   //   const blocks = raw.split(/\n(?=\d+\.)/); // split numbered questions
//   //   return blocks
//   //     .map((block) => {
//   //       const lines = block.split("\n").filter(Boolean);
//   //       if (lines.length < 2) return null;
//   //       const question = lines[0].replace(/^\d+\.\s*/, "").trim();
//   //       const options = lines
//   //         .slice(1)
//   //         .filter((l) => /^[A-D]/.test(l.trim()))
//   //         .map((opt) => opt.trim());
//   //       const answer = lines.find((l) =>
//   //         l.toLowerCase().includes("answer:")
//   //       );
//   //       return { question, options, answer };
//   //     })
//   //     .filter(Boolean);
//   // };

//   // // Render quiz with interactivity
//   // const renderQuiz = () => {
//   //   if (!results.quiz) return null;

//   //   const quizData = parseQuiz(results.quiz);
//   //   if (!quizData.length) return <p>No valid quiz generated.</p>;

//   //   return (
//   //     <div className="space-y-6">
//   //       {quizData.map((q, idx) => (
//   //         <div
//   //           key={idx}
//   //           className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm"
//   //         >
//   //           <p className="font-semibold mb-2">{q.question}</p>
//   //           {q.options.map((opt, i) => {
//   //             const selected = quizAnswers[idx] === opt;
//   //             const correct = q.answer?.toLowerCase().includes(opt.toLowerCase());

//   //             return (
//   //               <label
//   //                 key={i}
//   //                 className={`block p-2 rounded ${
//   //                   submitted
//   //                     ? correct
//   //                       ? "bg-green-100 border border-green-400"
//   //                       : selected
//   //                       ? "bg-red-100 border border-red-400"
//   //                       : ""
//   //                     : ""
//   //                 }`}
//   //               >
//   //                 <input
//   //                   type="radio"
//   //                   name={`q-${idx}`}
//   //                   checked={selected}
//   //                   onChange={() =>
//   //                     setQuizAnswers((prev) => ({
//   //                       ...prev,
//   //                       [idx]: opt,
//   //                     }))
//   //                   }
//   //                   className="mr-2"
//   //                 />
//   //                 {opt}
//   //               </label>
//   //             );
//   //           })}
//   //         </div>
//   //       ))}
//   //       {!submitted ? (
//   //         <button
//   //           onClick={() => setSubmitted(true)}
//   //           className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
//   //         >
//   //           Submit Quiz
//   //         </button>
//   //       ) : (
//   //         <p className="text-green-600 font-semibold">✅ Quiz Submitted!</p>
//   //       )}
//   //     </div>
//   // );

//   // };

//   // -----
//   const renderQuiz = () => {
//     const quizData = results.quiz;
//     if (!quizData || !quizData.length) return <p>No quiz generated.</p>;

//     return (
//       <div className="space-y-6">
//         {quizData.map((q, idx) => (
//           <div
//             key={idx}
//             className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm"
//           >
//             <p className="font-semibold mb-2">{q.question}</p>
//             {q.options.map((opt, i) => {
//               const selected = quizAnswers[idx] === opt;
//               const correct = submitted && q.answer === opt;

//               return (
//                 <label
//                   key={i}
//                   className={`block p-2 rounded cursor-pointer ${
//                     submitted
//                       ? correct
//                         ? "bg-green-100 border border-green-400"
//                         : selected
//                         ? "bg-red-100 border border-red-400"
//                         : ""
//                       : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`q-${idx}`}
//                     checked={selected}
//                     onChange={() =>
//                       setQuizAnswers((prev) => ({
//                         ...prev,
//                         [idx]: opt,
//                       }))
//                     }
//                     className="mr-2"
//                   />
//                   {opt}
//                 </label>
//               );
//             })}
//           </div>
//         ))}
//         {!submitted ? (
//           <button
//             onClick={() => setSubmitted(true)}
//             className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
//           >
//             Submit Quiz
//           </button>
//         ) : (
//           <p className="text-green-600 font-semibold">
//             ✅ Quiz Submitted! Correct answers are highlighted in green.
//           </p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col items-center p-6">
//       {/* Header */}
//       <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
//         🚀 AI Study Assistant
//       </h1>

//       {/* Input Mode Toggle */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setInputMode("upload")}
//           className={`px-4 py-2 rounded-lg ${
//             inputMode === "upload"
//               ? "bg-purple-500 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Upload
//         </button>
//         <button
//           onClick={() => setInputMode("write")}
//           className={`px-4 py-2 rounded-lg ${
//             inputMode === "write"
//               ? "bg-purple-500 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Write
//         </button>
//       </div>

//       {/* Upload / Write Section */}
//       {inputMode === "upload" ? (
//         <div className="bg-white/70 shadow-xl rounded-2xl p-6 w-full max-w-4xl mb-8 border border-purple-200">
//           <div className="flex items-center gap-3">
//             <input
//               type="file"
//               accept=".pdf,.txt"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="flex-1 border border-purple-300 p-2 rounded-lg"
//             />
//             <span className="text-sm text-gray-600">
//               {file ? file.name : "No file selected"}
//             </span>
//             <button
//               onClick={handleUpload}
//               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
//             >
//               <FiUpload /> Upload
//             </button>
//           </div>
//         </div>
//       ) : (
//         <textarea
//           rows="5"
//           value={manualText}
//           onChange={(e) => setManualText(e.target.value)}
//           placeholder="✍️ Paste or write your study material here..."
//           className="w-full max-w-4xl p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-8 bg-white shadow"
//         />
//       )}

//       {/* Tabs */}
//       <div className="flex justify-center gap-4 mb-6 flex-wrap">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-6 py-2 rounded-full font-semibold transition-all ${
//               activeTab === tab.id
//                 ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
//                 : "bg-white text-gray-600 border border-gray-200 hover:bg-purple-100"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Result Card */}
//       <div className="bg-white/80 shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-pink-200">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
//           <button
//             onClick={() => handleAction(activeTab)}
//             className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform shadow-md"
//             disabled={loading}
//           >
//             {loading ? "⏳ Processing..." : "▶ Run"}
//           </button>
//         </div>

//         {activeTab === "ask" && (
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="💬 Type your question about the uploaded text..."
//             className="w-full p-2 border border-purple-300 rounded-lg mb-4"
//           />
//         )}

//         {results[activeTab] &&
//           (activeTab === "quiz" ? (
//             renderQuiz()
//           ) : (
//             <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap relative border border-gray-200">
//               {results[activeTab]}
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <button
//                   onClick={() =>
//                     navigator.clipboard.writeText(results[activeTab])
//                   }
//                   className="bg-purple-100 p-2 rounded-full hover:bg-purple-200"
//                 >
//                   <FiCopy />
//                 </button>
//                 <button
//                   onClick={() => {
//                     const blob = new Blob([results[activeTab]], {
//                       type: "text/plain",
//                     });
//                     const link = document.createElement("a");
//                     link.href = URL.createObjectURL(blob);
//                     link.download = `${activeTab}.txt`;
//                     link.click();
//                   }}
//                   className="bg-yellow-100 p-2 rounded-full hover:bg-yellow-200"
//                 >
//                   <FiDownload />
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000"; // Backend URL

function App() {
  const [activeTab, setActiveTab] = useState("summarize");
  const [inputMode, setInputMode] = useState("upload");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [manualText, setManualText] = useState("");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({
    summarize: "",
    quiz: [],
    explain: "",
    ask: "",
  });

  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [question, setQuestion] = useState("");

  // Upload file (PDF or TXT)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setPdfFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPdfText(res.data.content);
    } catch (err) {
      console.error(err);
      alert("File upload failed.");
    }
  };

  // Call API endpoints
  const handleAction = async (endpoint) => {
    const text = inputMode === "upload" ? pdfText : manualText;
    if (!text) {
      alert("Please upload or paste text first.");
      return;
    }

    let payload = { text };
    if (endpoint === "ask") {
      if (!question) {
        alert("Please enter your question.");
        return;
      }
      payload.option = question;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/${endpoint}`, payload);

      let data;
      if (endpoint === "quiz") {
        try {
          data = JSON.parse(res.data.quiz);
        } catch (err) {
          console.error("Quiz parse failed:", err);
          data = [];
        }
      } else {
        data =
          res.data.summary ||
          res.data.explanation ||
          res.data.answer ||
          "⚠️ No response.";
      }

      setResults((prev) => ({
        ...prev,
        [endpoint]: data,
      }));
      setSubmitted(false);
      setQuizAnswers({});
    } catch (err) {
      console.error(err);
      setResults((prev) => ({
        ...prev,
        [endpoint]: "⚠️ Error occurred. Check server logs.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Render Quiz
  const renderQuiz = () => {
    const quizData = results.quiz;
    if (!quizData || !quizData.length) return <p>No quiz generated.</p>;

    return (
      <div className="space-y-6">
        {quizData.map((q, idx) => (
          <div
            key={idx}
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm"
          >
            <p className="font-semibold mb-2">{q.question}</p>
            {q.options.map((opt, i) => {
              const selected = quizAnswers[idx] === opt;
              const correct = submitted && q.answer === opt;

              return (
                <label
                  key={i}
                  className={`block p-2 rounded cursor-pointer ${
                    submitted
                      ? correct
                        ? "bg-green-100 border border-green-400"
                        : selected
                        ? "bg-red-100 border border-red-400"
                        : ""
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    checked={selected}
                    onChange={() =>
                      setQuizAnswers((prev) => ({
                        ...prev,
                        [idx]: opt,
                      }))
                    }
                    className="mr-2"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        ))}
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Submit Quiz
          </button>
        ) : (
          <p className="text-green-600 font-semibold">
            ✅ Quiz Submitted! Correct answers are highlighted in green.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          📘 AI Study Assistant
        </h1>

        {/* Input Mode Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              inputMode === "upload" ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setInputMode("upload")}
          >
            Upload File
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              inputMode === "manual" ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setInputMode("manual")}
          >
            Write Content
          </button>
        </div>

        {/* Input Area */}
        {inputMode === "upload" ? (
          <div className="mb-6">
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              className="mb-2"
            />
            {pdfFile && (
              <p className="text-sm text-gray-500">Uploaded: {pdfFile.name}</p>
            )}
          </div>
        ) : (
          <textarea
            className="w-full border rounded-lg p-3 mb-6"
            rows="4"
            placeholder="Paste or write text here..."
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
          />
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {["summarize", "quiz", "explain", "ask"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="mb-6">
          {activeTab === "explain" && (
            <select
              className="border rounded-lg p-2 mb-4"
              onChange={(e) => setManualText(e.target.value)}
            >
              <option value="Kid">Kid</option>
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
            </select>
          )}

          {activeTab === "ask" && (
            <input
              type="text"
              placeholder="Type your question..."
              className="border rounded-lg p-2 w-full mb-4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          )}

          <button
            onClick={() => handleAction(activeTab)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Loading..." : `Run ${activeTab}`}
          </button>
        </div>

        {/* Results */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-bold text-lg mb-2 capitalize">{activeTab} Result</h2>
          {activeTab === "quiz"
            ? renderQuiz()
            : <pre className="whitespace-pre-wrap">{results[activeTab]}</pre>}
        </div>
      </div>
    </div>
  );
}

export default App;
