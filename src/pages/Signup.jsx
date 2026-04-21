import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Signup = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleinputs = (e) => {
    setformData({...formData,[e.target.name]:e.target.value});
  };

  const handleSignup=async(e)=>{
      e.preventDefault();
      const users=JSON.parse(localStorage.getItem("users")) || [];
      const existingUser=users.find((user)=>user.email===formData.email);

      if(existingUser){
        return alert("User Already exists")
      }

      const hashpassword= await bcrypt.hash(formData.password,10);

      const NewUser={
        name:formData.name,
        email:formData.email,
        password:hashpassword,
      }
      users.push(NewUser);
      localStorage.setItem("users",JSON.stringify(users));
      alert("signup successful");
      navigate("/login")
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      <form onSubmit={handleSignup}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">Create Account</h2>
        <div className="relative mb-4">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            onChange={handleinputs}
            required
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleinputs}
            required
             className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Create password"
            onChange={handleinputs}
            required
             className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <span className="absolute right-3 top-3 cursor-pointer text-gray-400" onClick={() => setshowpassword(!showpassword)}>
            {showpassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="w-full bg-linear-to-r from-amber-500 to-red-500 py-2 rounded-lg font-medium hover:scale-105 transition">Signup</button>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an Account!{" "}
          <span onClick={() => navigate("/login")}  className="text-amber-400 cursor-pointer hover:underline">Login</span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
