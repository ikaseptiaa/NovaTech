import React from 'react';

const TopProducts = ({ data, formatCurrency }) => {
  // Aggregate and get top 4 products
  const productTotals = data.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = { name: item.product, total: 0, sold: 0 };
    }
    acc[item.product].total += item.total;
    acc[item.product].sold += item.sales;
    return acc;
  }, {});

  const topProducts = Object.values(productTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, 4)
    .map((p, idx) => ({
      ...p,
      color: ['bg-blue-100', 'bg-red-100', 'bg-emerald-100', 'bg-purple-100'][idx]
    }));

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Produk Terlaris</h3>
      <div className="space-y-3 md:space-y-4">
        {topProducts.map((product, idx) => (
          <div key={idx} className="flex items-center gap-2 md:gap-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex-shrink-0 ${product.color}`}></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs md:text-sm truncate">{product.name}</p>
              <p className="text-xs text-gray-500">{product.sold} terjual</p>
            </div>
            <p className="font-semibold text-gray-900 text-xs md:text-sm whitespace-nowrap">
              {formatCurrency(product.total)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;