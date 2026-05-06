import React from 'react';
import Layout from '../components/Layout';
import { Users, Search, Plus } from 'lucide-react';

const Groups = () => {
  const cbuGroups = [
    { id: 1, name: "SBIT Developers", members: "1.2k", category: "Academic" },
    { id: 2, name: "CBU Football Fans", members: "850", category: "Sports" },
    { id: 3, name: "Engineering Society", members: "2.1k", category: "Academic" },
    { id: 4, name: "Kitwe Campus Vibes", members: "5k", category: "Social" }
  ];

  return (
    <Layout>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Groups</h2>
          <button className="bg-[#003366] text-white p-2 rounded-full">
            <Plus size={20} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            placeholder="Find a group..." 
            className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-[#003366] outline-none"
          />
        </div>

        <div className="space-y-3">
          {cbuGroups.map(group => (
            <div key={group.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[#003366]">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{group.name}</h3>
                  <p className="text-xs text-gray-500">{group.members} members • {group.category}</p>
                </div>
              </div>
              <button className="bg-gray-100 text-[#003366] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#003366] hover:text-white transition-all">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Groups;