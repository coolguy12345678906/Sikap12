import React, { useState } from 'react';
import { 
  Logo, 
  IconDashboard, 
  IconProjects, 
  IconExpenses, 
  IconCalendar, 
  IconReports, 
  IconCourses, 
  IconCommunity, 
  IconSettings,
  IconChevronLeft,
  IconChevronRight
} from './Icons';
import { useAppContext } from '../contexts/AppContext';

interface NavItem {
  id: string;
  labelKey: string;
  icon: React.FC<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'dashboard', labelKey: 'nav_dashboard', icon: IconDashboard },
  { id: 'projects', labelKey: 'nav_projects', icon: IconProjects },
  { id: 'expenses', labelKey: 'nav_expenses', icon: IconExpenses },
  { id: 'calendar', labelKey: 'nav_calendar', icon: IconCalendar },
  { id: 'reports', labelKey: 'nav_reports', icon: IconReports },
  { id: 'courses', labelKey: 'nav_courses', icon: IconCourses },
  { id: 'community', labelKey: 'nav_community', icon: IconCommunity },
  { id: 'settings', labelKey: 'nav_settings', icon: IconSettings },
];

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect, isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useAppContext();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          flex flex-col bg-white dark:bg-sikap-dark-surface border-r-[3px] border-sikap-gray dark:border-gray-600 h-screen
          fixed top-0 left-0 z-40 md:sticky md:z-auto
          overflow-y-auto overflow-x-hidden flex-shrink-0 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-[100px]' : 'md:w-[280px]'}
          w-[280px]
        `}
        style={{ padding: isCollapsed ? '35px 12px' : '35px 12px 81px 12px' }}
      >
        {/* Collapse Toggle Button (Desktop Only) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block absolute top-4 right-3 z-20 bg-white dark:bg-sikap-dark-surface border-[3px] border-sikap-gray dark:border-gray-500 rounded-full p-1 text-sikap-gray dark:text-gray-400 hover:text-sikap-teal hover:border-sikap-teal dark:hover:border-sikap-teal transition-colors shadow-sm"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <IconChevronRight className="w-4 h-4" /> : <IconChevronLeft className="w-4 h-4" />}
        </button>

        {/* Logo Section */}
        <div className={`mb-10 w-full flex justify-center transition-all duration-300 ${isCollapsed ? 'mt-8' : ''}`}>
          {/* 
             Logo: Scale down significantly when collapsed
          */}
          <div className={`transition-all duration-300 ${isCollapsed ? 'w-[60px] hidden md:block' : 'w-[195px]'}`}>
            <Logo className="w-full h-auto" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-5">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  onClose(); // Close sidebar on mobile selection
                }}
                title={isCollapsed ? t(item.labelKey as any) : ''}
                className={`
                  group flex items-center text-left transition-all duration-200 touch-manipulation
                  ${isActive 
                    ? 'border-[3px] border-sikap-teal rounded-[10px] py-[8px] px-[11px] dark:bg-sikap-dark-bg' 
                    : 'border-[3px] border-transparent py-[2px] px-[14px] hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                  ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-[17px]'}
                `}
              >
                <div className="flex-shrink-0 w-[26px] flex items-center justify-center">
                  <item.icon 
                    className={`
                      w-full h-full transition-colors
                      ${isActive ? 'text-sikap-orange' : 'text-sikap-teal'}
                    `} 
                  />
                </div>
                {/* Hide text when collapsed */}
                <span 
                  className={`
                    font-poppins font-semibold text-[16px] leading-normal mt-[2px] whitespace-nowrap overflow-hidden transition-all duration-200
                    ${isActive ? 'text-sikap-dark dark:text-white' : 'text-sikap-dark dark:text-gray-300'}
                    ${isCollapsed ? 'md:w-0 md:opacity-0 md:ml-0' : 'w-auto opacity-100'}
                  `}
                >
                  {t(item.labelKey as any)}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;