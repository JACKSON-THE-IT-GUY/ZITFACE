import React, { useState } from 'react'; // Added useState import
import { Home, MessageCircle, Store, Flag, Bell, Menu, User, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Updated navItems to include a "type"
  const navItems = [
  { icon: <Home size={26} />, path: '/home', label: 'Home', type: 'link' },
  { icon: <MessageCircle size={26} />, path: '/messages', label: 'Messages', type: 'link' },
    { icon: <Store size={26} />, path: '/market', label: 'Market', type: 'link' },
  { icon: <Flag size={26} />, path: '/groups', label: 'Groups', type: 'link' },
    { icon: <Bell size={26} />, path: '/alerts', label: 'Alerts', type: 'panel' },
    { icon: <User size={26} />, path: '/profile', label: 'Profile', type: 'link' },
  { icon: <Menu size={26} />, path: '/more', label: 'Menu', type: 'panel' },
];

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#003366] italic tracking-tighter">
          ZIT<span className="text-[#FFCC00]">FACE</span>
        </h1>
      </header>

      <main className="max-w-[500px] mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-between items-center z-50 shadow-lg">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          // Logic: If it's a panel, use a button. If it's a link, use <Link>.
          const content = (
            <>
              {item.icon}
              {isActive && (
                <div className="absolute -bottom-2 w-full h-[3px] bg-[#003366] rounded-t-full animate-in fade-in slide-in-from-bottom-1 duration-300" />
              )}
            </>
          );

          if (item.type === 'panel') {
            return (
              <button 
                key={item.label}
                onClick={() => setIsNotifOpen(true)}
                className="relative flex flex-col items-center justify-center w-full py-1 transition-all text-gray-500 hover:text-[#003366]"
              >
                {content}
              </button>
            );
          }

          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`relative flex flex-col items-center justify-center w-full py-1 transition-all ${
                isActive ? 'text-[#003366]' : 'text-gray-500 hover:text-[#003366]/70'
              }`}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      {/* --- THE NOTIFICATION PANEL --- */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white/95 backdrop-blur-xl border-l border-gray-100 z-[110] shadow-2xl transition-transform duration-500 ease-in-out ${isNotifOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-[#003366] italic">Notifications</h2>
            <button onClick={() => setIsNotifOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-3 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center shrink-0">
                <Heart size={18} className="text-[#003366]" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-bold">Ciah</span> liked your status.
                </p>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;