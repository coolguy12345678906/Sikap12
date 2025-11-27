
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { IconUser, IconClose, IconCalendar } from './Icons';

// Mock type for Community Project since it differs slightly from internal Project
interface CommunityProject {
  id: number;
  title: string;
  sharedBy: string;
  status: 'In Progress' | 'Planned' | 'Completed';
  description: string;
  budget: string;
  progress: number;
  date: string;
  colorClass: string;
  iconColorClass: string;
}

const CommunityView: React.FC = () => {
  const { t } = useAppContext();
  const [selectedProject, setSelectedProject] = useState<CommunityProject | null>(null);

  const projects: CommunityProject[] = [
    {
      id: 1,
      title: "Barangay Hall Renovation",
      sharedBy: "Juan Dela Cruz",
      status: "In Progress",
      description: "Complete renovation of the main barangay hall building including electrical and plumbing upgrades to ensure safety and modernize the facility for better public service.",
      budget: "₱120,000 / ₱250,000",
      progress: 67.5,
      date: "1/10/2024",
      colorClass: "bg-blue-100 text-blue-700",
      iconColorClass: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Youth Development Program",
      sharedBy: "Maria Santos",
      status: "Planned",
      description: "Annual program for skills training and development of barangay youth, focusing on computer literacy, sportsmanship, and leadership workshops.",
      budget: "₱80,000 / ₱200,000",
      progress: 40,
      date: "1/8/2024",
      colorClass: "bg-gray-100 text-gray-700",
      iconColorClass: "bg-purple-100 text-purple-600"
    },
    {
      id: 3,
      title: "Street Improvement Project",
      sharedBy: "Pedro Garcia",
      status: "Completed",
      description: "Road repairs and installation of proper drainage system along Mabini Street to prevent flooding during the rainy season.",
      budget: "₱150,000 / ₱180,000",
      progress: 100,
      date: "1/2/2024",
      colorClass: "bg-green-100 text-green-700",
      iconColorClass: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('comm_title')}</h1>
        <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg font-medium">{t('comm_subtitle')}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 pb-10">
        
        {/* Main Feed: Shared Projects */}
        <div className="flex-1 flex flex-col gap-6">
           <h2 className="text-xl font-bold text-sikap-dark dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">{t('comm_shared_proj')}</h2>
           
           {projects.map((proj) => (
             <div key={proj.id} className="bg-white dark:bg-sikap-dark-surface border-[3px] border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${proj.iconColorClass.split(' ')[0]}`}>
                         <IconUser className={`w-6 h-6 ${proj.iconColorClass.split(' ')[1]}`} />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-sikap-dark dark:text-white">{proj.title}</h3>
                         <p className="text-xs text-gray-500">{t('comm_shared_by')} {proj.sharedBy}</p>
                      </div>
                   </div>
                   <span className={`px-3 py-1 text-xs font-bold rounded-full ${proj.colorClass}`}>{proj.status}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed line-clamp-2">
                   {proj.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                   <div>
                      <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Budget</span>
                      <span className="font-bold text-sikap-dark dark:text-white">{proj.budget}</span>
                   </div>
                   <div>
                      <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Progress</span>
                      <span className={`font-bold ${proj.progress === 100 ? 'text-green-600' : 'text-sikap-teal'}`}>{proj.progress}%</span>
                   </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                   <span className="text-xs text-gray-400 font-medium">{proj.date}</span>
                   <button 
                      onClick={() => setSelectedProject(proj)}
                      className="text-sikap-teal font-bold text-sm hover:underline"
                   >
                      {t('comm_view_details')}
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Sidebar: Updates & Stats */}
        <div className="w-full xl:w-96 flex flex-col gap-6">
           
           {/* Recent Updates */}
           <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-sikap-teal mb-4">{t('comm_recent_updates')}</h3>
              <div className="flex flex-col gap-4">
                 <div className="border-l-2 border-blue-200 pl-4 py-1">
                    <p className="text-sm font-medium text-sikap-dark dark:text-gray-200">
                       <span className="font-bold">Juan Dela Cruz</span> shared <span className="text-blue-500 font-bold">Barangay Hall Renovation</span> project
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">1/10/2024</span>
                 </div>
                 <div className="border-l-2 border-purple-200 pl-4 py-1">
                    <p className="text-sm font-medium text-sikap-dark dark:text-gray-200">
                       <span className="font-bold">Maria Santos</span> added new expense to <span className="text-purple-500 font-bold">Youth Development Program</span>
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">1/8/2024</span>
                 </div>
                 <div className="border-l-2 border-green-200 pl-4 py-1">
                    <p className="text-sm font-medium text-sikap-dark dark:text-gray-200">
                       <span className="font-bold">Pedro Garcia</span> completed <span className="text-green-500 font-bold">Street Improvement Project</span>
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">1/2/2024</span>
                 </div>
              </div>
           </div>

           {/* Community Stats */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
              <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{t('comm_stats_shared')}</h4>
                 <p className="text-4xl font-bold text-sikap-dark dark:text-white">3</p>
              </div>
              <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{t('comm_stats_contrib')}</h4>
                 <p className="text-4xl font-bold text-sikap-teal">3</p>
              </div>
              <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{t('comm_stats_budget')}</h4>
                 <p className="text-3xl font-bold text-sikap-orange">₱630,000</p>
              </div>
              <div className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
                 <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{t('comm_stats_completed')}</h4>
                 <p className="text-4xl font-bold text-green-500">1</p>
              </div>
           </div>
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            {/* Header */}
            <div className="p-6 md:p-8 bg-sikap-teal flex justify-between items-start">
               <div className="flex-1 pr-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 leading-tight">{selectedProject.title}</h2>
                  <p className="text-white/80 mt-2 flex items-center gap-2">
                     <IconUser className="w-4 h-4" />
                     Shared by {selectedProject.sharedBy}
                  </p>
               </div>
               <button 
                  onClick={() => setSelectedProject(null)} 
                  className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full hover:bg-white/20 transition flex-shrink-0"
               >
                 <IconClose className="w-6 h-6" />
               </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h4 className="text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div>
                   <h4 className="text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">Timeline</h4>
                   <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <IconCalendar className="w-5 h-5 text-sikap-orange" />
                      <span className="font-medium">Posted on {selectedProject.date}</span>
                   </div>
                </div>
                <div>
                   <h4 className="text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">Financials</h4>
                   <div className="text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between text-sm mb-1">
                         <span>Budget Usage:</span>
                         <span className="font-bold">{selectedProject.budget}</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Detailed Progress */}
              <div className="bg-gray-50 dark:bg-[#252525] rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                 <div className="flex justify-between items-end mb-2">
                    <div>
                       <h4 className="text-gray-900 dark:text-gray-100 font-bold text-lg">Project Progress</h4>
                    </div>
                    <span className={`text-3xl font-bold ${selectedProject.progress === 100 ? 'text-green-500' : 'text-sikap-teal'}`}>
                      {selectedProject.progress}%
                    </span>
                 </div>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${selectedProject.progress === 100 ? 'bg-green-500' : 'bg-sikap-teal'}`} 
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                 </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#252525] flex justify-end">
               <button 
                 onClick={() => setSelectedProject(null)}
                 className="w-full md:w-auto px-6 py-3 md:py-2 bg-white dark:bg-sikap-dark-surface border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
               >
                 Close Details
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityView;
