import React from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../data/questionSeeds';
import { SubjectIcon } from './Home';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';

export const SubjectsDirectory: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-textPrimary">
          Railway Exam Subject Directory
        </h1>
        <p className="text-sm text-textMuted max-w-2xl mx-auto">
          Explore past questions, structured syllabi, and contextual stories for all subjects tested in RRB NTPC, Group D, ALP, and Junior Engineer examinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SUBJECTS.map((sub) => {
          // Calculate if there's any bookmarks or test progress in local storage (mocked for visual flair)
          const bookmarks = JSON.parse(localStorage.getItem(`bookmarks_${sub.id}`) || '[]');
          // Removed unused completedCards tracking

          return (
            <div
              key={sub.id}
              className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-accent/40 transition-all group"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <SubjectIcon name={sub.icon} className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-textPrimary">
                      {sub.name}
                    </h2>
                    <span className="text-xs text-accent font-semibold tracking-wide">
                      {sub.storyType} mode enabled
                    </span>
                  </div>
                </div>

                <p className="text-sm text-textMuted leading-relaxed">
                  {sub.description}
                </p>

                {/* Sub features badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs text-textMuted">
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                    1000+ Questions
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs text-textMuted">
                    <BookOpen className="w-3.5 h-3.5 text-primary dark:text-blue-400" />
                    Embedded Story
                  </span>
                  {bookmarks.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/20 text-xs text-red-500">
                      ♥ {bookmarks.length} Bookmarks
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-left w-full sm:w-auto">
                  <span className="block text-[10px] text-textMuted font-mono uppercase">Difficulty Range</span>
                  <span className="text-xs font-semibold text-textPrimary">Easy / Medium / Hard</span>
                </div>
                
                <Link
                  to={`/subjects/${sub.id}`}
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-primary dark:bg-blue-600 hover:bg-accent text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                  Start Preparing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SubjectsDirectory;
