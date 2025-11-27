import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { IconPlus, IconBook, IconClose, IconClock, IconUsers } from './Icons';

const CoursesView = () => {
  const { t, courses, setCourses } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    level: 'Beginner',
    duration: '',
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    const course = {
      id: Date.now(),
      title: newCourse.title,
      description: newCourse.description,
      level: newCourse.level,
      duration: parseFloat(newCourse.duration) || 1,
      students: 0,
      content: `# ${newCourse.title}\n\n## Introduction\nWelcome to this course on ${newCourse.title}. This course is designed to help you understand the fundamentals of this topic.\n\n## Course Objectives\n- Understand key concepts.\n- Apply knowledge to real-world scenarios.\n\n## Content\n(AI Generated content would appear here based on the description: ${newCourse.description})`
    };
    setCourses([...courses, course]);
    setIsAddModalOpen(false);
    setNewCourse({ title: '', description: '', level: 'Beginner', duration: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <h1 className="text-4xl md:text-5xl font-bold text-sikap-teal mb-2">{t('cour_title')}</h1>
             <p className="text-sikap-dark dark:text-gray-300 text-base md:text-lg font-medium">{t('cour_subtitle')}</p>
          </div>
          <button 
             onClick={() => setIsAddModalOpen(true)}
             className="
               flex items-center gap-2 px-6 py-3 rounded-full 
               border-[3px] border-sikap-teal 
               bg-white dark:bg-sikap-dark-surface text-sikap-teal font-bold 
               transition-all duration-200 ease-in-out
               hover:bg-sikap-teal hover:text-white
               active:bg-[#4daeb1] active:border-sikap-orange active:text-white
               whitespace-nowrap touch-manipulation
             "
          >
             <IconPlus className="w-5 h-5" />
             <span>{t('cour_add_btn')}</span>
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {courses.map(course => (
          <div key={course.id} className="bg-white dark:bg-sikap-dark-surface border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(course.level)}`}>
                {course.level}
              </span>
              <IconBook className="w-6 h-6 text-sikap-orange opacity-50" />
            </div>
            
            <h3 className="text-xl font-bold text-sikap-dark dark:text-white mb-2 line-clamp-2 min-h-[56px]">{course.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">{course.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-6 font-medium">
              <div className="flex items-center gap-1">
                <IconClock className="w-4 h-4" />
                <span>{course.duration} {t('cour_hours')}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUsers className="w-4 h-4" />
                <span>{course.students}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedCourse(course)}
              className="w-full py-3 rounded-xl bg-sikap-teal text-white font-bold hover:bg-[#5bbec1] transition shadow-lg shadow-teal-50 dark:shadow-none touch-manipulation"
            >
              {t('cour_view_btn')}
            </button>
          </div>
        ))}
      </div>

      {/* ADD COURSE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
            <div className="p-6 flex justify-between items-start bg-sikap-teal">
              <div>
                <h2 className="text-2xl font-bold text-white">{t('cour_add_modal_title')}</h2>
                <p className="text-white/80 text-sm mt-1">{t('proj_fill_details')}</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-1 rounded-full hover:bg-white/20 transition">
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cour_title_label')}</label>
                <input type="text" name="title" required value={newCourse.title} onChange={handleInputChange}
                  className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal" />
              </div>
              <div>
                <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cour_desc_label')}</label>
                <textarea name="description" required rows={3} value={newCourse.description} onChange={handleInputChange}
                  className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cour_level_label')}</label>
                   <select name="level" value={newCourse.level} onChange={handleInputChange}
                      className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sikap-teal font-bold text-sm uppercase tracking-wider mb-2">{t('cour_dur_label')}</label>
                   <input type="number" name="duration" required value={newCourse.duration} onChange={handleInputChange}
                      className="w-full bg-[#f8fcfc] dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-sikap-dark dark:text-white focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal" />
                </div>
              </div>
              <button type="submit" className="mt-4 w-full bg-sikap-teal text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition">{t('cour_submit')}</button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW COURSE MODAL */}
      {selectedCourse && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-sikap-dark-surface rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto max-h-[90vh] flex flex-col">
               <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start bg-white dark:bg-sikap-dark-surface sticky top-0 z-10">
                  <div className="pr-8">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(selectedCourse.level)}`}>
                        {selectedCourse.level}
                     </span>
                     <h2 className="text-3xl font-bold text-sikap-teal mt-3">{selectedCourse.title}</h2>
                     <p className="text-gray-500 dark:text-gray-400 mt-1">{selectedCourse.description}</p>
                  </div>
                  <button onClick={() => setSelectedCourse(null)} className="text-gray-400 hover:text-sikap-dark dark:hover:text-white transition bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                     <IconClose className="w-6 h-6" />
                  </button>
               </div>
               
               <div className="p-6 md:p-8 overflow-y-auto">
                  <div className="prose dark:prose-invert max-w-none">
                     {selectedCourse.content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-sikap-dark dark:text-white mb-4">{line.replace('# ', '')}</h1>;
                        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-sikap-teal mt-6 mb-3">{line.replace('## ', '')}</h2>;
                        if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-700 dark:text-gray-300 mb-1">{line.replace('- ', '')}</li>;
                        if (line.match(/^\d\./)) return <div key={i} className="ml-4 text-gray-700 dark:text-gray-300 mb-1 font-medium">{line}</div>;
                        if (line === '') return <br key={i}/>;
                        return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{line}</p>;
                     })}
                  </div>
               </div>

               <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#252525] flex justify-end sticky bottom-0">
                  <button 
                     onClick={() => setSelectedCourse(null)}
                     className="px-8 py-3 bg-sikap-teal text-white font-bold rounded-xl hover:bg-opacity-90 transition shadow-lg shadow-teal-50 dark:shadow-none"
                  >
                     Close Course
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default CoursesView;