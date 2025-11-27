import React, { useState, useMemo } from 'react';
import { IconPlus, IconCalendar, IconClose } from './Icons';
import { useAppContext, Project } from '../contexts/AppContext';

const ProjectsView: React.FC = () => {
  const { projects, setProjects, t } = useAppContext();
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    budgetTotal: '',
    startDate: '',
    endDate: ''
  });

  // Computed Stats
  const totalBudget = useMemo(() => projects.reduce((acc, curr) => acc + curr.budgetTotal, 0), [projects]);
  const activeProjectsCount = useMemo(() => projects.filter(p => p.status === 'In Progress').length, [projects]);
  const completedProjectsCount = useMemo(() => projects.filter(p => p.status === 'Completed').length, [projects]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine color based on the last project
    const lastColor = projects.length > 0 ? projects[projects.length - 1].color : 'orange';
    const newColor = lastColor === 'teal' ? 'orange' : 'teal';

    const project: Project = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      status: 'In Progress',
      budgetUsed: 0,
      budgetTotal: parseFloat(newProject.budgetTotal) || 0,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      progress: 0,
      color: newColor
    };

    setProjects([...projects, project]);
    setIsAddModalOpen(false);
    setNewProject({ name: '', description: '', budgetTotal: '', startDate: '', endDate: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full h-full relative animate-in fade-in duration-500">
      {/* Left/Main Column */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('proj_title')}</h1>
          <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg mb-6 font-medium">{t('proj_subtitle')}</p>
          
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
            <span>{t('proj_new_btn')}</span>
          </button>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-6 pb-10">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`
                rounded-2xl p-5 md:p-7 text-white relative
                ${project.color === 'teal' ? 'bg-sikap-teal' : 'bg-sikap-orange'}
              `}
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                <h2 className="text-2xl md:text-3xl font-bold pr-4 leading-tight break-words w-full">{project.name}</h2>
                <div className="bg-white px-4 py-1 rounded-full flex-shrink-0 md:mt-1 self-start md:self-auto">
                  <span className="font-bold text-xs md:text-sm text-sikap-orange">
                    {project.status === 'In Progress' ? t('proj_status_progress') : t('proj_status_completed')}
                  </span>
                </div>
              </div>
              
              <p className="text-white/90 text-sm mb-6 max-w-xl leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-1 gap-y-4 mb-6">
                {/* Budget Bar */}
                <div>
                  <div className="flex justify-between text-xs md:text-sm font-bold mb-1">
                    <span>{t('proj_budget_used')}</span>
                    <span>{formatCurrency(project.budgetUsed)} / {formatCurrency(project.budgetTotal)}</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2.5">
                    <div 
                      className="bg-white h-2.5 rounded-full" 
                      style={{ width: `${(project.budgetUsed / project.budgetTotal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs opacity-90">{((project.budgetUsed / project.budgetTotal) * 100).toFixed(1)}% of budget used</div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs md:text-sm font-bold mb-1">
                    <span>{t('proj_progress')}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2.5">
                    <div 
                      className="bg-white h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-medium bg-white/10 md:bg-transparent px-3 py-1 md:px-0 rounded-lg md:rounded-none">
                  <IconCalendar className="w-5 h-5" />
                  <span>{project.endDate}</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className={`
                    w-full md:w-auto bg-white font-bold px-6 py-3 md:py-2 rounded-full text-sm 
                    transition-all duration-200 transform touch-manipulation
                    hover:scale-105 hover:shadow-lg active:scale-95
                    ${project.color === 'teal' ? 'text-sikap-teal' : 'text-sikap-orange'}
                  `}
                >
                  {t('proj_view_details')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column / Sidebar Widgets */}
      <div className="w-full xl:w-80 flex flex-col md:flex-row xl:flex-col gap-4 md:gap-6 flex-shrink-0">
        {/* Widget 1 */}
        <div className="bg-white dark:bg-sikap-dark-surface border-2 border-[#dcefed] dark:border-gray-700 rounded-2xl p-6 flex flex-col justify-center min-h-[120px]">
          <h3 className="text-sikap-teal font-bold text-lg">{t('stat_total_budget')}</h3>
          <p className="text-sikap-orange font-bold text-3xl md:text-4xl mt-2">{formatCurrency(totalBudget)}</p>
        </div>

        {/* Widget 2 */}
        <div className="bg-white dark:bg-sikap-dark-surface border-2 border-[#dcefed] dark:border-gray-700 rounded-2xl p-6 flex flex-col justify-center min-h-[120px]">
          <h3 className="text-sikap-teal font-bold text-lg">{t('stat_active_projects')}</h3>
          <p className="text-sikap-orange font-bold text-3xl md:text-4xl mt-2">{activeProjectsCount}</p>
        </div>

        {/* Widget 3 */}
        <div className="bg-white dark:bg-sikap-dark-surface border-2 border-[#dcefed] dark:border-gray-700 rounded-2xl p-6 flex flex-col justify-center min-h-[120px]">
          <h3 className="text-sikap-teal font-bold text-lg">{t('stat_completed_projects')}</h3>
          <p className="text-sikap-orange font-bold text-3xl md:text-4xl mt-2">{completedProjectsCount}</p>
        </div>
      </div>

      {/* ADD NEW PROJECT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            
            {/* Modal Header */}
            <div className="p-6 flex justify-between items-start bg-sikap-teal">
              <div>
                <h2 className="text-2xl font-bold text-white">{t('proj_add_modal_title')}</h2>
                <p className="text-white/80 text-sm mt-1">{t('proj_fill_details')}</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full hover:bg-white/20 transition">
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('proj_name_label')}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('proj_desc_label')}</label>
                <textarea 
                  name="description"
                  required
                  rows={3}
                  placeholder="Enter project description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('proj_budget_label')}</label>
                <input 
                  type="number" 
                  name="budgetTotal"
                  required
                  placeholder="Enter budget amount"
                  value={newProject.budgetTotal}
                  onChange={handleInputChange}
                  className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('proj_start_label')}</label>
                  <input 
                    type="date" 
                    name="startDate"
                    required
                    value={newProject.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal text-gray-500 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('proj_end_label')}</label>
                  <input 
                    type="date" 
                    name="endDate"
                    required
                    value={newProject.endDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal text-gray-500 dark:text-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                <button 
                  type="submit"
                  className="flex-1 bg-sikap-teal text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition shadow-lg shadow-teal-100 dark:shadow-none touch-manipulation"
                >
                  {t('proj_add_submit')}
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

      {/* VIEW DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            {/* Header */}
            <div className={`p-6 md:p-8 flex justify-between items-start ${selectedProject.color === 'teal' ? 'bg-sikap-teal' : 'bg-sikap-orange'}`}>
               <div className="flex-1 pr-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                    {selectedProject.status === 'In Progress' ? t('proj_status_progress') : t('proj_status_completed')}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 leading-tight">{selectedProject.name}</h2>
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
                <h4 className="text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('proj_desc_label')}</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div>
                   <h4 className="text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">Timeline</h4>
                   <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <IconCalendar className="w-5 h-5 text-sikap-orange" />
                      <span className="font-medium">{selectedProject.startDate} — {selectedProject.endDate}</span>
                   </div>
                </div>
                <div>
                   <h4 className="text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">Financials</h4>
                   <div className="text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between text-sm mb-1">
                         <span>Total Budget:</span>
                         <span className="font-bold">{formatCurrency(selectedProject.budgetTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span>Remaining:</span>
                         <span className="font-bold text-sikap-teal">{formatCurrency(selectedProject.budgetTotal - selectedProject.budgetUsed)}</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Detailed Progress */}
              <div className="bg-gray-50 dark:bg-[#252525] rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                 <div className="flex justify-between items-end mb-2">
                    <div>
                       <h4 className="text-gray-900 dark:text-gray-100 font-bold text-lg">Project Progress</h4>
                       <span className="text-sm text-gray-500 dark:text-gray-400">Based on milestones completed</span>
                    </div>
                    <span className={`text-3xl font-bold ${selectedProject.color === 'teal' ? 'text-sikap-teal' : 'text-sikap-orange'}`}>
                      {selectedProject.progress}%
                    </span>
                 </div>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${selectedProject.color === 'teal' ? 'bg-sikap-teal' : 'bg-sikap-orange'}`} 
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                 </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#252525] flex justify-end">
               <button 
                 onClick={() => setSelectedProject(null)}
                 className="w-full md:w-auto px-6 py-3 md:py-2 bg-white dark:bg-sikap-dark-surface border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition touch-manipulation"
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectsView;