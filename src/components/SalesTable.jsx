import React, { useState } from 'react';

const SalesTable = ({ data, formatCurrency }) => {
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Detail Data Penjualan</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {[
                { key: "date", label: "Tanggal" },
                { key: "product", label: "Produk" },
                { key: "sales", label: "Unit Terjual" },
                { key: "total", label: "Total Revenue" }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="text-left py-3 px-2 md:px-4 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {sortConfig.key === key && (
                      <span className="text-blue-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                  {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0 ${
                      item.product.includes('Laptop') ? 'bg-blue-500' : 
                      item.product.includes('Pad') ? 'bg-red-500' : 
                      item.product.includes('Phone') ? 'bg-emerald-500' : 
                      item.product.includes('Book') ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="text-xs md:text-sm font-medium text-gray-900">{item.product}</span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                  {item.sales} unit
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap">
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;