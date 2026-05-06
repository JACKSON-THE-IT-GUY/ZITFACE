import React from 'react';
import Layout from '../components/Layout';
import { Settings, MapPin, Calendar, BookOpen, Grid, List } from 'lucide-react';

const Profile = () => {
  // Static user data based on your profile
  const user = {
    name: "Jackson Nsonga",
    major: "Computer Science",
    campus: "Copperbelt University (CBU)",
    bio: "Web Developer | Cybersecurity Enthusiast | Building ZITFACE for the CBU community. ",
    stats: { zits: 12, followers: "1.2k", following: 450 }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen pb-20">
        {/* --- HEADER / COVER PHOTO --- */}
        <div className="h-32 bg-[#003366] relative">
          {/* Profile Picture Overlap */}
          <div className="absolute -bottom-12 left-4">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-[#FFCC00] flex items-center justify-center text-[#003366] text-3xl font-black shadow-md">
              {user.name[0]}
            </div>
          </div>
          <button className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
            <Settings size={20} />
          </button>
        </div>

        {/* --- PROFILE INFO --- */}
        <div className="mt-14 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black text-gray-900">{user.name}</h2>
              <p className="text-sm font-bold text-[#003366]">{user.major}</p>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold transition-all">
              Edit Profile
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {user.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-gray-500">
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <MapPin size={14} className="text-[#003366]" /> Kitwe, Zambia
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <BookOpen size={14} className="text-[#003366]" /> {user.campus}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <Calendar size={14} className="text-[#003366]" /> Joined Oct 2025
            </div>
          </div>

          {/* --- STATS --- */}
          <div className="mt-6 flex gap-6 border-y border-gray-50 py-4">
            <div className="text-center">
              <p className="text-sm font-black text-gray-900">{user.stats.zits}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Zits</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-gray-900">{user.stats.followers}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-gray-900">{user.stats.following}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Following</p>
            </div>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex mt-2 border-b border-gray-100">
          <button className="flex-grow py-3 flex justify-center border-b-2 border-[#003366] text-[#003366]">
            <Grid size={20} />
          </button>
          <button className="flex-grow py-3 flex justify-center text-gray-300">
            <List size={20} />
          </button>
        </div>

        {/* --- USER'S POSTS GRID (Placeholder) --- */}
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <div key={post} className="aspect-square bg-gray-100 flex items-center justify-center text-gray-300 italic text-[10px]">
              Post {post}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;