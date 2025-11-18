import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 260 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Changed fontWeight from bold (700) to 900 for extra boldness */}
    <text x="0" y="65" fill="#f0b070" fontSize="80" fontWeight="900" letterSpacing="-2" style={{ fontFamily: 'Poppins' }}>si</text>
    <text x="65" y="65" fill="#6bced1" fontSize="80" fontWeight="900" letterSpacing="-2" style={{ fontFamily: 'Poppins' }}>kap</text>
    <text x="5" y="90" fill="#6bced1" fontSize="24" fontWeight="600" letterSpacing="8" style={{ fontFamily: 'Poppins' }}>fundhub</text>
  </svg>
);

// Dashboard Icon (House) - Orange in active state
export const IconDashboard: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
    <path d="M9 14H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Projects Icon (Folder)
export const IconProjects: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 6H12L10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z" />
  </svg>
);

// Expenses Icon (Wallet/Tag shape)
export const IconExpenses: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5ZM6 10C6 9.44772 6.44772 9 7 9H9C9.55228 9 10 9.44772 10 10C10 10.5523 9.55228 11 9 11H7C6.44772 11 6 10.5523 6 10ZM6 14C6 13.4477 6.44772 13 7 13H9C9.55228 13 10 13.4477 10 14C10 14.5523 9.55228 15 9 15H7C6.44772 15 6 14.5523 6 14Z" />
  </svg>
);

// Calendar Icon
export const IconCalendar: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/>
  </svg>
);

// Reports Icon (Pie Chart)
export const IconReports: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83V11H21.21C21.71 12.54 21.71 14.22 21.21 15.89Z" />
    <path d="M22 12A10 10 0 0 0 12 2V10H20C20 10.68 19.93 11.35 19.79 12H22Z" opacity="0.5" />
  </svg>
);

// Courses Icon (Stacked layers)
export const IconCourses: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// Community Icon (Megaphone)
export const IconCommunity: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 11V11C2 14.087 4.263 16.658 7.253 17.131L7.526 18.865C7.792 20.551 9.876 21.279 11.142 20.129V20.129C11.683 19.638 12 18.935 12 18.201V7.856C12 6.51 10.477 5.757 9.425 6.589L7.179 8.364C4.313 8.968 2 11 2 11Z" />
    <path d="M16 17C16 17 19 15.5 19 13C19 10.5 16 9 16 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M19 19C19 19 22 16.5 22 13C22 9.5 19 7 19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Settings Icon (Gear)
export const IconSettings: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M20 12C20 11.38 19.93 10.78 19.8 10.2L22 8L19 3L16.6 4.2C15.9 3.6 15.1 3.1 14.2 2.8L13.5 0H10.5L9.8 2.8C8.9 3.1 8.1 3.6 7.4 4.2L5 3L2 8L4.2 10.2C4.07 10.78 4 11.38 4 12C4 12.62 4.07 13.22 4.2 13.8L2 16L5 21L7.4 19.8C8.1 20.4 8.9 20.9 9.8 21.2L10.5 24H13.5L14.2 21.2C15.1 20.9 15.9 20.4 16.6 19.8L19 21L22 16L19.8 13.8C19.93 13.22 20 12.62 20 12ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z" />
  </svg>
);