import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { QUESTIONS, SUBJECTS } from '../data/questionSeeds';
import type { Question } from '../types';
import { Heart, Search, Filter, Eye, EyeOff, Trash2 } from 'lucide-react';

export const Bookmarks: React.FC = () => {
  const [bookmarkedList, setBookmarkedList] = useState<{ subjectId: string; question: Question }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Load bookmarks on mount
  useEffect(() => {
    loadAllBookmarks();
  }, []);

  const loadAllBookmarks = () => {
    const list: { subjectId: string; question: Question }[] = [];
    
    SUBJECTS.forEach((sub) => {
      const saved = localStorage.getItem(`bookmarks_${sub.id}`);
      if (saved) {
        try {
          const ids: string[] = JSON.parse(saved);
          const subjectQuestions = QUESTIONS[sub.id] || [];
          
          ids.forEach((qId) => {
            const foundQ = subjectQuestions.find(q => q.id === qId);
            if (foundQ) {
              list.push({
                subjectId: sub.id,
                question: foundQ
              });
            }
          });
        } catch (e) {
          console.error(`Error loading bookmarks for subject ${sub.id}`, e);
        }
      }
    });

    setBookmarkedList(list);
  };

  const removeBookmark = (subjectId: string, qId: string) => {
    const saved = localStorage.getItem(`bookmarks_${subjectId}`);
    if (saved) {
      try {
        const ids: string[] = JSON.parse(saved);
        const updated = ids.filter(id => id !== qId);
        localStorage.setItem(`bookmarks_${subjectId}`, JSON.stringify(updated));
        
        // Reload list
        loadAllBookmarks();
      } catch (e) {
        console.error('Error removing bookmark', e);
      }
    }
  };

  const clearAllBookmarks = () => {
    if (window.confirm('Are you sure you want to clear all bookmarked questions across all subjects?')) {
      SUBJECTS.forEach((sub) => {
        localStorage.removeItem(`bookmarks_${sub.id}`);
      });
      setBookmarkedList([]);
    }
  };

  // Filtered bookmarks list
  const filteredBookmarks = useMemo(() => {
    return bookmarkedList.filter(item => {
      const q = item.question;
      const matchesSearch = searchQuery.trim() === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSub = selectedSubject === 'all' || item.subjectId === selectedSubject;
      
      return matchesSearch && matchesSub;
    });
  }, [bookmarkedList, searchQuery, selectedSubject]);

  const getSubjectName = (subId: string) => {
    return SUBJECTS.find(s => s.id === subId)?.name || subId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 no-print">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-textPrimary">
            Your Bookmarked Questions
          </h1>
          <p className="text-sm text-textMuted mt-1">Review, study, and test yourself on your saved questions.</p>
        </div>

        {bookmarkedList.length > 0 && (
          <button
            onClick={clearAllBookmarks}
            className="px-4 py-2 border border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-semibold rounded-xl text-red-500 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>

      {bookmarkedList.length === 0 ? (
        <div className="text-center py-16 bg-surface dark:bg-slate-800 rounded-3xl border border-border shadow-sm">
          <Heart className="w-12 h-12 text-textMuted mx-auto opacity-35 mb-4 animate-pulse" />
          <h3 className="font-bold text-textPrimary">No Bookmarks Found</h3>
          <p className="text-xs text-textMuted max-w-sm mx-auto mt-1 leading-relaxed">
            Practice questions on the subject pages and click the heart icon (♥) to bookmark important or difficult questions.
          </p>
          <div className="mt-6">
            <Link
              to="/subjects"
              className="inline-flex px-6 py-2.5 rounded-xl bg-primary dark:bg-blue-600 hover:bg-accent text-white font-bold text-xs shadow-md transition-colors"
            >
              Browse Subject Banks
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-surface dark:bg-slate-800 p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input
                type="text"
                placeholder="Search within bookmarked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl py-2 pl-10 pr-4 text-sm placeholder-textMuted focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-3 py-2 text-xs font-semibold text-textPrimary focus:outline-none"
            >
              <option value="all">All Subjects</option>
              {SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* List content */}
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12 bg-surface dark:bg-slate-800 rounded-2xl border border-border">
              <Filter className="w-10 h-10 text-textMuted mx-auto opacity-35 mb-2" />
              <p className="text-xs text-textMuted">No questions match your filter options.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookmarks.map((item) => {
                const q = item.question;
                const isRevealed = !!revealedAnswers[q.id];

                return (
                  <div 
                    key={q.id}
                    className="bg-surface dark:bg-slate-800 rounded-2xl border border-border p-6 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase bg-primary/10 dark:bg-blue-400/10 text-primary dark:text-blue-400 px-2 py-0.5 rounded">
                          {getSubjectName(item.subjectId)}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-700 text-textMuted px-2 py-0.5 rounded">
                          {q.exam} {q.year}
                        </span>
                        <span className="text-[10px] font-semibold bg-orange-100 dark:bg-orange-950/20 text-accent px-2.5 py-0.5 rounded-full">
                          {q.topic}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          q.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-950/20 text-success' :
                          q.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400' :
                          'bg-red-100 dark:bg-red-950/20 text-danger'
                        }`}>
                          {q.difficulty}
                        </span>
                        <button
                          onClick={() => removeBookmark(item.subjectId, q.id)}
                          className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-semibold text-textPrimary leading-relaxed">
                      {q.question}
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(q.options).map(([key, val]) => {
                        const isCorrect = key === q.correct_option;
                        let btnStyle = 'border-border bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800';

                        if (isRevealed) {
                          if (isCorrect) {
                            btnStyle = 'border-success bg-green-50 dark:bg-green-950/20 text-success font-semibold';
                          } else {
                            btnStyle = 'border-border bg-slate-100 dark:bg-slate-800 text-textMuted opacity-60';
                          }
                        }

                        return (
                          <div
                            key={key}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs leading-normal transition-all ${btnStyle}`}
                          >
                            <span className={`flex w-5 h-5 items-center justify-center rounded-full text-[10px] font-bold ${
                              isRevealed && isCorrect 
                                ? 'bg-success text-white' 
                                : 'bg-primary dark:bg-blue-600 text-white'
                            }`}>
                              {key}
                            </span>
                            <span>{val}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reveal answer bar */}
                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <button
                        onClick={() => setRevealedAnswers(prev => ({ ...prev, [q.id]: !isRevealed }))}
                        className="text-xs font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5"
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Hide Explanation
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Show Answer & Explanation
                          </>
                        )}
                      </button>
                      <span className="text-[10px] text-textMuted font-mono">Appeared {q.appeared_count}x</span>
                    </div>

                    {/* Explanation content */}
                    {isRevealed && (
                      <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-slate-900 border border-orange-100 dark:border-slate-700 mt-2 space-y-2 animate-in slide-in-from-top-2 duration-150">
                        <h4 className="text-xs font-bold text-accent">Correct Answer: {q.correct_option}</h4>
                        <p className="text-xs text-textPrimary leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
export default Bookmarks;
