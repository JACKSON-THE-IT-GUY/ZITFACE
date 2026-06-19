import React, { useState, useRef } from 'react'; // Added useRef
import Layout from '../components/Layout';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  X, 
  MapPin, 
  Smile, 
  Send, 
  Plus 
} from 'lucide-react';

const Home = () => {
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Comment Drawer States
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Ref for the Story file upload input
  const storyInputRef = useRef(null);

  // --- STORIES STATE ---
  const [stories, setStories] = useState([
    { id: 1, user: "Your Story", isMe: true },
    { id: 2, user: "Phanciah", color: "bg-gradient-to-tr from-yellow-400 to-fuchsia-600" },
    { id: 3, user: "SICT CBU", color: "bg-gradient-to-tr from-[#003366] to-blue-400" },
    { id: 4, user: "CBU_Events", color: "bg-gradient-to-tr from-green-400 to-cyan-500" },
    { id: 5, user: "ZitMarket", color: "bg-gradient-to-tr from-orange-400 to-red-500" },
  ]);

  const [zits, setZits] = useState([
    {
      id: 1,
      author: "Engineering Student Association",
      time: "15m ago",
      content: "Big news! The CBU Connect hackathon registration is now open. Let's see who the best developers are at Copperbelt University. 👨‍💻🔥",
      likes: 128,
      isLiked: false,
      comments: [
        { id: 101, user: "Phanciah", text: "Can't wait for this! " },
        { id: 102, user: "SBIT Official", text: "Register via the link in our bio." }
      ],
      image: null
    }
  ]);

  // --- INTERACTION HANDLERS ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  // Handler for creating a new story
  const handleCreateStory = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storyUrl = URL.createObjectURL(file);
      
      // Update "Your Story" to show it has an active ring color now!
      setStories(prevStories => 
        prevStories.map(story => 
          story.isMe 
            ? { ...story, color: "bg-gradient-to-tr from-green-400 via-[#003366] to-[#FFCC00]", image: storyUrl }
            : story
        )
      );
      alert("Story updated successfully!");
    }
  };

  const handlePost = () => {
    if (!postText.trim() && !selectedImage) return;

    const newZit = {
      id: Date.now(),
      author: "Jackson Nsonga",
      time: "Just now",
      content: postText.trim(),
      likes: 0,
      isLiked: false,
      comments: [],
      image: selectedImage
    };

    setZits((prevZits) => [newZit, ...prevZits]);
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
        
        {/* --- 1. STORIES SECTION --- */}
        <div className="bg-white border-b border-gray-100 py-4 mb-4 overflow-x-auto no-scrollbar flex gap-4 px-4">
          {/* Hidden input to handle the story picker mechanism */}
          <input 
            type="file" 
            ref={storyInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleCreateStory} 
          />

          {stories.map((story) => (
            <div key={story.id} className="group flex flex-col items-center shrink-0">
              <div 
                className="relative cursor-pointer"
                onClick={() => story.isMe && storyInputRef.current.click()} // Opens native device file layout
              >
                {/* Ring Fix from image_ea3029.png */}
                <div className={`p-[3px] rounded-full transition-transform duration-700 group-hover:rotate-180 ${
                  story.color || 'bg-gray-200'
                }`}>
                  <div className="w-[66px] h-[66px] rounded-full border-2 border-white overflow-hidden bg-gray-50 flex items-center justify-center shadow-inner">
                    {story.image ? (
                      <img src={story.image} alt={story.user} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-[#003366] drop-shadow-sm">
                        {story.user[0]}
                      </span>
                    )}
                  </div>
                </div>

                {story.isMe && (
                  <div className="absolute bottom-0 right-0 bg-[#003366] border-2 border-white rounded-full p-1 shadow-md group-hover:scale-110 transition-transform">
                    <Plus size={12} className="text-white" strokeWidth={4} />
                  </div>
                )}
              </div>
              
              <span className={`mt-1.5 text-[10px] font-black uppercase tracking-wider text-center w-16 truncate ${
                story.isMe ? 'text-gray-400' : 'text-[#003366]'
              }`}>
                {story.user}
              </span>
            </div>
          ))}
        </div>

        {/* --- 2. MAIN FEED CONTENT --- */}
        <div className="p-4 space-y-4">
          {/* INTERACTIVE QUICK POST BAR */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99] hover:border-gray-200 transition-all"
          >
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#003366] rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-sm">
                J
              </div>
              <div className="bg-gray-50 flex-grow rounded-full px-5 py-2.5 text-xs font-semibold text-gray-400">
                What's on your mind, Jackson?
              </div>
              <ImageIcon className="text-green-500 shrink-0" size={20} />
            </div>
          </div>

          {/* DYNAMIC FEED LIST */}
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

              {/* Interaction Row */}
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

      {/* --- BRANDED CREATE ZIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 p-1 hover:bg-gray-50 rounded-full transition-colors">
                <X size={24} />
              </button>
              <h3 className="font-black text-[#003366] italic text-lg">Post a Zit</h3>
              <button 
                onClick={handlePost}
                disabled={!postText.trim() && !selectedImage}
                className="bg-[#003366] text-white px-6 py-2 rounded-full font-black text-sm disabled:opacity-30 transition-all active:scale-95"
              >
                Zit
              </button>
            </div>

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
          <div className="bg-white w-full max-w-sm rounded-t-[1.5rem] h-[50vh] flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl border-x border-t border-gray-100">
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
    </Layout>
  );
};

export default Home;