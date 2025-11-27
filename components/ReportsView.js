import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { IconDownload } from './Icons';

const ReportsView = () => {
  const { t } = useAppContext();

  const handleExport = () => {
      // Check if XLSX is available (loaded from CDN in index.html)
      const XLSX = window.XLSX;
      if (!XLSX) {
        alert("Export library not loaded. Please refresh.");
        return;
      }
      
      // Mock data for export based on the reports view data
      const wb = XLSX.utils.book_new();
      const stats = [
          { Metric: "Total Consumed", Value: 466000 },
          { Metric: "Budget Remaining", Value: 134000 },
          { Metric: "Avg Monthly", Value: 95000 },
          { Metric: "Project Success Rate", Value: "54.5%" }
      ];
      const ws = XLSX.utils.json_to_sheet(stats);
      XLSX.utils.book_append_sheet(wb, ws, "Overview");
      XLSX.writeFile(wb, "Reports_Analysis.xlsx");
  };

  // Mock Data for Monthly Trends
  const monthlyData = [
    { month: 'Jan', value: 45000, height: 40 },
    { month: 'Feb', value: 62000, height: 65 },
    { month: 'Mar', value: 38000, height: 35 },
    { month: 'Apr', value: 85000, height: 80 },
    { month: 'May', value: 55000, height: 55 },
    { month: 'Jun', value: 72000, height: 70 }
  ];

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('rep_title')}</h1>
          <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg font-medium">{t('rep_subtitle')}</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-sikap-dark dark:bg-gray-700 text-white font-bold hover:bg-gray-700 dark:hover:bg-gray-600 transition touch-manipulation"
        >
          <IconDownload className="w-5 h-5" />
          <span>{t('rep_export')}</span>
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: t('rep_total_consumed'), value: '₱466,000', sub: '77.7% ' + t('rep_avail_budget'), color: 'text-sikap-teal' },
          { label: t('rep_budget_rem'), value: '₱134,000', sub: '22.3% ' + t('rep_rem_text'), color: 'text-sikap-orange' },
          { label: t('rep_avg_monthly'), value: '₱95,000', sub: t('rep_avg_desc'), color: 'text-sikap-dark dark:text-white' },
          { label: t('rep_proj_success'), value: '54.5%', sub: t('rep_proj_desc'), color: 'text-green-500' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
             <h3 className="text-gray-400 font-bold text-sm uppercase mb-2">{kpi.label}</h3>
             <p className={`text-3xl font-bold mb-2 ${kpi.color}`}>{kpi.value}</p>
             <p className="text-xs text-gray-400 font-medium">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
         {/* Monthly Trends (Bar Chart Simulation) */}
         <div className="xl:col-span-2 bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sikap-dark dark:text-white">{t('rep_monthly_trends')}</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span className="w-3 h-3 rounded-full bg-sikap-teal"></span> Expenses
                </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2 pt-8">
               {monthlyData.map((data, i) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                       {/* Tooltip */}
                       <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-sikap-dark text-white text-xs font-bold px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-10 mb-1">
                          ₱{data.value.toLocaleString()}
                       </div>
                       
                       {/* Bar Container */}
                       <div className="w-full max-w-[60px] bg-gray-100 dark:bg-gray-800 rounded-t-lg relative h-full flex items-end overflow-hidden">
                          <div 
                            className="w-full bg-sikap-teal opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out rounded-t-sm" 
                            style={{ height: `${data.height}%` }}
                          ></div>
                       </div>
                       <span className="text-xs font-bold text-gray-400">{data.month}</span>
                    </div>
               ))}
            </div>
         </div>

         {/* CAPEX vs OPEX & Savings */}
         <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex-1">
               <h3 className="text-lg font-bold text-sikap-dark dark:text-white mb-4">CAPEX vs OPEX</h3>
               <div className="flex flex-col gap-4">
                  <div>
                     <div className="flex justify-between text-sm font-bold mb-1">
                        <span className="text-sikap-teal">CAPEX</span>
                        <span className="text-gray-500">79.0%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-sikap-teal h-2 rounded-full" style={{ width: '79%' }}></div>
                     </div>
                     <p className="text-xs text-gray-400 mt-1">₱368,000 {t('rep_total_exp')}</p>
                  </div>
                  <div>
                     <div className="flex justify-between text-sm font-bold mb-1">
                        <span className="text-sikap-orange">OPEX</span>
                        <span className="text-gray-500">21.0%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-sikap-orange h-2 rounded-full" style={{ width: '21%' }}></div>
                     </div>
                     <p className="text-xs text-gray-400 mt-1">₱98,000 {t('rep_total_exp')}</p>
                  </div>
               </div>
            </div>

            <div className="bg-sikap-teal rounded-3xl p-6 shadow-lg text-white">
               <h3 className="text-lg font-bold mb-1">{t('rep_proj_savings')}</h3>
               <p className="text-xs opacity-80 mb-4">{t('rep_exp_savings')}</p>
               <p className="text-4xl font-bold">₱-540,000</p>
            </div>
         </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
         {/* Expense Categories */}
         <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-sikap-dark dark:text-white mb-6">{t('rep_exp_categories')}</h3>
            <div className="space-y-4">
               {[
                 { name: t('rep_cat_infra'), val: '₱185,000', pct: '39.7%', w: '40%' },
                 { name: t('rep_cat_health'), val: '₱98,000', pct: '21%', w: '21%' },
                 { name: t('rep_cat_edu'), val: '₱76,000', pct: '16.3%', w: '16%' },
                 { name: t('rep_cat_public'), val: '₱65,000', pct: '13.9%', w: '14%' },
                 { name: t('rep_cat_admin'), val: '₱42,000', pct: '9%', w: '9%' },
               ].map((cat, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-32 font-bold text-sm text-gray-600 dark:text-gray-300">{cat.name}</div>
                    <div className="flex-1">
                       <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-sikap-teal h-2.5 rounded-full" style={{ width: cat.w }}></div>
                       </div>
                    </div>
                    <div className="text-right w-24">
                       <div className="font-bold text-sm text-sikap-dark dark:text-white">{cat.val}</div>
                       <div className="text-xs text-gray-400">{cat.pct}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Project Status Overview Table */}
         <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-sikap-dark dark:text-white">{t('rep_proj_status')}</h3>
               <div className="flex gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">12 Completed</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">8 In Progress</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">2 Overdue</span>
               </div>
            </div>
            
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">{t('rep_active_proj')}</h4>
            <div className="flex flex-col gap-4 flex-1">
               {[
                 { name: "Community Center Renovation", status: "In Progress", budget: "₱500,000", color: "text-blue-500", bg: "bg-blue-100" },
                 { name: "Street Lighting Project", status: "Planned", budget: "₱200,000", color: "text-gray-500", bg: "bg-gray-100" },
                 { name: "Health Center Upgrade", status: "Completed", budget: "₱300,000", color: "text-green-500", bg: "bg-green-100" },
               ].map((proj, i) => (
                 <div key={i} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-4 last:border-0">
                    <div>
                       <div className="font-bold text-sikap-dark dark:text-white mb-1">{proj.name}</div>
                       <span className={`text-xs font-bold px-2 py-0.5 rounded ${proj.bg} ${proj.color}`}>{proj.status}</span>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-sikap-dark dark:text-white">{proj.budget}</div>
                       <div className="text-xs text-gray-400">Budget</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ReportsView;