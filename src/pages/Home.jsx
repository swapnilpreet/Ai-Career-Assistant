import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import ImageSlider from "../component/ImageSlider";
import { useState } from "react";
import {
  FaFileAlt,
  FaComments,
  FaBolt,
  FaShieldAlt,
  FaUpload,
  FaBrain,
  FaChartLine,
  FaStar,
  FaChevronDown,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { SiAirtransat } from "react-icons/si";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    feedback:
      "This tool boosted my resume score and helped me land interviews quickly!",
  },
  {
    name: "Priya Verma",
    role: "Frontend Developer",
    feedback:
      "Chat with PDF is insane! I prepared for interviews directly from docs.",
  },
  {
    name: "Amit Patel",
    role: "Data Analyst",
    feedback:
      "Super fast and accurate insights. Saved me hours of manual work.",
  },
  {
    name: "Sneha Gupta",
    role: "Student",
    feedback:
      "Helped me improve my resume and understand job requirements better.",
  },
];

const faqs = [
  {
    question: "Is this tool free?",
    answer:
      "Yes, basic features are completely free. Advanced features may be added in future.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, your data is secure and never stored permanently. We ensure privacy and encryption.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Currently, you can upload PDF files. Support for DOCX and other formats will be added soon.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "Our AI provides highly accurate insights based on modern models, but you should always review suggestions before final use.",
  },
  {
    question: "Can I use this for interview preparation?",
    answer:
      "Yes! You can analyze resumes, ask questions from PDFs, and prepare smarter for interviews.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Yes, you can use most popular features with signup.",
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
                AI Powered
              </span>{" "}
              Career Tools <SiAirtransat />
            </h1>
            <p className="text-gray-400 text-sm sm:text-lg mb-6">
              Analyze resumes, chat with PDFs, and boost your career using
              powerful AI tools — faster, smarter, better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/resume-analyzer"
                className="flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-red-500 px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
              >
                <FaFileAlt />
                Resume Analyzer
              </Link>
              <Link
                to="/chatwithpdf"
                className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
              >
                <FaComments />
                Chat with PDF
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="w-72 h-72 bg-linear-to-r from-amber-500 to-red-500 rounded-full blur-3xl opacity-20 absolute"></div>

            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl w-80">
              <h3 className="text-lg font-semibold mb-2 text-amber-400">
                AI Insights
              </h3>
              <p className="text-sm text-gray-300">
                Get smart resume suggestions and ask questions directly from
                PDFs with instant AI responses.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ImageSlider />
      <section className="py-12 px-4 sm:px-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition duration-300 hover:-translate-y-2">
            <FaFileAlt className="text-3xl text-amber-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold mb-2">Resume Analyzer</h3>
            <p className="text-gray-400 text-sm">
              Improve ATS score with AI-powered suggestions
            </p>
          </div>
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition duration-300 hover:-translate-y-2">
            <FaComments className="text-3xl text-amber-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold mb-2">Chat with PDF</h3>
            <p className="text-gray-400 text-sm">
              Ask anything from your documents instantly
            </p>
          </div>
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition duration-300 hover:-translate-y-2">
            <FaBolt className="text-3xl text-amber-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold mb-2">Fast</h3>
            <p className="text-gray-400 text-sm">
              Lightning-fast AI responses in seconds
            </p>
          </div>
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition duration-300 hover:-translate-y-2">
            <FaShieldAlt className="text-3xl text-amber-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-gray-400 text-sm">
              Your data is protected and encrypted
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 bg-slate-900 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:shadow-amber-500/20 transition hover:-translate-y-2">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-amber-500/20 mb-4">
              <FaUpload className="text-2xl text-amber-400 group-hover:scale-110 transition" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload</h3>
            <p className="text-gray-400 text-sm">
              Upload your resume or PDF document easily
            </p>
          </div>
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:shadow-amber-500/20 transition hover:-translate-y-2">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-amber-500/20 mb-4">
              <FaBrain className="text-2xl text-amber-400 group-hover:scale-110 transition" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Processing</h3>
            <p className="text-gray-400 text-sm">
              Our AI analyzes your content intelligently
            </p>
          </div>
          <div className="group bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:shadow-amber-500/20 transition hover:-translate-y-2">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-amber-500/20 mb-4">
              <FaChartLine className="text-2xl text-amber-400 group-hover:scale-110 transition" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Results</h3>
            <p className="text-gray-400 text-sm">
              Receive instant insights and improvements
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          User Feedback 💬
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-amber-500/20 transition hover:-translate-y-2"
            >
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4">"{item.feedback}"</p>
              <div>
                <h4 className="font-semibold text-white">{item.name}</h4>
                <span className="text-xs text-gray-400">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 bg-slate-900 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          FAQs ❓
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="font-medium text-sm sm:text-base">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-gray-300 text-sm sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 bg-linear-to-r from-amber-500 to-red-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Start Your AI Journey 🚀
          </h2>

          <p className="text-sm sm:text-lg mb-8 opacity-90">
            Analyze resumes, chat with PDFs, and boost your career with AI
            tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resume-analyzer"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
            >
              Resume Analyzer
            </Link>

            <Link
              to="/chat-pdf"
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
            >
              Chat with PDF
            </Link>
          </div>
        </div>
      </section>
      <footer className="bg-slate-950 text-gray-400 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">AI Tools</h3>
            <p className="text-sm">
              Smart tools to boost your career using AI.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/resume-analyzer" className="hover:text-white">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/chat-pdf" className="hover:text-white">
                  Chat with PDF
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <a href="#">
                <FaGithub className="hover:text-white cursor-pointer" />
              </a>
              <a href="#">
                <FaLinkedin className="hover:text-white cursor-pointer" />
              </a>
              <a href="#">
                <FaTwitter className="hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-4 text-center text-sm">
          © 2026 AI Tools. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
