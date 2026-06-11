import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  QUESTIONS, SUBJECTS, SYLLABUS, STORIES 
} from '../data/questionSeeds';
import { SubjectIcon } from './Home';
import { 
  Heart, Search, Filter, BookOpen, Award, FileSpreadsheet, RotateCcw,
  CheckCircle, XCircle, Printer, BookOpenCheck, ArrowLeft,
  Eye, EyeOff
} from 'lucide-react';

export const SubjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const subjectId = id || 'general-knowledge';

  // Get subject info
  const subject = useMemo(() => {
    return SUBJECTS.find(sub => sub.id === subjectId) || SUBJECTS[0];
  }, [subjectId]);

  // Tabs: 'pyq' | 'syllabus' | 'story' | 'revision'
  const [activeTab, setActiveTab] = useState<'pyq' | 'syllabus' | 'story' | 'revision'>('pyq');
  
  // PYQ States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  
  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem(`bookmarks_${subjectId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Story state
  const [storyReadMode, setStoryReadMode] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'gk-ch1': true,
    'gk-ch2': true,
    'math-ch1': true,
    'sci-ch1': true,
    'ca-ch1': true,
    'reas-ch1': true,
    'eng-ch1': true,
    'hin-ch1': true,
    'comp-ch1': true
  });

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [revisionScore, setRevisionScore] = useState({ correct: 0, total: 0 });
  // Removed unused revisionHistory state

  const subjectQuestions = useMemo(() => {
    return QUESTIONS[subjectId] || [];
  }, [subjectId]);

  const syllabusList = useMemo(() => {
    return SYLLABUS[subjectId] || [];
  }, [subjectId]);

  const storyData = useMemo(() => {
    return STORIES[subjectId] || { subject: subjectId, chapters: [] };
  }, [subjectId]);

  // Unique topics in subject questions
  const topics = useMemo(() => {
    const set = new Set(subjectQuestions.map(q => q.topic));
    return Array.from(set);
  }, [subjectQuestions]);

  // Years in questions
  const years = useMemo(() => {
    const set = new Set(subjectQuestions.map(q => q.year.toString()));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [subjectQuestions]);

  // Bookmarking handler
  const toggleBookmark = (qId: string) => {
    let updated: string[];
    if (bookmarks.includes(qId)) {
      updated = bookmarks.filter(id => id !== qId);
    } else {
      updated = [...bookmarks, qId];
    }
    setBookmarks(updated);
    localStorage.setItem(`bookmarks_${subjectId}`, JSON.stringify(updated));
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return subjectQuestions.filter(q => {
      const matchesSearch = searchQuery.trim() === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === 'all' || q.year.toString() === selectedYear;
      const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
      
      return matchesSearch && matchesYear && matchesDifficulty && matchesTopic;
    });
  }, [subjectQuestions, searchQuery, selectedYear, selectedDifficulty, selectedTopic]);

  // Paginated questions
  const questionsPerPage = 20;
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    return filteredQuestions.slice(startIndex, startIndex + questionsPerPage);
  }, [filteredQuestions, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setRevealedAnswers({});
  }, [searchQuery, selectedYear, selectedDifficulty, selectedTopic]);

  // Handle direct search parameters from Home Search
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      setActiveTab('pyq');
    }
  }, [searchParams]);

  // Reset Revision on subject change
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setRevisionScore({ correct: 0, total: 0 });
    // Removed unused state reset
  }, [subjectId]);

  // Render Stars helper
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

  // Story embedded token parser
  const parseStoryContent = (text: string) => {
    const regex = /(\[\[Q:.*?\]\]|\[\[A:.*?\]\])/g;
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.startsWith('[[Q:')) {
        const qText = part.slice(4, -2).trim();
        // Find matching question details
        const match = subjectQuestions.find(q => 
          q.question.toLowerCase().includes(qText.toLowerCase()) || 
          qText.toLowerCase().includes(q.question.toLowerCase())
        );
        return (
          <span 
            key={index} 
            className="story-question font-bold text-primary dark:text-blue-400 bg-primary/5 dark:bg-blue-400/10 px-1.5 py-0.5 rounded cursor-pointer relative group inline-block"
          >
            {qText}
            {match && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-900 text-white text-[10px] font-mono py-1.5 px-3 rounded shadow-lg z-50 whitespace-nowrap">
                {match.exam} ({match.year}) • {match.difficulty}
              </span>
            )}
          </span>
        );
      } else if (part.startsWith('[[A:')) {
        const aText = part.slice(4, -2).trim();
        return (
          <span 
            key={index} 
            className="story-answer font-bold text-accent bg-accent/5 px-1.5 py-0.5 rounded inline-block"
          >
            {aText}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Flashcards List: takes first 50 or available questions
  const flashcards = useMemo(() => {
    return subjectQuestions.slice(0, 50);
  }, [subjectQuestions]);

  const handleFlashcardReview = (gotRight: boolean) => {
    if (gotRight) {
      setRevisionScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setRevisionScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
    
    setIsFlipped(false);
    setTimeout(() => {
      if (currentCardIndex + 1 < flashcards.length) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        // Loop back or end
        setCurrentCardIndex(0);
      }
    }, 200);
  };

  const handlePrintSyllabus = () => {
    window.print();
  };

  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ${storyReadMode ? 'bg-surface dark:bg-slate-900 min-h-screen' : ''}`}>
      
      {/* Header (Hidden in Read Mode) */}
      {!storyReadMode && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6 no-print">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 flex items-center justify-center">
              <SubjectIcon name={subject.icon} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-textPrimary">
                  {subject.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-textMuted border border-border font-mono">
                  {subjectQuestions.length} Seeded PYQs
                </span>
              </div>
              <p className="text-sm text-textMuted mt-1">{subject.description}</p>
            </div>
          </div>

          <Link
            to="/mock-test"
            className="self-start md:self-auto px-6 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            Take {subject.name} Mock Test
          </Link>
        </div>
      )}

      {/* Tabs Menu (Hidden in Read Mode & Print) */}
      {!storyReadMode && (
        <div className="flex border-b border-border mt-6 no-print overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('pyq')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pyq'
                ? 'border-accent text-accent'
                : 'border-transparent text-textMuted hover:text-textPrimary'
            }`}
          >
            <Search className="w-4 h-4" />
            PYQ Bank ({filteredQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'syllabus'
                ? 'border-accent text-accent'
                : 'border-transparent text-textMuted hover:text-textPrimary'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Syllabus
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'story'
                ? 'border-accent text-accent'
                : 'border-transparent text-textMuted hover:text-textPrimary'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            History Story
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'revision'
                ? 'border-accent text-accent'
                : 'border-transparent text-textMuted hover:text-textPrimary'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            Quick Revision
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="mt-8">
        
        {/* ================= TAB 1: PYQ BANK ================= */}
        {activeTab === 'pyq' && !storyReadMode && (
          <div className="space-y-6 no-print">
            {/* Filter Bar */}
            <div className="bg-surface dark:bg-slate-800 p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
                <input
                  type="text"
                  placeholder="Search questions or explanation content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder-textMuted focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-4">
                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-3 py-2.5 text-xs font-semibold text-textPrimary focus:outline-none"
                >
                  <option value="all">All Years</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-3 py-2.5 text-xs font-semibold text-textPrimary focus:outline-none"
                >
                  <option value="all">Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                {/* Topic Filter */}
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-3 py-2.5 text-xs font-semibold text-textPrimary focus:outline-none max-w-[150px] sm:max-w-xs"
                >
                  <option value="all">All Topics</option>
                  {topics.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Questions List */}
            {paginatedQuestions.length === 0 ? (
              <div className="text-center py-12 bg-surface dark:bg-slate-800 rounded-2xl border border-border">
                <Filter className="w-12 h-12 text-textMuted mx-auto opacity-40 mb-3" />
                <h3 className="font-bold text-textPrimary">No Questions Found</h3>
                <p className="text-xs text-textMuted mt-1">Try adjusting your search queries or filter values.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedQuestions.map((q, idx) => {
                  const qGlobalIndex = (currentPage - 1) * questionsPerPage + idx + 1;
                  const isRevealed = !!revealedAnswers[q.id];
                  const isBookmarked = bookmarks.includes(q.id);

                  return (
                    <div 
                      key={q.id}
                      className="bg-surface dark:bg-slate-800 rounded-2xl border border-border p-6 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-400/10 px-2 py-0.5 rounded">
                            Q. {qGlobalIndex}
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
                            onClick={() => toggleBookmark(q.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Bookmark question"
                          >
                            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${
                              isBookmarked ? 'fill-red-500 text-red-500' : 'text-textMuted'
                            }`} />
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
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

                      {/* Bottom reveal bar */}
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                    >
                      ← Previous
                    </button>
                    <span className="text-xs text-textMuted font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: SYLLABUS ================= */}
        {activeTab === 'syllabus' && !storyReadMode && (
          <div className="space-y-6">
            {/* Syllabus Controls (Hidden in Print) */}
            <div className="border-b border-border pb-3 no-print">
              <h2 className="font-display font-bold text-lg text-textPrimary">Master Syllabus Tree</h2>
            </div>

            {/* Print Only Header (Visible only when printing) */}
            <div className="hidden print-only text-center border-b pb-6 space-y-2">
              <h1 className="text-2xl font-bold font-display text-slate-900">RailExam Mastery Platform</h1>
              <h2 className="text-lg font-bold text-slate-800">Syllabus Breakdown: {subject.name}</h2>
              <p className="text-xs text-slate-500">Generated on: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Accordion tree */}
            <div className="space-y-4">
              {syllabusList.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-surface dark:bg-slate-800 rounded-2xl border border-border p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">Topic {idx + 1}</span>
                      <h3 className="font-display font-bold text-textPrimary text-base md:text-lg">{item.name}</h3>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      {renderStars(item.appearedCount)}
                      <span className="text-[10px] text-textMuted font-mono">Appeared {item.appearedCount} times</span>
                    </div>
                  </div>

                  {/* Subtopics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {item.subtopics.map((sub, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border flex flex-col justify-between"
                      >
                        <span className="text-xs font-bold text-textPrimary leading-normal">{sub.name}</span>
                        <span className="block text-[10px] text-textMuted mt-2 font-mono">
                          • {sub.appearedCount} questions recorded
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Print button below the accordion tree */}
            <div className="flex justify-center pt-6 no-print">
              <button
                onClick={handlePrintSyllabus}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Syllabus Booklet
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HISTORY STORY ================= */}
        {activeTab === 'story' && (
          <div className={`space-y-6 ${storyReadMode ? 'max-w-3xl mx-auto py-12' : ''}`}>
            
            {/* Header controls (Hidden in Print) */}
            <div className="flex items-center justify-between border-b border-border pb-4 no-print">
              <div className="flex items-center gap-2">
                {storyReadMode && (
                  <button
                    onClick={() => setStoryReadMode(false)}
                    className="p-2 rounded-lg border border-border hover:bg-slate-100 dark:hover:bg-slate-800 text-textPrimary transition-colors flex items-center justify-center"
                    aria-label="Exit Read Mode"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div>
                  <h3 className="font-display font-bold text-textPrimary text-lg">
                    {subject.storyType}: Concepts through Narrative
                  </h3>
                  <p className="text-xs text-textMuted">Questions from the PYQ bank are naturally embedded inside the story.</p>
                </div>
              </div>

              <button
                onClick={() => setStoryReadMode(!storyReadMode)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  storyReadMode 
                    ? 'bg-accent text-white border-accent' 
                    : 'border-border text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                {storyReadMode ? 'Exit Read Mode' : 'Read Mode'}
              </button>
            </div>

            {/* Stories chapter accordions */}
            {storyData.chapters.length === 0 ? (
              <div className="text-center py-12 bg-surface dark:bg-slate-800 rounded-2xl border border-border no-print">
                <BookOpen className="w-12 h-12 text-textMuted mx-auto opacity-40 mb-3" />
                <h3 className="font-bold text-textPrimary">No Story Available</h3>
                <p className="text-xs text-textMuted mt-1">Stories for this subject are currently under construction.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {storyData.chapters.map((chapter) => {
                  const isExpanded = !!expandedChapters[chapter.id];

                  return (
                    <div 
                      key={chapter.id}
                      className={`rounded-2xl border border-border p-6 sm:p-8 transition-all ${
                        storyReadMode 
                          ? 'border-transparent shadow-none bg-transparent' 
                          : 'bg-surface dark:bg-slate-800 shadow-sm'
                      }`}
                    >
                      {/* Chapter title bar */}
                      <button
                        onClick={() => !storyReadMode && setExpandedChapters(prev => ({ ...prev, [chapter.id]: !isExpanded }))}
                        className={`w-full text-left flex justify-between items-center ${
                          storyReadMode ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                        }`}
                      >
                        <h2 className="font-display text-lg sm:text-xl font-extrabold text-primary dark:text-blue-400">
                          {chapter.title}
                        </h2>
                        {!storyReadMode && (
                          <span className="text-textMuted text-xs font-bold">
                            {isExpanded ? 'Collapse' : 'Expand'}
                          </span>
                        )}
                      </button>

                      {/* Chapter body */}
                      {isExpanded && (
                        <div 
                          className={`mt-6 font-story leading-relaxed text-textPrimary whitespace-pre-line ${
                            storyReadMode 
                              ? 'text-lg md:text-xl text-slate-800 dark:text-slate-200' 
                              : 'text-sm md:text-base'
                          }`}
                        >
                          {parseStoryContent(chapter.content)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: QUICK REVISION ================= */}
        {activeTab === 'revision' && !storyReadMode && (
          <div className="max-w-2xl mx-auto space-y-8 no-print">
            <div className="text-center space-y-1">
              <h2 className="font-display text-lg font-bold text-textPrimary">Revision Flashcards (Top 50 PYQs)</h2>
              <p className="text-xs text-textMuted">Click card to reveal correct answer and details. Review accuracy statistics below.</p>
            </div>

            {flashcards.length === 0 ? (
              <div className="text-center py-12 bg-surface dark:bg-slate-800 rounded-2xl border border-border">
                <RotateCcw className="w-12 h-12 text-textMuted mx-auto opacity-40 mb-3" />
                <h3 className="font-bold text-textPrimary">No Flashcards Seeded</h3>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active flashcard */}
                <div 
                  className={`w-full h-80 flip-card cursor-pointer ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="flip-card-inner">
                    {/* Front side (Question) */}
                    <div className="flip-card-front bg-surface dark:bg-slate-800 rounded-3xl border-2 border-border shadow-md p-8 flex flex-col justify-between items-center text-center">
                      <span className="text-[10px] font-bold tracking-wider text-accent font-mono uppercase bg-accent/10 px-3 py-1 rounded-full">
                        Question {currentCardIndex + 1} of {flashcards.length}
                      </span>
                      <p className="text-sm md:text-base font-semibold text-textPrimary max-h-40 overflow-y-auto leading-relaxed px-4">
                        {flashcards[currentCardIndex].question}
                      </p>
                      <span className="text-[10px] text-textMuted flex items-center gap-1.5 font-semibold">
                        <span className="animate-pulse w-1.5 h-1.5 bg-accent rounded-full" />
                        Click Card to Flip
                      </span>
                    </div>

                    {/* Back side (Answer) */}
                    <div className="flip-card-back bg-surface dark:bg-slate-800 rounded-3xl border-2 border-accent shadow-lg p-8 flex flex-col justify-between items-center text-center">
                      <span className="text-[10px] font-bold tracking-wider text-success font-mono uppercase bg-green-100 dark:bg-green-950/20 text-success px-3 py-1 rounded-full">
                        Correct Option: {flashcards[currentCardIndex].correct_option}
                      </span>
                      <div className="space-y-3 px-4 max-h-44 overflow-y-auto">
                        <p className="text-xs font-bold text-textPrimary">
                          Answer: {flashcards[currentCardIndex].options[flashcards[currentCardIndex].correct_option]}
                        </p>
                        <p className="text-xs text-textMuted leading-relaxed">
                          {flashcards[currentCardIndex].explanation}
                        </p>
                      </div>
                      <span className="text-[10px] text-textMuted font-mono">
                        {flashcards[currentCardIndex].exam} ({flashcards[currentCardIndex].year})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score and Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface dark:bg-slate-800 p-6 rounded-2xl border border-border shadow-sm">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-[10px] text-textMuted font-mono uppercase">Session Score</span>
                    <h4 className="text-sm font-bold text-textPrimary">
                      {revisionScore.correct} / {revisionScore.total} Correct ({revisionScore.total > 0 ? Math.round((revisionScore.correct / revisionScore.total) * 100) : 0}%)
                    </h4>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleFlashcardReview(false)}
                      className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-bold text-textPrimary flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-4 h-4 text-danger" />
                      Need Review
                    </button>
                    <button
                      onClick={() => handleFlashcardReview(true)}
                      className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-primary dark:bg-blue-600 hover:bg-accent text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                      Got It Right
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SubjectDetail;
