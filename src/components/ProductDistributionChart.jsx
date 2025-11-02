import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ProductDistributionChart = ({ data }) => {
  const productSales = data.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = 0;
    }
    acc[item.product] += item.sales;
    return acc;
  }, {});

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  const chartData = Object.entries(productSales).map(([name, value], idx) => ({
    name,
    value,
    color: colors[idx % colors.length]
  }));

  const totalSales = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Distribusi Produk</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalSales}</p>
            <p className="text-xs text-gray-500">Total Unit</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.map((product, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }}></div>
            <span className="text-xs text-gray-600 truncate">{product.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDistributionChart;