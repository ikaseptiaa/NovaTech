import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data, totalRevenue, formatCurrency }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const existingDate = acc.find(d => d.date === item.date);
    if (existingDate) {
      existingDate.total += item.total;
    } else {
      acc.push({ date: item.date, total: item.total });
    }
    return acc;
  }, []);

  const sortedData = aggregatedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h3 className="text-gray-500 text-xs md:text-sm font-medium mb-1">Total Revenue</h3>
          <div className="flex items-baseline gap-2 md:gap-3">
            <span className="text-xl md:text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</span>
            <span className="text-emerald-600 text-xs md:text-sm font-semibold bg-emerald-100 px-2 py-1 rounded">
              ▲ 8.55%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Periode yang dipilih</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            style={{ fontSize: '10px' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis 
            stroke="#9ca3af" 
            style={{ fontSize: '10px' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: 'none', 
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px'
            }}
            formatter={(value) => [formatCurrency(value), 'Revenue']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            }}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;