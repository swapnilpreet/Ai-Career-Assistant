import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const users=JSON.parse(localStorage.getItem("users")) || [];
    const user=users.find((user)=>user.email===formData.email);
    if(!user){
      return alert("User not Found");
    }
    const isMatch=await bcrypt.compare(formData.password,user.password);
    if(!isMatch){
      return alert("Invalid Password")
    }
    sessionStorage.setItem("loggedInuser",JSON.stringify(user));
    navigate('/')
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">Login</h2>
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            required
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <span className="absolute right-3 top-3 cursor-pointer text-gray-400" onClick={() => setshowpassword(!showpassword)}>
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="w-full bg-linear-to-r from-amber-500 to-red-500 py-2 rounded-lg font-medium hover:scale-105 transition">Login</button>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account ?{" "}
          <span onClick={() => navigate("/signup")}className="text-amber-400 cursor-pointer hover:underline">Signup</span>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
