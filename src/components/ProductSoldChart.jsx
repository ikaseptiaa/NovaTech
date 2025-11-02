import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProductSalesBarChart = ({ data, formatCurrency }) => {
  const productTotals = data.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = { product: item.product, total: 0, sales: 0 };
    }
    acc[item.product].total += item.total;
    acc[item.product].sales += item.sales;
    return acc;
  }, {});

  const chartData = Object.values(productTotals).sort((a, b) => b.total - a.total);

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Penjualan per Produk</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="product" 
            stroke="#9ca3af" 
            style={{ fontSize: '10px' }}
            angle={-20}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#9ca3af" 
            style={{ fontSize: '11px' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value, name) => {
              if (name === 'total') return [formatCurrency(value), 'Total Revenue'];
              return [value, 'Unit Terjual'];
            }}
          />
          <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSalesBarChart;