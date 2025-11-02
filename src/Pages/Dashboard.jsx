import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, DollarSign, ShoppingCart, Package } from 'lucide-react';

import Sidebar from '../components/Sidebar';
import DateFilter from '../components/DateFilter';
import SalesChart from '../components/SalesChart';
import ProductSalesBarChart from '../components/ProductSoldChart'; 
import TopProducts from '../components/TopProducts';
import ProductDistributionChart from '../components/ProductDistributionChart';
import SalesTable from '../components/SalesTable';
import salesData from '../Data/salesData.json';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Home');
  const [filteredData, setFilteredData] = useState(salesData);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    handleFilter(sevenDaysAgo, today);
  }, []);

  const handleFilter = (startDate, endDate) => {
    console.log('Filtering from:', startDate, 'to:', endDate); 
    
    const filtered = salesData.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0); 
      
      return itemDate >= startDate && itemDate <= endDate;
    });
    
    console.log('Filtered results:', filtered.length, 'items'); 
    setFilteredData(filtered.length > 0 ? filtered : salesData);
  };

  const totalRevenue = filteredData.reduce((sum, item) => sum + item.total, 0);
  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} className="text-gray-600" />
            </button>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari produk, pesanan..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={18} className="text-gray-600" />
              </button>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">N</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">NovaTech</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
            <p className="text-gray-600 text-sm">Pantau performa penjualan produk NovaTech</p>
          </div>

          <div className="mb-6">
            <DateFilter onFilter={handleFilter} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <DollarSign size={24} />
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">+12%</span>
              </div>
              <p className="text-sm opacity-90 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart size={24} />
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">+8%</span>
              </div>
              <p className="text-sm opacity-90 mb-1">Total Unit Terjual</p>
              <p className="text-2xl font-bold">{totalSales.toLocaleString('id-ID')}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Package size={24} />
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">{filteredData.length}</span>
              </div>
              <p className="text-sm opacity-90 mb-1">Total Transaksi</p>
              <p className="text-2xl font-bold">{filteredData.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <SalesChart 
                data={filteredData} 
                totalRevenue={totalRevenue}
                formatCurrency={formatCurrency}
              />
            </div>

            <div className="lg:col-span-1">
              <TopProducts data={filteredData} formatCurrency={formatCurrency} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <ProductSalesBarChart data={filteredData} formatCurrency={formatCurrency} />
            </div>
            <div>
              <ProductDistributionChart data={filteredData} />
            </div>
          </div>

          <div className="mb-6">
            <SalesTable data={filteredData} formatCurrency={formatCurrency} />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">NovaTech</span> - Menampilkan {filteredData.length} data transaksi dari total {salesData.length} data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;