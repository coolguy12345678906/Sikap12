import React from 'react';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-white font-poppins text-sikap-dark">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area - Blank as requested */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="h-full w-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
           <p className="text-gray-400">Dashboard Content</p>
        </div>
      </main>
    </div>
  );
};

export default App;