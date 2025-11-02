import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const DateFilter = ({ onFilter }) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const [startDate, setStartDate] = useState(sevenDaysAgo.toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState(today.toISOString().substring(0, 10));
  const [activePreset, setActivePreset] = useState('week');

  const handlePreset = (preset) => {
    const end = new Date();
    let start = new Date();
    
    setActivePreset(preset);
    
    switch(preset) {
      case 'week':
        start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
        start = new Date('2025-10-01');
        break;
      default:
        return;
    }
    
    const startStr = start.toISOString().substring(0, 10);
    const endStr = end.toISOString().substring(0, 10);
    
    setStartDate(startStr);
    setEndDate(endStr);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    onFilter(start, end);
  };

  const handleCustomFilter = () => {
    setActivePreset('custom');
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    onFilter(start, end);
  };

  const presetButtons = [
    { id: 'week', label: '7 Hari Terakhir' },
    { id: 'month', label: '30 Hari Terakhir' },
    { id: 'all', label: 'Semua Data' }
  ];

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">Filter Periode</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {presetButtons.map(btn => (
          <button
            key={btn.id}
            onClick={() => handlePreset(btn.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              activePreset === btn.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <label className="text-xs text-gray-600 mb-1 block">Tanggal Mulai</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setActivePreset('custom');
            }}
          />
        </div>

        <div className="flex-1">
          <label className="text-xs text-gray-600 mb-1 block">Tanggal Akhir</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setActivePreset('custom');
            }}
          />
        </div>

        <button
          onClick={handleCustomFilter}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm sm:mt-5"
        >
          Terapkan
        </button>
      </div>
    </div>
  );
};

export default DateFilter;