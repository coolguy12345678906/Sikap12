import React, { useState } from 'react';
import { IconPlus, IconSearch, IconClose } from './Icons';
import { useAppContext } from '../contexts/AppContext';

const ExpensesView = () => {
  const { expenses, setExpenses, t } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: 'OPEX',
    description: ''
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    
    // Simple logic to alternate colors roughly
    const lastColor = expenses.length > 0 ? expenses[expenses.length - 1].color : 'orange';
    const newColor = lastColor === 'teal' ? 'orange' : 'teal';
    const today = new Date().toISOString().split('T')[0];

    const expense = {
      id: Date.now(),
      name: newExpense.name,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount) || 0,
      category: newExpense.category,
      date: today,
      color: newColor
    };

    setExpenses([...expenses, expense]);
    setIsAddModalOpen(false);
    setNewExpense({ name: '', amount: '', category: 'OPEX', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesFilter = filterCategory === 'ALL' || expense.category === filterCategory;
    const matchesSearch = expense.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFilterButtonStyle = (category) => {
    const isActive = filterCategory === category;
    
    if (!isActive) {
      return 'bg-white border-[3px] border-gray-200 hover:border-gray-300 text-gray-400';
    }

    switch (category) {
      case 'ALL':
        return 'bg-gray-400 text-white border-[3px] border-gray-400';
      case 'OPEX':
        return 'bg-sikap-orange text-white border-[3px] border-sikap-orange';
      case 'CAPEX':
        return 'bg-sikap-teal text-white border-[3px] border-sikap-teal';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col w-full h-full relative animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('exp_title')}</h1>
        <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg mb-6 font-medium">{t('exp_subtitle')}</p>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="
            flex items-center gap-2 px-6 py-3 md:py-2 rounded-full 
            border-[3px] border-sikap-teal 
            bg-white dark:bg-sikap-dark-surface text-sikap-teal font-bold 
            transition-all duration-200 ease-in-out
            hover:bg-sikap-teal hover:text-white
            active:bg-[#4daeb1] active:border-sikap-orange active:text-white
            w-full md:w-auto justify-center md:justify-start touch-manipulation
          "
        >
          <IconPlus className="w-5 h-5" />
          <span>{t('exp_add_btn')}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sikap-teal">
             <IconSearch className="w-5 h-5" />
          </div>
          {/* Search Bar */}
          <input 
            type="text"
            placeholder={t('exp_search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 md:py-2 rounded-full border-[3px] border-gray-200 bg-white dark:bg-sikap-dark-surface focus:border-sikap-teal focus:outline-none text-sikap-dark dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors text-base"
          />
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 touch-pan-x">
          {['ALL', 'OPEX', 'CAPEX'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap flex-1 lg:flex-none ${getFilterButtonStyle(cat)}`}
            >
              {cat === 'ALL' ? t('exp_all') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses List */}
      <div className="flex flex-col gap-4 pb-10">
        {filteredExpenses.map((expense) => (
          <div 
            key={expense.id}
            className="bg-white dark:bg-sikap-dark-surface border-[3px] border-[#dcefed] dark:border-gray-700 rounded-2xl p-0 flex flex-col sm:flex-row overflow-hidden relative min-h-[120px]"
          >
            {/* Color Bar */}
            <div className={`h-4 sm:h-auto w-full sm:w-[110px] flex-shrink-0 ${expense.color === 'teal' ? 'bg-sikap-teal' : 'bg-sikap-orange'}`}></div>
            
            {/* Content */}
            <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="w-full">
                <h2 className={`text-2xl font-bold ${expense.color === 'teal' ? 'text-sikap-teal' : 'text-sikap-orange'}`}>
                  {expense.name}
                </h2>
                <p className="text-gray-400 dark:text-gray-400 font-medium text-sm mt-1 line-clamp-2">{expense.description}</p>
                <p className="text-gray-400 dark:text-gray-500 font-medium text-xs mt-2">{expense.date}</p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                <span className="text-2xl md:text-3xl font-bold text-sikap-orange">
                  {formatCurrency(expense.amount)}
                </span>
                <span 
                  className={`
                    px-4 py-1 rounded-full text-white font-bold text-xs tracking-wider
                    ${expense.category === 'OPEX' ? 'bg-sikap-orange' : 'bg-sikap-teal'}
                  `}
                >
                  {expense.category}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredExpenses.length === 0 && (
           <div className="text-center py-10 text-gray-400 font-medium">
             {t('exp_no_found')}
           </div>
        )}
      </div>

      {/* ADD NEW EXPENSE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            
            {/* Modal Header (Teal background) */}
            <div className="p-6 flex justify-between items-start bg-sikap-teal">
              <div>
                <h2 className="text-2xl font-bold text-white">{t('exp_add_modal_title')}</h2>
                <p className="text-white/80 text-sm mt-1">{t('proj_fill_details')}</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full hover:bg-white/20 transition">
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddExpense} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('exp_name_label')}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter expense name"
                  value={newExpense.name}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('exp_amount_label')}</label>
                <input 
                  type="number" 
                  name="amount"
                  required
                  placeholder="Enter amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400"
                />
              </div>

              <div>
                 <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('exp_category_label')}</label>
                 <div className="relative">
                   <select 
                      name="category"
                      value={newExpense.category}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal appearance-none cursor-pointer"
                   >
                      <option value="OPEX">OPEX</option>
                      <option value="CAPEX">CAPEX</option>
                   </select>
                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                   </div>
                 </div>
              </div>

              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('exp_desc_label')}</label>
                <textarea 
                  name="description"
                  rows={3}
                  placeholder="Enter description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400 resize-none"
                />
              </div>

              <div className="flex gap-3 mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                <button 
                  type="submit"
                  className="flex-1 bg-sikap-teal text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition shadow-lg shadow-teal-100 dark:shadow-none touch-manipulation"
                >
                  {t('exp_submit')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition touch-manipulation"
                >
                  {t('proj_cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesView;