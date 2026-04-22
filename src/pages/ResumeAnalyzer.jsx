import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { extractTextFromPDF } from "../utils/pdftotext";
import { askAI } from "../utils/openRouter";
import { FaRocket } from "react-icons/fa";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("resumeHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const isResume = (text) => {
    const resumeIndicators = [
      "experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "summary",
      "objective",
      "contact",
    ];

    const lowerText = text.toLowerCase();
    let score = 0;

    resumeIndicators.forEach((word) => {
      if (lowerText.includes(word)) score++;
    });

    return score >= 3;
  };

  const cleanText = (text) => {
    return text
      .replace(/```/g, "")
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/#/g, "")
      .replace(/\n{2,}/g, "\n\n")
      .trim();
  };

  const handleAnalyze = async () => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF resume.");
      return;
    }

    setLoading(true);

    const text = await extractTextFromPDF(file);

    if (!isResume(text)) {
      setLoading(false);
      alert("This does not look like a resume.");
      return;
    }

    const prompt = `
Analyze this resume:

${text}

Return response in this format:

ATS Score: (number)

Skills:
- skill 1
- skill 2

Missing Skills:
- skill 1
- skill 2

Suggestions:
- point 1
- point 2
`;

    try {
      const res = await askAI(prompt);
      setResult(res);

      const newEntry = {
        fileName: file.name,
        result: res,
        time: new Date().toLocaleString(),
      };

      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("resumeHistory", JSON.stringify(updatedHistory));
    } catch (err) {
      alert("Something went wrong", err);
    }

    setLoading(false);
  };

  return (
    <>
   <Navbar />
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-20 left-5 z-50 bg-amber-500 px-3 py-2 rounded-lg shadow-lg hover:bg-amber-600"
      >
        ☰
      </button>

      <div className="flex">
        {/* sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-700 p-4 transform transition-transform duration-300 z-40 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-lg font-bold mb-4 text-white">📜 History</h2>

          <div className="flex mt-10 justify-end mb-3">
            <button
              onClick={() => {
                localStorage.removeItem("resumeHistory");
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
                  setResult(item.result);
                  setActiveIndex(index);
                }}
                className={`p-3 rounded-lg cursor-pointer border transition ${
                  activeIndex === index
                    ? "bg-amber-500/20 border-amber-400"
                    : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <p className="text-sm font-semibold text-amber-400">
                  {item.fileName.slice(0, 25)}...
                </p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 MAIN CONTENT */}
        <div
          className={`
    min-h-screen w-full 
    bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 
    text-white 
    p-4 sm:p-6 pt-20
    transition-all duration-300
    ${showSidebar ? "md:ml-72" : "ml-0"}
  `}
        >
          {/* TITLE */}
          <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-center mb-6 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            <FaRocket className="text-amber-400 text-xl sm:text-2xl" />
            <span>Resume Analyzer</span>
          </h2>

          {/* CARD */}
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
            {/* FILE INPUT */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
                onClick={handleAnalyze}
                className="bg-linear-to-r from-amber-500 to-red-500 px-4 sm:px-5 py-2 sm:py-3 rounded-lg hover:scale-105 transition text-sm sm:text-base w-full sm:w-auto"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {/* RESULT */}
            {result && (
              <div className="mt-8 space-y-4">
                {cleanText(result)
                  .split("\n\n")
                  .map((section, index) => {
                    const lines = section.split("\n");
                    const title = lines[0];
                    const items = lines.slice(1);

                    return (
                      <div
                        key={index}
                        className="bg-slate-800/60 border border-slate-700 p-3 sm:p-4 rounded-xl"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-amber-400 mb-2">
                          {title}
                        </h3>

                        <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm sm:text-base">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace("- ", "")}</li>
                          ))}
                        </ul>
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

export default ResumeAnalyzer;
