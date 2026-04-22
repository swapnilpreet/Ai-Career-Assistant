import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ChatWithPDF from "./pages/ChatWithPDF";
import ProtectedRoute from "./component/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const apiUrl = import.meta.env.VITE_OPENROUTER_APIKEY;
console.log(apiUrl);
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/resume-analyzer"
        element={
          <ProtectedRoute>
            <ResumeAnalyzer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatwithpdf"
        element={
          <ProtectedRoute>
            <ChatWithPDF />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;
