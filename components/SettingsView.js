import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const SettingsView = () => {
  const { theme, toggleTheme, language, setLanguage, t, projects, expenses } = useAppContext();

  const handleExport = () => {
    // Check if XLSX is available (loaded from CDN in index.html)
    const XLSX = window.XLSX;
    if (!XLSX) {
      alert("Export library not loaded. Please refresh.");
      return;
    }

    const wb = XLSX.utils.book_new();
    
    // Create Projects Sheet
    const projectsData = projects.map(p => ({
      ID: p.id,
      Name: p.name,
      Description: p.description,
      Status: p.status,
      'Budget Total': p.budgetTotal,
      'Budget Used': p.budgetUsed,
      'Start Date': p.startDate,
      'End Date': p.endDate
    }));
    const wsProjects = XLSX.utils.json_to_sheet(projectsData);
    XLSX.utils.book_append_sheet(wb, wsProjects, "Projects");

    // Create Expenses Sheet
    const expensesData = expenses.map(e => ({
      ID: e.id,
      Name: e.name,
      Description: e.description,
      Amount: e.amount,
      Category: e.category,
      Date: e.date
    }));
    const wsExpenses = XLSX.utils.json_to_sheet(expensesData);
    XLSX.utils.book_append_sheet(wb, wsExpenses, "Expenses");

    // Download
    XLSX.writeFile(wb, "SikapFundHub_Data.xlsx");
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('set_title')}</h1>
        <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg font-medium">{t('set_subtitle')}</p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        
        {/* Section 1: Appearance & Language */}
        <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-sikap-teal mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">{t('set_appearance')}</h2>
          
          <div className="flex flex-col gap-6">
            {/* Dark Mode Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-bold text-lg text-sikap-dark dark:text-gray-100">{t('set_dark_mode')}</h3>
                <p className="text-gray-400 dark:text-gray-400 text-sm">{t('set_dark_desc')}</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none flex-shrink-0
                  ${theme === 'dark' ? 'bg-sikap-teal' : 'bg-gray-300'}
                `}
              >
                <span className={`
                  inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                  ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-bold text-lg text-sikap-dark dark:text-gray-100">{t('set_language')}</h3>
                <p className="text-gray-400 dark:text-gray-400 text-sm">{t('set_lang_desc')}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                 <button 
                    onClick={() => setLanguage('en')}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-colors border-2 touch-manipulation ${language === 'en' ? 'border-sikap-teal text-sikap-teal bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-gray-600 text-gray-400 hover:border-gray-300'}`}
                 >
                   English
                 </button>
                 <button 
                    onClick={() => setLanguage('fil')}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-colors border-2 touch-manipulation ${language === 'fil' ? 'border-sikap-teal text-sikap-teal bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-gray-600 text-gray-400 hover:border-gray-300'}`}
                 >
                   Filipino
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Data Management (Export) */}
        <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-sikap-teal mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">{t('set_data_mgmt')}</h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h3 className="font-bold text-lg text-sikap-dark dark:text-gray-100">{t('set_export')}</h3>
              <p className="text-gray-400 dark:text-gray-400 text-sm">{t('set_export_desc')}</p>
            </div>
            <button 
              onClick={handleExport}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-2 rounded-full bg-sikap-teal text-white font-bold hover:bg-[#5bbec1] transition shadow-lg shadow-teal-100 dark:shadow-none touch-manipulation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              {t('set_export_btn')}
            </button>
          </div>
        </div>

        {/* Section 3: Account Management (Mock) */}
        <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-sikap-teal mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">{t('set_account')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="px-6 py-4 md:py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 font-bold text-sikap-dark dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left touch-manipulation">
               {t('set_change_pass')}
            </button>
            <button className="px-6 py-4 md:py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 font-bold text-sikap-dark dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left touch-manipulation">
               {t('set_change_acc')}
            </button>
            <button className="px-6 py-4 md:py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 font-bold text-sikap-dark dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left touch-manipulation">
               {t('set_reset_data')}
            </button>
            <button className="px-6 py-4 md:py-3 rounded-xl bg-red-500 border-2 border-red-500 font-bold text-white hover:bg-red-600 transition text-left touch-manipulation">
               {t('set_logout')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;