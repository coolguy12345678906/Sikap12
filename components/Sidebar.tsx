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
  IconSettings 
} from './Icons';

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
  { id: 'projects', label: 'Projects', icon: IconProjects },
  { id: 'expenses', label: 'Expenses', icon: IconExpenses },
  { id: 'calendar', label: 'Calendar', icon: IconCalendar },
  { id: 'reports', label: 'Reports', icon: IconReports },
  { id: 'courses', label: 'Courses', icon: IconCourses },
  { id: 'community', label: 'Community', icon: IconCommunity },
  { id: 'settings', label: 'Settings', icon: IconSettings },
];

const Sidebar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('dashboard');

  return (
    <aside 
      className="flex flex-col bg-white border-r-[3px] border-sikap-gray h-screen sticky top-0 overflow-y-auto overflow-x-hidden flex-shrink-0"
      style={{ width: '240px', padding: '35px 12px 81px 12px' }}
    >
      {/* Logo Section */}
      <div className="mb-10 w-full flex justify-center">
        {/* 
           Logo width increased by 25% from 156px to 195px
           Centered via flex parent
        */}
        <div className="w-[195px]">
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
              onClick={() => setActiveId(item.id)}
              className={`
                group flex items-center gap-[17px] text-left transition-all duration-200
                ${isActive 
                  ? 'border-[3px] border-sikap-teal rounded-[10px] py-[8px] px-[11px]' 
                  : 'border-[3px] border-transparent py-[2px] px-[14px] hover:bg-gray-50'
                }
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
              <span 
                className={`
                  font-poppins font-semibold text-[16px] leading-normal text-sikap-dark mt-[2px]
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;