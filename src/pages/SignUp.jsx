import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ username, email, password });
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <div className="w-full bg-red-100 border border-red-200 text-red-700 p-2 rounded-sm text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none"
          />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="University Email (@cbu.ac.zm)" 
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs rounded-sm focus:border-[#003366] outline-none"
          />

          <p className="text-[11px] text-gray-500 text-center py-3">
            By signing up, you agree to our Terms, Data Policy and Campus Privacy Policy.
          </p>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-2 rounded-md text-sm transition-colors shadow-md disabled:opacity-60"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
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