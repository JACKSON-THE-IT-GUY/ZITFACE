import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white border border-gray-300 w-full max-w-[350px] p-10 flex flex-col items-center shadow-sm">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-black text-[#003366] italic tracking-tighter">
            ZIT<span className="text-[#FFCC00]">FACE</span>
          </h1>
          <p className="text-gray-500 font-bold text-[13px] mt-2 leading-tight px-2">
            Sign up to see photos and updates from your fellow CBU students.
          </p>
        </div>

        <form onSubmit={() => navigate('/')} className="w-full space-y-2">
          <input 
            type="email" 
            placeholder="University Email (@cbu.ac.zm)" 
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none"
          />
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none"
          />
          <input 
            type="text" 
            placeholder="Student Computer Number" 
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none"
          />
          
          {/* School Selection */}
          <select className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm text-gray-500 outline-none">
            <option>Select your School</option>
            <option>SNat (Natural Sciences)</option>
            <option>SBIT (Information Tech)</option>
            <option>SMines (Mines & Mineral Sciences)</option>
            <option>SAE (Built Environment)</option>
            <option>SBus (Business)</option>
          </select>

          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none"
          />

          <p className="text-[11px] text-gray-500 text-center py-3">
            By signing up, you agree to our Terms, Data Policy and Campus Privacy Policy.
          </p>
          
          <button 
            type="submit"
            className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-2 rounded-md text-sm transition-colors shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Switch to Login */}
      <div className="bg-white border border-gray-300 w-full max-w-[350px] p-6 mt-3 text-center shadow-sm">
        <p className="text-sm text-gray-600">
          Have an account? <span onClick={() => navigate('/')} className="text-[#003366] font-bold cursor-pointer hover:underline">Log in</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;