import React, { useState, useMemo } from 'react';
import { SUBJECTS, SYLLABUS } from '../data/questionSeeds';
import { SubjectIcon } from './Home';
import { Printer, FileSpreadsheet } from 'lucide-react';

export const SyllabusMaster: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0].id);

  const activeSyllabus = useMemo(() => {
    return SYLLABUS[activeSubject] || [];
  }, [activeSubject]);

  const activeSubjectName = useMemo(() => {
    return SUBJECTS.find(s => s.id === activeSubject)?.name || '';
  }, [activeSubject]);

  const handlePrint = () => {
    window.print();
  };

  const renderStars = (count: number) => {
    let stars = 1;
    if (count >= 150) stars = 5;
    else if (count >= 100) stars = 4;
    else if (count >= 50) stars = 3;
    else if (count >= 20) stars = 2;

    return (
      <div className="flex gap-0.5 text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-sm">
            {i < stars ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header (Hidden in Print) */}
      <div className="border-b border-border pb-6 no-print">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-textPrimary">
          Master Examination Syllabus
        </h1>
        <p className="text-sm text-textMuted mt-1">
          Exam frequency trends mapped from question occurrences in papers (2010–2025).
        </p>
      </div>

      {/* Print Only Header */}
      <div className="hidden print-only text-center border-b pb-6 space-y-2">
        <h1 className="text-3xl font-bold font-display text-slate-900">RailExam Master Syllabus Booklet</h1>
        <p className="text-xs text-slate-500">Official Exam Syllabus Analysis (2010-2025)</p>
      </div>

      {/* Subject Selector Tab Pills (Hidden in Print) */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border scrollbar-none no-print">
        {SUBJECTS.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubject(sub.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
              activeSubject === sub.id
                ? 'bg-primary border-primary dark:bg-blue-600 dark:border-blue-600 text-white shadow-sm'
                : 'bg-surface border-border text-textMuted hover:bg-slate-50'
            }`}
          >
            <SubjectIcon name={sub.icon} className="w-3.5 h-3.5" />
            {sub.name}
          </button>
        ))}
      </div>

      {/* Syllabus Content Display */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 no-print">
          <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
            <FileSpreadsheet className="w-4.5 h-4.5" />
          </div>
          <h2 className="font-display font-extrabold text-lg text-textPrimary">
            {activeSubjectName} Syllabus Detail
          </h2>
        </div>

        {activeSyllabus.length === 0 ? (
          <div className="text-center py-12 bg-surface dark:bg-slate-800 rounded-3xl border border-border">
            <p className="text-xs text-textMuted">Syllabus breakdown for this subject is currently loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSyllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-border pb-3">
                      <div>
                        <span className="text-[10px] text-accent font-bold uppercase tracking-wider font-mono">Topic {idx + 1}</span>
                        <h3 className="font-display font-bold text-textPrimary text-base mt-0.5">{item.name}</h3>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        {renderStars(item.appearedCount)}
                        <span className="text-[9px] text-textMuted font-mono">Appeared {item.appearedCount}x</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {item.subtopics.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between text-xs font-semibold p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="text-textPrimary font-medium">{sub.name}</span>
                          <span className="text-[9px] font-mono text-textMuted">{sub.appearedCount} Qs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Print options at the bottom of the syllabus list */}
            <div className="flex justify-center pt-8 no-print">
              <button
                onClick={handlePrint}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Syllabus Booklet
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};
export default SyllabusMaster;
