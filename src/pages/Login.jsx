import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

// Try this relative path - it goes up one level to 'src' then into 'assets'
import zitfaceLogo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white border border-gray-300 w-full max-w-[350px] p-10 flex flex-col items-center shadow-sm">

        <div className="mb-8 text-center">
          {/* If the image still breaks, this alt text will show up instead of a blank page */}
          <img
            src={zitfaceLogo}
            alt="Zitface Logo"
            className="h-20 w-auto object-contain mx-auto mb-2"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h1 className="text-4xl font-black text-[#003366] italic tracking-tighter">
            ZIT<span className="text-[#FFCC00]">FACE</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-1">
            University Connect
          </p>
        </div>

        {error && (
          <div className="w-full bg-red-100 border border-red-200 text-red-700 p-2 rounded-sm text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Student ID or CBU Email"
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-2 rounded-md text-sm transition-colors mt-4 shadow-md disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-400 text-[10px] font-bold uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full text-[#003366] font-bold text-sm flex items-center justify-center gap-2"
          >
            Forgot password?
          </button>
        </form>
      </div>

      {/* Sign Up Box */}
      <div className="bg-white border border-gray-300 w-full max-w-[350px] p-6 mt-3 text-center shadow-sm">
        <p className="text-sm text-gray-600">
          New to University Connect?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#003366] font-bold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>

      {/* Footer info */}
      <p className="mt-8 text-gray-400 text-[11px] text-center max-w-[300px]">
        Exclusively for the Copperbelt University Community. Built for students,
        by students.
      </p>
    </div>
  );
};

export default Login;