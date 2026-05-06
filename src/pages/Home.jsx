import React, { useState } from 'react';
import Layout from '../components/Layout';
// Find your lucide-react import and add Plus
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, X, MapPin, Smile, Send, Plus } from 'lucide-react';


const Home = () => {
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Comment Drawer States
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [newComment, setNewComment] = useState("");
const stories = [
    { id: 1, user: "Your Story", isMe: true },
    { id: 2, user: "Phanciah", color: "bg-gradient-to-tr from-yellow-400 to-fuchsia-600" },
    { id: 3, user: "SICT CBU", color: "bg-gradient-to-tr from-[#003366] to-blue-400" },
    { id: 4, user: "CBU_Events", color: "bg-gradient-to-tr from-green-400 to-cyan-500" },
    { id: 5, user: "ZitMarket", color: "bg-gradient-to-tr from-orange-400 to-red-500" },
  ];
  // Main Feed State
  const [zits, setZits] = useState([
    {
      id: 1,
      author: "Engineering Student Association",
      time: "15m ago",
      content: "Big news! The CBU Connect hackathon registration is now open. Let's see who the best developers are at Copperbelt University. 👨‍💻🔥",
      likes: 128,
      isLiked: false,
      comments: [
        { id: 101, user: "Phanciah", text: "Can't wait for this! 🔥" },
        { id: 102, user: "SBIT Official", text: "Register via the link in our bio." }
      ],
      image: null
    }
  ]);

  // --- HANDLERS ---

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handlePost = () => {
  // .trim() prevents users from posting empty spaces/newlines
  if (!postText.trim() && !selectedImage) return;

  const newZit = {
    id: Date.now(),
    author: "Jackson Nsonga", // Professional brand name
    time: "Just now",
    content: postText.trim(),
    likes: 0,
    isLiked: false,
    comments: [],
    image: selectedImage
  };

  // Prepend the new status to the zits array
  setZits((prevZits) => [newZit, ...prevZits]);

  // Reset state to clear the modal for the next post
  setPostText("");
  setSelectedImage(null);
  setIsModalOpen(false);
};

  const handleLike = (id) => {
    setZits(zits.map(zit => {
      if (zit.id === id) {
        return {
          ...zit,
          likes: zit.isLiked ? zit.likes - 1 : zit.likes + 1,
          isLiked: !zit.isLiked
        };
      }
      return zit;
    }));
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    setZits(zits.map(zit => {
      if (zit.id === postId) {
        return {
          ...zit,
          comments: [...zit.comments, { id: Date.now(), user: "Jackson Nsonga", text: newComment }]
        };
      }
      return zit;
    }));
    setNewComment("");
  };

  const handleShare = (content) => {
    if (navigator.share) {
      navigator.share({ title: 'Zitface', text: content, url: window.location.href });
    } else {
      navigator.clipboard.writeText(content);
      alert("Link copied to clipboard!");
    }
  };

 return (
    <Layout>
      <div className="pb-24">
        
        {/* --- 1. INSTAGRAM-STYLE STORIES SECTION --- */}
        {/* --- UPGRADED GLASS STORIES SECTION --- */}
<div className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-6 mb-4 overflow-x-auto no-scrollbar flex gap-4 px-4">
  {stories.map((story) => (
    <div key={story.id} className="group flex flex-col items-center flex-shrink-0">
      <div className="relative">
        {/* The "Outer Ring" with a spinning animation on hover */}
        <div className={`p-[3px] rounded-full ${story.isMe ? 'bg-gray-200' : 'bg-gradient-to-tr from-[#FFCC00] via-[#003366] to-fuchsia-500'} group-hover:rotate-180 transition-transform duration-700`}>
          <div className="w-[72px] h-[72px] rounded-full border-[3px] border-white overflow-hidden bg-gray-50 flex items-center justify-center shadow-inner">
            {/* User Initial with a soft shadow */}
            <span className="text-2xl font-black text-[#003366] drop-shadow-sm">
              {story.user[0]}
            </span>
          </div>
        </div>

        {/* Floating Add Button for Jackson */}
        {story.isMe && (
          <div className="absolute bottom-1 right-1 bg-[#003366] border-[3px] border-white rounded-full p-1 shadow-lg group-hover:scale-110 transition-transform">
            <Plus size={14} className="text-white" strokeWidth={4} />
          </div>
        )}
      </div>
      
      {/* Label with improved typography */}
      <span className={`mt-2 text-[10px] font-black uppercase tracking-wider text-center w-20 truncate ${story.isMe ? 'text-gray-400' : 'text-[#003366]'}`}>
        {story.user}
      </span>
    </div>
  ))}
</div>

        {/* --- 2. MAIN FEED CONTENT (Quick Post & Zits) --- */}
        <div className="p-4 space-y-4">
          
          {/* QUICK POST BAR */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#003366] rounded-full flex-shrink-0" />
              <div className="bg-gray-100 flex-grow rounded-full px-5 py-2.5 text-sm text-gray-500">
                What's on your mind, Jackson?
              </div>
              <ImageIcon className="text-green-500" size={22} />
            </div>
          </div>

          {/* DYNAMIC FEED */}
          {zits.map((zit) => (
            <div key={zit.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center text-white font-bold">
                    {zit.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-gray-900">{zit.author}</p>
                    <p className="text-[11px] text-gray-500">{zit.time}</p>
                  </div>
                </div>
                <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
              </div>
              
              <div className="px-4 pb-3 text-[15px] text-gray-800 leading-relaxed">
                {zit.content}
              </div>

              {zit.image && (
                <div className="mx-2 rounded-xl overflow-hidden border border-gray-50">
                  <img src={zit.image} alt="post" className="w-full object-cover max-h-96" />
                </div>
              )}

              {/* Interaction Bar */}
              <div className="px-4 py-3 flex gap-8 border-t border-gray-50 mt-2">
                <button 
                  onClick={() => handleLike(zit.id)}
                  className={`flex items-center gap-2 text-xs font-bold transition-all ${zit.isLiked ? 'text-red-500 scale-105' : 'text-gray-600'}`}
                >
                  <Heart size={20} fill={zit.isLiked ? "currentColor" : "none"} /> {zit.likes}
                </button>
                
                <button 
                  onClick={() => setActiveCommentPost(zit)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#003366]"
                >
                  <MessageCircle size={20} /> {zit.comments.length}
                </button>
                
                <button onClick={() => handleShare(zit.content)} className="ml-auto text-gray-400">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
      
      {/* Modal Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 p-1">
          <X size={24} />
        </button>
        <h3 className="font-black text-[#003366] italic text-lg">Create Status</h3>
        <button 
          onClick={handlePost}
          disabled={!postText.trim() && !selectedImage}
          className="bg-[#003366] text-white px-6 py-2 rounded-full font-black text-sm disabled:opacity-30 transition-all active:scale-95"
        >
          Post
        </button>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center text-white font-bold shrink-0">
            J
          </div>
          <textarea 
            autoFocus
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's happening at CBU?" 
            className="w-full min-h-[150px] text-lg outline-none resize-none pt-2 placeholder:text-gray-300"
          />
        </div>

        {/* Image Preview Area */}
        {selectedImage && (
          <div className="relative rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full backdrop-blur-md"
            >
              <X size={16} />
            </button>
            <img src={selectedImage} alt="preview" className="w-full object-cover max-h-60" />
          </div>
        )}

        {/* Status Tools */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex gap-4">
            <label className="cursor-pointer group">
              <ImageIcon size={22} className="text-green-500 group-hover:scale-110 transition-transform" />
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </label>
            <MapPin size={22} className="text-red-400 hover:scale-110 transition-transform cursor-pointer" />
            <Smile size={22} className="text-yellow-500 hover:scale-110 transition-transform cursor-pointer" />
          </div>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            {postText.length} / 280
          </span>
        </div>
      </div>
    </div>
  </div>
)}

    {/* --- ULTRA-COMPACT COMMENT DRAWER --- */}
      {activeCommentPost && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[100] flex items-end justify-center">
          {/* Height reduced to 50vh (half screen) and Max-Width tightened */}
          <div className="bg-white w-full max-w-sm rounded-t-[1.5rem] h-[50vh] flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl border-x border-t border-gray-100">
            
            {/* Grab Handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-2.5" />

            <div className="p-3 border-b border-gray-50 flex justify-between items-center">
              <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
                Comments ({activeCommentPost.comments.length})
              </span>
              <button onClick={() => setActiveCommentPost(null)} className="p-1 hover:bg-gray-50 rounded-full">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-3 space-y-2.5">
              {activeCommentPost.comments.length > 0 ? (
                activeCommentPost.comments.map(c => (
                  <div key={c.id} className="flex gap-2 items-start">
                    <div className="w-6 h-6 bg-[#003366] rounded-full flex-shrink-0 flex items-center justify-center text-[8px] text-white font-bold">
                      {c.user[0]}
                    </div>
                    {/* Tightened Bubble padding and width */}
                    <div className="bg-gray-50 px-3 py-1.5 rounded-2xl rounded-tl-none max-w-[90%] border border-gray-100">
                      <p className="text-[10px] font-black text-[#003366]">{c.user}</p>
                      <p className="text-[13px] text-gray-700 leading-tight">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-[11px] font-bold text-gray-300 py-10">Start the conversation...</p>
              )}
            </div>

            {/* Slim Input Bar */}
            <div className="p-2 border-t bg-white pb-4 flex items-center gap-2">
              <input 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Say something..." 
                className="flex-grow bg-gray-50 rounded-xl px-4 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-[#003366]/20 transition-all"
              />
              <button 
                onClick={() => handleAddComment(activeCommentPost.id)}
                disabled={!newComment.trim()}
                className="text-[#003366] p-1.5 disabled:opacity-20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- NOTIFICATION PANEL --- */}
<div className={`fixed inset-y-0 right-0 w-80 bg-white/90 backdrop-blur-xl border-l border-gray-100 z-[110] shadow-2xl transition-transform duration-500 ease-in-out ${isNotifOpen ? 'translate-x-0' : 'translate-x-full'}`}>
  <div className="p-6">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-black text-[#003366] italic">Notifications</h2>
      <button onClick={() => setIsNotifOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <X size={20} className="text-gray-400" />
      </button>
    </div>

    <div className="space-y-4">
      {/* Example Notification Item */}
      <div className="flex gap-4 p-3 rounded-2xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-gray-50">
        <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center shrink-0">
          <Heart size={18} className="text-[#003366]" fill="currentColor" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">Phanciah</span> liked your status.
          </p>
          <span className="text-[10px] font-bold text-gray-400 uppercase">2 mins ago</span>
        </div>
      </div>

      <div className="flex gap-4 p-3 rounded-2xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-gray-50">
        <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center shrink-0">
          <MessageCircle size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">SBIT CBU</span> commented on your project.
          </p>
          <span className="text-[10px] font-bold text-gray-400 uppercase">1 hour ago</span>
        </div>
      </div>
    </div>
  </div>
</div>
    </Layout>
  );
};

export default Home;