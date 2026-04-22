import React, { useState } from "react";
import { askAI } from "../utils/openRouter";
import { extractTextFromPDF } from "../utils/pdftotext";
import Navbar from "../component/Navbar";
import { FaFilePdf } from "react-icons/fa";

const ChatWithPDF = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("chatPDFHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Upload PDF
  const handleUpload = async () => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setLoading(true);
    const text = await extractTextFromPDF(file);
    setPdfText(text);
    setIsUploaded(true);
    setLoading(false);
  };

  // Ask AI
  const handleAsk = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    if (!pdfText) {
      alert("Please upload PDF first");
      return;
    }

    setLoading(true);

    const prompt = `
Answer based on the document below.

Document:
${pdfText.slice(0, 5000)}

Question:
${question}

Return answer STRICTLY in this format:

- Definition: short explanation
- Explanation: detailed explanation
- Use Cases:
  - use case 1
  - use case 2
- Key Points:
  - point 1
  - point 2
- Important Details:
  - detail 1
  - detail 2
- Conclusion: short summary
`;

    try {
      const res = await askAI(prompt);
      setAnswer(res);

      const newEntry = {
        question,
        answer: res,
        time: new Date().toLocaleString(),
      };

      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("chatPDFHistory", JSON.stringify(updatedHistory));
    } catch (err) {
      alert("AI service error. Try again.", err);
    }

    setLoading(false);
  };

  // Clean AI text
  const cleanText = (text) => {
    return text
      .replace(/```/g, "")
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/#/g, "")
      .trim();
  };

  return (
    <>
      <Navbar />

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-20 left-5 z-50 bg-amber-500 px-3 py-2 rounded-lg shadow-lg hover:bg-amber-600"
      >
        ☰
      </button>

      <div className="flex">
        {/* SIDEBAR */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-700 p-4 transform transition-transform duration-300 z-40 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-lg font-bold mb-4 text-white">💬 History</h2>

          <div className=" mt-8 w-full flex justify-end">
            <button
              onClick={() => {
                localStorage.removeItem("chatPDFHistory");
                setHistory([]);
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm mb-5 text-white"
            >
              Clear
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto h-[80vh]">
            {history.length === 0 && (
              <p className="text-gray-400 text-sm">No history yet</p>
            )}

            {history.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuestion(item.question);
                  setAnswer(item.answer);
                  setActiveIndex(index);
                }}
                className={`p-3 rounded-lg cursor-pointer border transition ${
                  activeIndex === index
                    ? "bg-amber-500/20 border-amber-400"
                    : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <p className="text-sm font-semibold text-amber-400">
                  {item.question.slice(0, 40)}...
                </p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div
          className={`
    min-h-screen w-full 
    bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 
    text-white 
    p-4 sm:p-6 
    transition-all duration-300
    ${showSidebar ? "md:ml-72" : "ml-0"}
  `}
        >
          {/* TITLE */}
          <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold mb-6 text-center bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            <FaFilePdf className="text-red-500 text-xl sm:text-2xl" />
            <span>Chat with PDF</span>
          </h2>
          {/* MAIN CARD */}
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/10">
            {/* UPLOAD */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-xs sm:text-sm text-gray-300 
        file:mr-2 sm:file:mr-4 
        file:py-2 file:px-3 sm:file:px-4 
        file:rounded file:border-0 
        file:bg-amber-500 file:text-white 
        hover:file:bg-amber-600"
              />

              <button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto"
              >
                {loading && !isUploaded ? "Uploading..." : "Upload PDF"}
              </button>
            </div>

            {/* Upload Success */}
            {isUploaded && (
              <p className="text-green-400 text-xs sm:text-sm mt-2">
                ✅ PDF uploaded successfully
              </p>
            )}

            {/* QUESTION */}
            {isUploaded && (
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Ask something from your PDF..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-3 text-sm sm:text-base rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-amber-500 outline-none"
                />

                <button
                  onClick={handleAsk}
                  className="mt-3 w-full bg-linear-to-r from-amber-500 to-red-500 py-2 sm:py-3 rounded-lg hover:scale-105 transition text-sm sm:text-base"
                >
                  {loading && isUploaded ? "Asking AI..." : "Ask AI 🚀"}
                </button>
              </div>
            )}

            {/* ANSWER */}
            {answer && (
              <div className="mt-8 space-y-4">
                {cleanText(answer)
                  .split("\n- ")
                  .filter((section) => section.trim() !== "")
                  .map((section, index) => {
                    const [title, ...contentParts] = section.split(":");
                    const content = contentParts.join(":").trim();

                    const points = content
                      .split("\n")
                      .map((line) => line.replace(/^- /, "").trim())
                      .filter((line) => line !== "");

                    return (
                      <div
                        key={index}
                        className="bg-slate-800/60 border border-slate-700 p-3 sm:p-4 rounded-xl"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-amber-400 mb-2">
                          {title.trim()}
                        </h3>

                        {points.length > 1 ? (
                          <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm sm:text-base">
                            {points.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-300 text-sm sm:text-base">
                            {points[0]}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWithPDF;
