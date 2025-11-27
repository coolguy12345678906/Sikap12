import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const DashboardView = () => {
  const { t, projects, expenses } = useAppContext();

  // Mock data as per prompt requirements for the Dashboard tab specific view
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('dash_title')}</h1>
        <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg font-medium">{t('dash_subtitle')}</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Column 1: CAPEX & OPEX Stats */}
        <div className="flex flex-col gap-6">
          {/* CAPEX Card */}
          <div className="bg-white dark:bg-sikap-dark-surface border-[3px] border-sikap-teal rounded-3xl p-6 shadow-sm">
            <h3 className="text-sikap-teal font-bold text-xl mb-4">CAPEX</h3>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold text-sikap-dark dark:text-white">₱120,000</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 font-bold text-sm mb-4">/ ₱500,000</div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div className="bg-sikap-teal h-3 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-sikap-teal">24.0% {t('dash_used')}</span>
              <span className="text-gray-400">₱380,000 {t('dash_remaining_sm')}</span>
            </div>
          </div>

          {/* OPEX Card */}
          <div className="bg-white dark:bg-sikap-dark-surface border-[3px] border-sikap-orange rounded-3xl p-6 shadow-sm">
            <h3 className="text-sikap-orange font-bold text-xl mb-4">OPEX</h3>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold text-sikap-dark dark:text-white">₱45,000</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 font-bold text-sm mb-4">/ ₱200,000</div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div className="bg-sikap-orange h-3 rounded-full" style={{ width: '22.5%' }}></div>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-sikap-orange">22.5% {t('dash_used')}</span>
              <span className="text-gray-400">₱155,000 {t('dash_remaining_sm')}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Total Summary */}
        <div className="flex flex-col gap-6">
           <div className="bg-white dark:bg-sikap-dark-surface border-[3px] border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
              <h3 className="text-gray-400 font-bold text-lg mb-2">{t('dash_total_expenses')}</h3>
              <p className="text-5xl font-bold text-sikap-dark dark:text-white mb-6">₱165,000</p>
              
              <h3 className="text-gray-400 font-bold text-lg mb-2">{t('dash_remaining')}</h3>
              <p className="text-5xl font-bold text-sikap-teal">₱535,000</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                 <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
                    <span className="block text-gray-400 font-bold text-sm uppercase">{t('dash_projects')}</span>
                    <span className="block text-3xl font-bold text-sikap-orange mt-1">3</span>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
                    <span className="block text-gray-400 font-bold text-sm uppercase">{t('dash_transactions')}</span>
                    <span className="block text-3xl font-bold text-sikap-teal mt-1">5</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Column 3: Recent Activity Lists */}
        <div className="flex flex-col gap-6">
           {/* Recent Expenses List */}
           <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex-1">
              <h3 className="text-xl font-bold text-sikap-dark dark:text-white mb-4">{t('dash_recent_expenses')}</h3>
              <div className="flex flex-col gap-4">
                 {expenses.slice(0, 5).map(expense => (
                    <div key={expense.id} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                       <div>
                          <p className="font-bold text-sikap-dark dark:text-gray-200 text-sm">{expense.name}</p>
                          <p className="text-xs text-gray-400">{expense.date}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-bold text-sikap-orange text-sm">{formatCurrency(expense.amount)}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${expense.category === 'CAPEX' ? 'bg-teal-100 text-sikap-teal' : 'bg-orange-100 text-sikap-orange'}`}>
                             {expense.category}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Active Projects List */}
           <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex-1">
              <h3 className="text-xl font-bold text-sikap-dark dark:text-white mb-4">{t('dash_active_projects')}</h3>
              <div className="flex flex-col gap-4">
                 {/* Manually mapping specifically for the visual requested in prompt */}
                 <div className="flex flex-col border-b border-gray-50 dark:border-gray-800 pb-3">
                    <div className="flex justify-between mb-1">
                       <span className="font-bold text-sm text-sikap-dark dark:text-gray-200">Barangay Hall Renovation</span>
                       <span className="font-bold text-xs text-sikap-teal">Active</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                       <span>65% {t('proj_complete_percent')}</span>
                       <span>₱250,000</span>
                    </div>
                 </div>
                 <div className="flex flex-col border-b border-gray-50 dark:border-gray-800 pb-3">
                    <div className="flex justify-between mb-1">
                       <span className="font-bold text-sm text-sikap-dark dark:text-gray-200">Street Lighting Project</span>
                       <span className="font-bold text-xs text-sikap-orange">Active</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                       <span>25% {t('proj_complete_percent')}</span>
                       <span>₱180,000</span>
                    </div>
                 </div>
                 <div className="flex flex-col pb-0">
                    <div className="flex justify-between mb-1">
                       <span className="font-bold text-sm text-sikap-dark dark:text-gray-200">Health Center Equipment</span>
                       <span className="font-bold text-xs text-gray-400">{t('proj_status_completed')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                       <span>100% {t('proj_complete_percent')}</span>
                       <span>₱150,000</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardView;