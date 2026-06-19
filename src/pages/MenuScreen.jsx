import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Store, 
  Bookmark, 
  Bell, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Tv, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  Briefcase, 
  Heart,
  Layers,
  GraduationCap
} from 'lucide-react';

const MenuScreen = () => {
  const navigate = useNavigate();
  const [showMoreShortcuts, setShowMoreShortcuts] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Main grid layout shortcuts
  const mainShortcuts = [
    { label: 'Groups', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', path: '/groups' },
    { label: 'ZitMarket', icon: Store, color: 'text-green-500', bg: 'bg-green-50', path: '/market' },
    { label: 'Saved', icon: Bookmark, color: 'text-purple-500', bg: 'bg-purple-50', path: '/market' },
    // 💡 Completely isolated route directly targeting the standalone center page
    { label: 'Notifications', icon: Bell, color: 'text-red-500', bg: 'bg-red-50', path: '/notifications' },
    { label: 'SmartClass Tracker', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-50', path: '/home' },
    { label: 'Events', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50', path: '/home' },
  ];

  // Hidden secondary shortcuts that reveal when clicking "See More"
  const hiddenShortcuts = [
    { label: 'Memories', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-50', path: '/home' },
    { label: 'Watch / Videos', icon: Tv, color: 'text-teal-500', bg: 'bg-teal-50', path: '/home' },
    { label: 'Jobs & Projects', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50', path: '/market' },
    { label: 'Fundraisers', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', path: '/home' },
    { label: 'Security & Audits', icon: ShieldAlert, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/home' },
  ];

  const toggleDropdown = (section) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      {/* 1. Header Bar */}
      <div className="bg-white px-4 py-3 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Menu</h1>
        <button 
          onClick={() => navigate('/home')} 
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-1.5 rounded-full text-sm transition-colors"
        >
          Done
        </button>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-4">
        
        {/* 2. Primary Account Profile Card */}
        <Link 
          to="/profile" 
          className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-all border border-slate-200/60"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-900 ring-2 ring-blue-100 text-white rounded-full flex items-center justify-center font-bold text-lg">
              J
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Jackson Nsonga</h3>
              <p className="text-xs text-slate-500">Profiles · JN Solutions</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <Layers size={18} className="text-slate-400 mr-1" />
            <ChevronRight size={18} />
          </div>
        </Link>

        {/* 3. Grid Shortcuts Section */}
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 mb-2">
            Your Shortcuts
          </h2>
          
          <div className="grid grid-cols-2 gap-2.5">
            {mainShortcuts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="bg-white p-3.5 rounded-xl shadow-sm flex flex-col justify-between h-24 border border-slate-200/40 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className={`p-2 rounded-lg w-fit ${item.bg}`}>
                    <Icon className={item.color} size={22} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm tracking-tight">{item.label}</span>
                </Link>
              );
            })}

            {/* Conditionally Rendered Extra Shortcuts */}
            {showMoreShortcuts && hiddenShortcuts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="bg-white p-3.5 rounded-xl shadow-sm flex flex-col justify-between h-24 border border-slate-200/40 hover:shadow-md transition-all animate-fadeIn"
                >
                  <div className={`p-2 rounded-lg w-fit ${item.bg}`}>
                    <Icon className={item.color} size={22} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* See More / See Less Toggle Button */}
          <button
            onClick={() => setShowMoreShortcuts(!showMoreShortcuts)}
            className="w-full mt-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl shadow-sm border border-slate-200/60 flex items-center justify-center space-x-1 text-sm transition-all"
          >
            <span>{showMoreShortcuts ? 'See Less' : 'See More'}</span>
            {showMoreShortcuts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* 4. Dropdown Settings Accordions */}
        <div className="space-y-2">
          
          {/* Settings & Privacy Container */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <button
              onClick={() => toggleDropdown('settings')}
              className="w-full flex items-center justify-between p-4 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Settings size={22} className="text-slate-500" />
                <span className="font-bold text-sm text-slate-800">Settings & Privacy</span>
              </div>
              {activeDropdown === 'settings' ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>
            
            {activeDropdown === 'settings' && (
              <div className="bg-slate-50/50 border-t divide-y divide-slate-100 px-4 text-sm text-slate-600 animate-slideDown">
                <div className="py-3 pl-8 hover:text-blue-600 cursor-pointer font-medium">System Settings</div>
                <div className="py-3 pl-8 hover:text-blue-600 cursor-pointer font-medium">Dark Mode Configurations</div>
                <div className="py-3 pl-8 hover:text-blue-600 cursor-pointer font-medium">Language & Text</div>
              </div>
            )}
          </div>

          {/* Help & Support Container */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <button
              onClick={() => toggleDropdown('help')}
              className="w-full flex items-center justify-between p-4 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle size={22} className="text-slate-500" />
                <span className="font-bold text-sm text-slate-800">Help & Support</span>
              </div>
              {activeDropdown === 'help' ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>
            
            {activeDropdown === 'help' && (
              <div className="bg-slate-50/50 border-t divide-y divide-slate-100 px-4 text-sm text-slate-600 animate-slideDown">
                <div className="py-3 pl-8 hover:text-blue-600 cursor-pointer font-medium">Report a Technical Bug</div>
                <div className="py-3 pl-8 hover:text-blue-600 cursor-pointer font-medium">CBU Community Guidelines</div>
                <div className="py-3 pl-8 hover:text-blue-600 cursor-pointer font-medium">Terms of Service</div>
              </div>
            )}
          </div>

        </div>

        {/* 5. Main Action Button (Log Out) */}
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold p-3 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.99] border border-slate-300/40"
        >
          <LogOut size={18} className="text-slate-600" />
          <span>Log Out</span>
        </button>

      </div>
    </div>
  );
};

export default MenuScreen;