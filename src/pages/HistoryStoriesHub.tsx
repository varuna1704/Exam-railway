import React from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS } from '../data/questionSeeds';
import { SubjectIcon } from './Home';
import { BookOpen, ArrowRight, Compass } from 'lucide-react';

export const HistoryStoriesHub: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 no-print">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Compass className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-textPrimary">
          Story Learning Hub
        </h1>
        <p className="text-sm text-textMuted max-w-2xl mx-auto">
          Ditch raw memorization. Follow conceptual storylines and historical diaries where previous year exam questions are woven into the text.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SUBJECTS.map((sub) => (
          <div
            key={sub.id}
            className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 flex items-center justify-center">
                  <SubjectIcon name={sub.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-textPrimary text-sm sm:text-base group-hover:text-accent transition-colors">
                    {sub.name}
                  </h3>
                  <span className="text-[10px] text-accent font-semibold tracking-wide uppercase font-mono">
                    Mode: {sub.storyType}
                  </span>
                </div>
              </div>

              <p className="text-xs text-textMuted leading-relaxed">
                Read the custom narrative generated to teach {sub.name} concepts in context. Questions are highlighted in blue, and correct options are highlighted in orange.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <Link
                to={`/subjects/${sub.id}?tab=story`}
                className="px-5 py-2.5 rounded-xl bg-primary dark:bg-blue-600 hover:bg-accent text-white font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Read Story Chapters
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
export default HistoryStoriesHub;
