import React, { useState, Suspense, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { IconMenu, Logo } from './components/Icons';

// Lazy Load Views for Performance Optimization
const ProjectsView = React.lazy(() => import('./components/ProjectsView'));
const ExpensesView = React.lazy(() => import('./components/ExpensesView'));
const SettingsView = React.lazy(() => import('./components/SettingsView'));
const CalendarView = React.lazy(() => import('./components/CalendarView'));
const DashboardView = React.lazy(() => import('./components/DashboardView'));
const CoursesView = React.lazy(() => import('./components/CoursesView'));
const ReportsView = React.lazy(() => import('./components/ReportsView'));
const CommunityView = React.lazy(() => import('./components/CommunityView'));

// Loading Component
const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[50vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-sikap-gray border-t-sikap-teal rounded-full animate-spin"></div>
      <p className="text-sikap-gray font-medium animate-pulse">Loading...</p>
    </div>
  </div>
);

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useAppContext();

  // Optimize tab switching with useCallback
  const handleTabSelect = useCallback((id) => {
    setActiveTab(id);
  }, []);

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
          onSelect={handleTabSelect} 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y h-full">
          <Suspense fallback={<PageLoader />}>
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'expenses' && <ExpensesView />}
            {activeTab === 'calendar' && <CalendarView />}
            {activeTab === 'reports' && <ReportsView />}
            {activeTab === 'courses' && <CoursesView />}
            {activeTab === 'community' && <CommunityView />}
            {activeTab === 'settings' && <SettingsView />}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;