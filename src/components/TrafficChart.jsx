import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficChart = () => {
  const trafficData = [
    { age: '65+', male: 20, female: 30 },
    { age: '60+', male: 30, female: 35 },
    { age: '55+', male: 35, female: 40 },
    { age: '50+', male: 45, female: 50 },
    { age: '45+', male: 50, female: 55 },
    { age: '40+', male: 55, female: 60 },
    { age: '35+', male: 60, female: 65 },
    { age: '30+', male: 65, female: 70 },
    { age: '25+', male: 55, female: 60 },
    { age: '20+', male: 50, female: 55 },
    { age: '15+', male: 40, female: 45 },
    { age: '10+', male: 30, female: 35 },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Traffic</h3>
        <select className="text-xs border border-gray-300 rounded px-2 py-1">
          <option>All time</option>
          <option>This month</option>
          <option>This week</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={trafficData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="age" 
            stroke="#9ca3af" 
            style={{ fontSize: '9px' }}
            width={25}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              fontSize: '11px'
            }}
          />
          <Bar dataKey="male" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={5} />
          <Bar dataKey="female" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={5} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-3 md:gap-4 mt-3 md:mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Female</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Male</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficChart;