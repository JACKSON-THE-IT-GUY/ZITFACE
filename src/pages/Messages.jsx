import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Edit, Search } from 'lucide-react';

const Messages = () => {
  const navigate = useNavigate();

  // 1. Move chats into State so we can reorder them
  const [chats, setChats] = useState([
    { id: 1, name: "Phanciah", message: "Did you finish the project?", time: "2m ago", unread: true },
    { id: 2, name: "SBIT Group", message: "Class is at 14:00 today.", time: "1h ago", unread: false },
    { id: 3, name: "Engineering Society", message: "New hackathon date announced!", time: "3h ago", unread: false }
  ]);

  // 2. Function to "Bump" a chat to the top (Call this when a message is sent)
  const handleChatClick = (chatId) => {
    // For now, we just navigate. 
    // In a full app, sending a message would trigger this reorder logic.
    navigate(`/chat/${chatId}`);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-2xl font-bold text-gray-900">Chats</h2>
          <div className="flex gap-3">
             <div className="bg-[#003366]/10 p-2 rounded-full text-[#003366] relative">
                <Edit size={20} />
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            placeholder="Search messages..." 
            className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-[#003366]"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-1">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => handleChatClick(chat.id)}
              className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all active:scale-[0.98]"
            >
              <div className="w-14 h-14 bg-[#003366] rounded-full flex-shrink-0 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xl">
                {chat.name[0]}
              </div>
              <div className="flex-grow border-b border-gray-50 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`text-sm ${chat.unread ? 'font-bold' : 'font-semibold'} text-gray-900`}>{chat.name}</h3>
                  <span className={`text-[10px] ${chat.unread ? 'text-[#003366] font-bold' : 'text-gray-400'}`}>{chat.time}</span>
                </div>
                <p className={`text-xs truncate max-w-[200px] ${chat.unread ? 'font-bold text-black' : 'text-gray-500'}`}>
                  {chat.message}
                </p>
              </div>
              {chat.unread && <div className="w-2.5 h-2.5 bg-[#003366] rounded-full shadow-sm" />}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;