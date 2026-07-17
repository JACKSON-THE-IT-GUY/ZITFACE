import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Send, Search, ChevronLeft, MoreVertical, ShieldAlert, Circle } from "lucide-react";

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // 📡 FETCH LIVE CONVERSATION LIST ON INITIAL MOUNT
  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/messages/inbox', { // Endpoint tailored to get user's recent chats
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
        }
      } catch (err) {
        console.error("Error connecting to chat provider:", err);
      }
    };
    fetchInbox();
  }, []);

  // 🔄 FETCH CHAT STREAM WHEN A STUDENT TARGET IS CHANGED
  useEffect(() => {
    if (!activeChat) return;

    const loadChatLog = async () => {
      setLoadingHistory(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/messages/${activeChat.conversationId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setChatHistory(data);
        }
      } catch (err) {
        console.error("Failed loading backend message logs:", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadChatLog();
    
    // Optional polling interval to simulate live incoming chats without WebSockets running yet
    const interval = setInterval(loadChatLog, 4000); 
    return () => clearInterval(interval);
  }, [activeChat]);

  // 📤 POST MESSAGE DISPATCH
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChat) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversationId: activeChat.conversationId,
          recipientId: activeChat.user._id,
          text: typedMessage.trim()
        })
      });

      if (res.ok) {
        const newMsg = await res.json();
        setChatHistory((prev) => [...prev, newMsg]); // Append immediately to layout array
        setTypedMessage("");
      }
    } catch (err) {
      console.error("Message delivery failed:", err);
    }
  };

  const filteredChats = conversations.filter(c => 
    c.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex relative mt-2">
        
        {/* INBOX SIDEBAR */}
        <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col h-full bg-white ${activeChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-gray-50 shrink-0">
            <h2 className="font-black text-xl text-[#003366] italic tracking-tight mb-3">Inbox</h2>
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus-within:bg-white focus-within:border-[#003366]/40 transition-all">
              <Search size={14} className="text-gray-400 mr-2" />
              <input 
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-gray-700 font-medium"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-2 space-y-1">
            {filteredChats.map((chat) => (
              <div 
                key={chat.conversationId}
                onClick={() => setActiveChat(chat)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  activeChat?.conversationId === chat.conversationId ? "bg-[#003366]/5" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 text-[#003366] font-black flex items-center justify-center border text-sm shadow-inner">
                  {chat.user?.username ? chat.user.username[0].toUpperCase() : 'U'}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-black text-gray-800 truncate">{chat.user?.username}</h4>
                  <p className="text-[11px] text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE MAIN CHAT VIEW */}
        <div className={`flex-grow flex flex-col h-full bg-gray-50/30 ${!activeChat ? "hidden md:flex items-center justify-center" : "flex"}`}>
          {activeChat ? (
            <>
              <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => setActiveChat(null)} className="md:hidden p-1 text-gray-500">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="w-9 h-9 rounded-full bg-[#003366] text-white font-black text-xs flex items-center justify-center">
                    {activeChat.user?.username ? activeChat.user.username[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-gray-800">{activeChat.user?.username}</h3>
                  </div>
                </div>
              </div>

              {/* Chat log stream displaying backend records */}
              <div className="flex-grow overflow-y-auto p-4 space-y-3">
                {loadingHistory ? (
                  <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider animate-pulse py-10">Syncing chat log...</div>
                ) : (
                  chatHistory.map((msg) => {
                    // Check local token decode string to match current user context
                    const isMe = msg.sender === localStorage.getItem('userId') || msg.isMe; 
                    return (
                      <div key={msg._id || msg.id} className={`flex flex-col max-w-[80%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}>
                        <div className={`px-4 py-2 rounded-2xl text-[13px] border shadow-sm ${
                          isMe ? "bg-[#003366] text-white rounded-br-none border-[#002244]" : "bg-white text-gray-800 rounded-bl-none border-gray-100"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
                <input 
                  type="text"
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-50 rounded-xl px-4 py-2 text-xs outline-none border focus:border-[#003366]/20 focus:bg-white transition-all"
                />
                <button type="submit" disabled={!typedMessage.trim()} className="bg-[#003366] text-white p-2 rounded-xl disabled:opacity-30">
                  <Send size={14} />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center p-6 select-none">
              <div className="w-16 h-16 bg-[#003366]/5 text-[#003366] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">💬</div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Select a Conversation</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;