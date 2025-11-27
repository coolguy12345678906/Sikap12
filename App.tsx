
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectsView from './components/ProjectsView';
import ExpensesView from './components/ExpensesView';
import SettingsView from './components/SettingsView';
import CalendarView from './components/CalendarView';
import DashboardView from './components/DashboardView';
import CoursesView from './components/CoursesView';
import ReportsView from './components/ReportsView';
import CommunityView from './components/CommunityView';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { IconMenu, Logo } from './components/Icons';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, t } = useAppContext();

  return (
    // Apply 'dark' class to the wrapper based on theme context
    <div className={`${theme} flex min-h-[100dvh] overscroll-none`}>
      <div className="flex flex-col md:flex-row min-h-[100dvh] w-full bg-white dark:bg-sikap-dark-bg font-poppins text-sikap-dark dark:text-gray-100 transition-colors duration-300 overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-sikap-dark-surface border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 flex-shrink-0">
          <div className="w-[120px]">
             <Logo className="w-full h-auto" />
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-sikap-teal hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition active:scale-95"
          >
            <IconMenu className="w-8 h-8" />
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar 
          activeId={activeTab} 
          onSelect={setActiveTab} 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y h-full">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'expenses' && <ExpensesView />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'courses' && <CoursesView />}
          {activeTab === 'community' && <CommunityView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;