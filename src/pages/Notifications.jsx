import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Heart, MessageCircle, X, ArrowLeft } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 pb-24">
        {/* Header Bar */}
        <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-black text-[#003366] italic">Notifications</h1>
          </div>
        </div>

        {/* Notifications Feed Container */}
        <div className="p-4 max-w-lg mx-auto space-y-3">
          
          {/* Notification Item 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center shrink-0">
              <Heart size={18} className="text-[#003366]" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                <span className="font-bold">Phanciah</span> liked your status.
              </p>
              <span className="text-[10px] font-bold text-gray-400 uppercase block mt-1">2 mins ago</span>
            </div>
          </div>

          {/* Notification Item 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center shrink-0">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                <span className="font-bold">SBIT CBU</span> commented on your project.
              </p>
              <span className="text-[10px] font-bold text-gray-400 uppercase block mt-1">1 hour ago</span>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Notifications;