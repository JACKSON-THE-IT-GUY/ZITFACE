import React, { useState, useEffect, useRef } from 'react'; 
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

// --- EMBEDDED CAMPUS SEARCH BAR COMPONENT ---
const CampusSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], posts: [] });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        try {
          const res = await fetch(`/api/search?q=${query}`);
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        } catch (err) {
          console.error("Failed to fetch search results:", err);
        }
      } else {
        setResults({ users: [], posts: [] });
        setIsOpen(false);
      }
    }, 300); // 300ms Debounce prevents hammering the database

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Search Input Box */}
      <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-sm focus-within:bg-white focus-within:border-[#003366] transition-all">
        <span className="mr-2 text-gray-500">🔎</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search students, posts, or tags..."
          className="bg-transparent border-none outline-none w-full text-xs text-gray-700"
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-xs ml-2">✕</button>
        )}
      </div>

      {/* Dynamic Floating Results Dropdown Overlay */}
      {isOpen && (results.users.length > 0 || results.posts.length > 0) && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[380px] overflow-y-auto p-2">
          
          {/* Section: Users Found */}
          {results.users.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[10px] font-black tracking-wider text-gray-400 uppercase px-2 mb-1">Students</h4>
              {results.users.map((student) => (
                <div key={student._id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="h-7 w-7 rounded-full bg-[#003366] text-white font-bold flex items-center justify-center text-xs">
                    {student.username ? student.username[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-xs font-bold text-gray-800">{student.username}</div>
                </div>
              ))}
            </div>
          )}

          {/* Section: Posts Found */}
          {results.posts.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black tracking-wider text-gray-400 uppercase px-2 mb-1">Zits & Updates</h4>
              {results.posts.map((post) => (
                <div key={post._id} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                  <div className="text-[11px] font-medium text-gray-800 line-clamp-2">
                    {post.content || post.caption}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- MAIN HOME COMPONENT ---
const Home = () => {
  // Post & Loading States
  const [zits, setZits] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // --- FETCH LIVE TIMELINE ZITS ---
  const fetchZits = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('/api/zits', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setZits(data);
      } else {
        console.error("Failed to fetch timeline feed.");
      }
    } catch (error) {
      console.error("Network error fetching zits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZits();
  }, []);

  // --- INTERACTION HANDLERS ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file)); 
  };

  const handleCreateStory = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storyUrl = URL.createObjectURL(file);
      setStories(prevStories => 
        prevStories.map(story => 
          story.isMe 
            ? { ...story, color: "bg-gradient-to-tr from-green-400 via-[#003366] to-[#FFCC00]", image: storyUrl }
            : story
        )
      );
    }
  };

  // --- POST NEW ZIT TO MONGODB ---
  const handlePost = async () => {
    if (!postText.trim() && !selectedImage) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/zits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: postText.trim(),
          image: selectedImage || '' 
        })
      });

      if (response.ok) {
        const freshZit = await response.json();
        setZits((prevZits) => [freshZit, ...prevZits]); 
        setPostText("");
        setSelectedImage(null);
        setIsModalOpen(false);
      } else {
        alert("Could not post zit. Make sure you are authorized.");
      }
    } catch (error) {
      console.error("Post handler network failure:", error);
    }
  };

  const handleLike = async (id) => {
    setZits(zits.map(zit => {
      if (zit._id === id) {
        return {
          ...zit,
          likes: zit.isLiked ? (zit.likes || []).length - 1 : (zit.likes || []).length + 1,
          isLiked: !zit.isLiked
        };
      }
      return zit;
    }));
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    setZits(zits.map(zit => {
      if (zit._id === postId) {
        return {
          ...zit,
          comments: [...(zit.comments || []), { _id: Date.now(), user: { username: "You" }, text: newComment }]
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
        
        {/* --- STORIES SECTION --- */}
        <div className="bg-white border-b border-gray-100 py-4 mb-4 overflow-x-auto no-scrollbar flex gap-4 px-4">
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
                onClick={() => story.isMe && storyInputRef.current.click()}
              >
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

        {/* --- LIVE SEARCH MODULE --- */}
        <div className="px-4 mb-4">
          <CampusSearchBar />
        </div>

        {/* --- MAIN FEED CONTENT --- */}
        <div className="p-4 space-y-4">
          
          {/* QUICK POST BAR */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99] hover:border-gray-200 transition-all"
          >
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-[#003366] rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-sm">
                J
              </div>
              <div className="bg-gray-50 flex-grow rounded-full px-5 py-2.5 text-xs font-semibold text-gray-400">
                What's on your mind?
              </div>
              <ImageIcon className="text-green-500 shrink-0" size={20} />
            </div>
          </div>

          {/* DYNAMIC FEED LIST */}
          {loading ? (
            <div className="text-center py-10 text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              Loading Campus Feed...
            </div>
          ) : zits.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-gray-400 uppercase tracking-widest">
              No zits posted yet. Be the first!
            </div>
          ) : (
            zits.map((zit) => (
              <div key={zit._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center text-white font-bold">
                      {zit.user?.username ? zit.user.username[0].toUpperCase() : '?' }
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-gray-900">{zit.user?.username || "Anonymous Student"}</p>
                      <p className="text-[11px] text-gray-500">{new Date(zit.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>
                  <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
                </div>
                
                <div className="px-4 pb-3 text-[15px] text-gray-800 leading-relaxed">
                  {zit.content}
                </div>

                {/* 📸 FULL-FRAME CAPTURE: Renders photos fully without clipping */}
                {zit.image && (
                  <div className="mx-2 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                    <img 
                      src={zit.image} 
                      alt="post asset" 
                      className="w-full h-auto max-h-[500px] object-contain block mx-auto" 
                    />
                  </div>
                )}

                {/* Interaction Row */}
                <div className="px-4 py-3 flex gap-8 border-t border-gray-50 mt-2">
                  <button 
                    onClick={() => handleLike(zit._id)}
                    className={`flex items-center gap-2 text-xs font-bold transition-all ${zit.isLiked ? 'text-red-500 scale-105' : 'text-gray-600'}`}
                  >
                    <Heart size={20} fill={zit.isLiked ? "currentColor" : "none"} /> {(zit.likes || []).length}
                  </button>
                  
                  <button 
                    onClick={() => setActiveCommentPost(zit)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#003366]"
                  >
                    <MessageCircle size={20} /> {(zit.comments || []).length}
                  </button>
                  
                  <button onClick={() => handleShare(zit.content)} className="ml-auto text-gray-400">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
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
                className="bg-[#003366] text-white px-6 py-2 rounded-full font-black text-sm disabled:opacity-30 transition-all active:scale-95 hover:bg-[#002244]"
              >
                Post Zit
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
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full backdrop-blur-md z-10"
                  >
                    <X size={16} />
                  </button>
                  <img src={selectedImage} alt="preview" className="w-full h-auto max-h-60 object-contain mx-auto" />
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
                Comments ({(activeCommentPost.comments || []).length})
              </span>
              <button onClick={() => setActiveCommentPost(null)} className="p-1 hover:bg-gray-50 rounded-full">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-3 space-y-2.5">
              {(activeCommentPost.comments || []).length > 0 ? (
                activeCommentPost.comments.map(c => (
                  <div key={c._id} className="flex gap-2 items-start">
                    <div className="w-6 h-6 bg-[#003366] rounded-full flex-shrink-0 flex items-center justify-center text-[8px] text-white font-bold">
                      {c.user?.username ? c.user.username[0].toUpperCase() : 'U'}
                    </div>
                    <div className="bg-gray-50 px-3 py-1.5 rounded-2xl rounded-tl-none max-w-[90%] border border-gray-100">
                      <p className="text-[10px] font-black text-[#003366]">{c.user?.username || "Student"}</p>
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
                onClick={() => handleAddComment(activeCommentPost._id)}
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