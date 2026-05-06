import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Send, Phone, Video } from 'lucide-react';

const ChatScreen = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  // Create a reference for the scrollable area
  const scrollRef = useRef(null);

  const chatData = {
    "1": { name: "Phanciah", initial: "Hey! Did you finish the project for SBIT?" },
    "2": { name: "SBIT Group", initial: "Class is at 14:00 today. Don't be late!" },
    "3": { name: "Engineering Society", initial: "New hackathon date announced for next month." }
  };

  const currentChat = chatData[id] || { name: "User", initial: "Hello!" };

  // Refresh messages when the chat ID changes
  useEffect(() => {
    setMessages([
      { id: 1, text: currentChat.initial, sender: "them", time: "09:00" },
      { id: 2, text: "Almost done, just fixing the navigation bugs.", sender: "me", time: "09:05" },
    ]);
    setMessage("");
  }, [id, currentChat.initial]);

  // NEW: Auto-scroll to bottom whenever a new message is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    // In a real app, you'd trigger a backend update here 
    // to move this chat to the top of the main list.
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#003366] hover:bg-gray-50 p-1 rounded-full transition-colors">
            <ChevronLeft size={28} />
          </button>
          
          <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
            {currentChat.name[0]}
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-900">{currentChat.name}</h2>
            <p className="text-[10px] text-green-500 font-medium uppercase tracking-wider">Online</p>
          </div>
        </div>

        <div className="flex gap-4 text-[#003366]">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Phone size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Video size={20} /></button>
        </div>
      </header>

      {/* --- MESSAGES AREA --- */}
      <div 
        ref={scrollRef} // Attached the scroll reference here
        className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F9FAFB] scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm transition-all ${
              msg.sender === 'me' 
                ? 'bg-[#003366] text-white rounded-tr-none animate-in slide-in-from-right-2 duration-200' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none animate-in slide-in-from-left-2 duration-200'
            }`}>
              {msg.text}
              <p className={`text-[9px] mt-1 text-right ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Write a message..." 
          className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-[#003366] transition-all"
        />
        <button 
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="bg-[#003366] text-white p-2 rounded-full shadow-md active:scale-95 transition-all disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;