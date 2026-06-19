import React, { useState } from 'react';
import { Home, MessageCircle, Store, Flag, Bell, Menu, User, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Layout navigation items configuration with text labels
  const navItems = [
    { icon: <Home size={22} />, path: '/home', label: 'Home', type: 'link' },
    { icon: <MessageCircle size={22} />, path: '/messages', label: 'Messages', type: 'link' },
    { icon: <Store size={22} />, path: '/market', label: 'Market', type: 'link' },
    { icon: <Flag size={22} />, path: '/groups', label: 'Groups', type: 'link' },
    { icon: <Bell size={22} />, path: '#', label: 'Alerts', type: 'notification' },
    { icon: <User size={22} />, path: '/profile', label: 'Profile', type: 'link' },
    { icon: <Menu size={22} />, path: '/menu', label: 'Menu', type: 'link' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-28 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#003366] italic tracking-tighter">
          ZIT<span className="text-[#FFCC00]">FACE</span>
        </h1>
      </header>

      <main className="max-w-[500px] mx-auto px-2">
        {children}
      </main>

      {/* --- RE-STYLED NAVIGATION BAR WITH TEXT LABELS --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 flex justify-around items-center z-50 shadow-lg px-1">
        {navItems.map((item) => {
          const isRouteActive = location.pathname === item.path;
          const isNotifActive = item.type === 'notification' && isNotifOpen;
          const isActive = isRouteActive || isNotifActive;

          const content = (
            <div className="flex flex-col items-center justify-center relative w-full h-full pt-1">
              {item.icon}
              {/* Text Label */}
              <span className={`text-[10px] font-bold mt-1 tracking-tight ${isActive ? 'text-[#003366]' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/6 right-1/6 h-[3px] bg-[#003366] rounded-t-full animate-in fade-in slide-in-from-bottom-1 duration-300" />
              )}
            </div>
          );

          // Handle Notification Drawer Toggle Button
          if (item.type === 'notification') {
            return (
              <button 
                key={item.label}
                onClick={() => setIsNotifOpen(true)}
                className={`flex-1 h-full transition-all ${
                  isActive ? 'text-[#003366] scale-105' : 'text-gray-400 hover:text-[#003366]'
                }`}
              >
                {content}
              </button>
            );
          }

          // Handle Standard Navigation Links
          return (
            <Link 
              key={item.label} 
              to={item.path} 
              className={`flex-1 h-full text-center transition-all ${
                isActive ? 'text-[#003366] scale-105' : 'text-gray-400 hover:text-[#003366]/70'
              }`}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      {/* --- NOTIFICATION SLIDE PANEL --- */}
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