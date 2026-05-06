import React from 'react';
import Layout from '../components/Layout';
import { Tag, Search, Filter } from 'lucide-react';

const Market = () => {
  const items = [
    { id: 1, title: 'Engineering Calculator', price: 'K250', school: 'SNat', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Bedspace - Eastside', price: 'K1,200', school: 'All', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Programming Textbook', price: 'K150', school: 'SBIT', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Gaming Laptop', price: 'K6,500', school: 'SBIT', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <Layout>
      <div className="p-4">
        <div className="flex gap-2 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              placeholder="Search CBU Market..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-[#003366] outline-none"
            />
          </div>
          <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-600">
            <Filter size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-300 text-xs italic">
                Product Image
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold text-[#003366] uppercase">{item.school}</p>
                <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-black text-gray-900">{item.price}</span>
                  <Tag size={14} className="text-[#FFCC00]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Market;