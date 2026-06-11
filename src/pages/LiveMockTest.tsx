import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QUESTIONS, SUBJECTS } from '../data/questionSeeds';
import type { Question, TestResult } from '../types';
import { 
  Clock, Flag, ChevronLeft, ChevronRight, CheckSquare, 
  AlertTriangle, Maximize2
} from 'lucide-react';

export const LiveMockTest: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL params
  const paramSubject = searchParams.get('subject') || 'all';
  const paramType = (searchParams.get('type') || 'subject') as 'subject' | 'full' | 'speed';
  const paramCount = parseInt(searchParams.get('count') || '25', 10);
  const paramTime = parseInt(searchParams.get('time') || '25', 10);

  // States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(paramTime * 60); // seconds
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timer Ref
  const timerRef = useRef<any>(null);

  // Shuffle & Setup Questions
  useEffect(() => {
    let pool: Question[] = [];
    if (paramSubject === 'all') {
      // Merge all questions from all subjects
      Object.values(QUESTIONS).forEach(list => {
        pool = [...pool, ...list];
      });
    } else {
      pool = QUESTIONS[paramSubject] || [];
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    // Take count
    setQuestions(shuffled.slice(0, paramCount));
  }, [paramSubject, paramCount]);

  // Timer interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Timer ended - auto submit!
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Track visited questions
  useEffect(() => {
    setVisitedQuestions(prev => {
      const copy = new Set(prev);
      copy.add(currentIndex);
      return copy;
    });
  }, [currentIndex]);

  const handleAutoSubmit = () => {
    alert("Time's up! Your test is being submitted automatically.");
    submitTest();
  };

  // Toggle fullscreen mode (simulated/window-level or native if allowed)
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback: window level full height/width
        setIsFullscreen(true);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const selectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: opt
    }));
  };

  const clearResponse = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Score compilation & save to storage
  const submitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    const subjectBreakdown: Record<string, { attempted: number; correct: number; total: number }> = {};
    const wrongTopics = new Set<string>();

    questions.forEach((q, idx) => {
      const ans = selectedAnswers[idx];
      const isCorrect = ans === q.correct_option;

      // Init breakdown sub-key
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { attempted: 0, correct: 0, total: 0 };
      }
      subjectBreakdown[q.subject].total += 1;

      if (ans === undefined) {
        skipped += 1;
      } else {
        subjectBreakdown[q.subject].attempted += 1;
        if (isCorrect) {
          correct += 1;
          subjectBreakdown[q.subject].correct += 1;
        } else {
          wrong += 1;
          wrongTopics.add(q.topic);
        }
      }
    });

    const score = correct; // Or implement positive - negative grading if needed, RRB usually has 1/3rd negative.
    // For MVP, simple score count.

    const testId = `TEST-${Date.now()}`;
    const newResult: TestResult = {
      id: testId,
      date: new Date().toISOString(),
      subject: paramSubject,
      subjectName: paramSubject === 'all' ? 'All Subjects' : (SUBJECTS.find(s => s.id === paramSubject)?.name || paramSubject),
      type: paramType,
      score: score,
      totalQuestions: questions.length,
      timeTaken: (paramTime * 60) - timeLeft,
      attempted: Object.keys(selectedAnswers).length,
      correct: correct,
      wrong: wrong,
      skipped: skipped,
      subjectBreakdown,
      weakTopics: Array.from(wrongTopics)
    };

    // Load and save to history
    const history = JSON.parse(localStorage.getItem('railway_mock_test_history') || '[]');
    history.unshift(newResult);
    localStorage.setItem('railway_mock_test_history', JSON.stringify(history));

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Go to scorecard page
    navigate(`/mock-test/result/${testId}`);
  };

  // Nav Grid Colors
  const getNavButtonClass = (idx: number) => {
    const isCurrent = idx === currentIndex;
    const isAnswered = selectedAnswers[idx] !== undefined;
    const isFlagged = flaggedQuestions[idx] === true;
    const isVisited = visitedQuestions.has(idx);

    let base = "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all ";

    if (isCurrent) {
      base += "ring-2 ring-accent ring-offset-2 scale-105 ";
    }

    if (isFlagged) {
      return base + "bg-yellow-400 text-slate-900 border border-yellow-500 shadow-sm";
    }
    if (isAnswered) {
      return base + "bg-success text-white border border-green-600 shadow-sm";
    }
    if (isVisited && !isAnswered) {
      return base + "bg-danger text-white border border-red-600 shadow-sm";
    }
    return base + "bg-slate-100 dark:bg-slate-700 text-textMuted border border-border";
  };

  if (questions.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-textMuted">Compiling and shuffling examination papers...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const attemptedCount = Object.keys(selectedAnswers).length;
  const flaggedCount = Object.keys(flaggedQuestions).filter(k => flaggedQuestions[parseInt(k)]).length;

  return (
    <div className={`min-h-screen bg-bgLight text-textPrimary flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : ''}`}>
      
      {/* Top Testing Bar */}
      <div className="bg-slate-900 text-white h-16 px-4 md:px-8 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white">
            RRB Mock Live Portal
          </span>
          <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-[9px] font-bold uppercase tracking-wider border border-accent/20">
            {paramType} Test
          </span>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-bold font-mono ${
            timeLeft < 120 ? 'bg-red-900/20 text-red-500 border-red-500 animate-pulse' : 'bg-slate-950 text-success border-slate-800'
          }`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Testing Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side: Question Pane */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6 min-h-[400px] flex flex-col justify-between">
            
            {/* Header: Question tags */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-400/10 px-2 py-0.5 rounded">
                    Q. {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-700 text-textMuted px-2 py-0.5 rounded">
                    {currentQuestion.exam} {currentQuestion.year}
                  </span>
                </div>
                <span className="text-[10px] font-semibold bg-orange-100 dark:bg-orange-950/20 text-accent px-2.5 py-0.5 rounded-full">
                  {currentQuestion.topic}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-bold text-textPrimary leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options list */}
            <div className="grid grid-cols-1 gap-3 py-4">
              {Object.entries(currentQuestion.options).map(([key, val]) => {
                const isSelected = selectedAnswers[currentIndex] === key;
                return (
                  <button
                    key={key}
                    onClick={() => selectOption(key as 'A' | 'B' | 'C' | 'D')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/[0.03] ring-1 ring-accent font-semibold'
                        : 'border-border bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className={`flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${
                      isSelected ? 'bg-accent text-white' : 'bg-primary dark:bg-blue-600 text-white'
                    }`}>
                      {key}
                    </span>
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between border-t border-border pt-4 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={toggleFlag}
                  className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    flaggedQuestions[currentIndex]
                      ? 'bg-yellow-400 border-yellow-400 text-slate-900'
                      : 'border-border text-textMuted hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  Flag
                </button>
                <button
                  onClick={clearResponse}
                  className="px-4 py-2 border border-border rounded-xl text-xs font-bold text-textMuted hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="p-2.5 rounded-xl border border-border text-textMuted hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentIndex === questions.length - 1}
                  className="p-2.5 rounded-xl border border-border text-textMuted hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Grid Panel */}
        <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 shadow-sm space-y-6">
          <div className="border-b border-border pb-3">
            <h3 className="font-display font-bold text-textPrimary text-sm">Question Grid</h3>
          </div>

          {/* Quick stats badges */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-textMuted border-b border-border pb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              Answered: {attemptedCount}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              Flagged: {flaggedCount}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-danger" />
              Skipped: {visitedQuestions.size - attemptedCount}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-100 dark:bg-slate-700" />
              Unvisited: {questions.length - visitedQuestions.size}
            </div>
          </div>

          {/* Grid buttons */}
          <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={getNavButtonClass(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Submit Action */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-3.5 rounded-xl bg-primary dark:bg-blue-600 hover:bg-accent text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <CheckSquare className="w-4 h-4" />
            Submit Examination
          </button>
        </div>

      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-accent border-b border-border pb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-display font-extrabold text-textPrimary text-base sm:text-lg">Submit Assessment?</h3>
            </div>
            
            <p className="text-xs text-textMuted leading-relaxed">
              Are you sure you want to end your exam? You cannot modify your answers or retake this live session once submitted.
            </p>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-border text-center">
              <div>
                <span className="block text-[9px] text-textMuted uppercase">Total</span>
                <span className="text-sm font-bold font-mono text-textPrimary">{questions.length}</span>
              </div>
              <div className="border-l border-border h-6 my-auto" />
              <div>
                <span className="block text-[9px] text-textMuted uppercase">Attempted</span>
                <span className="text-sm font-bold font-mono text-success">{attemptedCount}</span>
              </div>
              <div className="border-l border-border h-6 my-auto" />
              <div>
                <span className="block text-[9px] text-textMuted uppercase">Flagged</span>
                <span className="text-sm font-bold font-mono text-yellow-500">{flaggedCount}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-textMuted hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitTest}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-md transition-colors"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default LiveMockTest;
