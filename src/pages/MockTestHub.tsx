import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SUBJECTS } from '../data/questionSeeds';
import { Award, Zap, BookOpen, AlertCircle, History, ArrowRight } from 'lucide-react';
import type { TestResult } from '../types';

export const MockTestHub: React.FC = () => {
  const navigate = useNavigate();

  // Configuration States
  const [testType, setTestType] = useState<'subject' | 'full' | 'speed'>('subject');
  const [selectedSubject, setSelectedSubject] = useState<string>('general-knowledge');
  const [questionCount, setQuestionCount] = useState<number>(25);
  const [timeLimit, setTimeLimit] = useState<number>(25); // minutes

  // Past test results loaded from localStorage
  const [pastTests, setPastTests] = useState<TestResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('railway_mock_test_history');
    if (saved) {
      try {
        setPastTests(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing mock history', e);
      }
    }
  }, []);

  // Update question counts / time limits when test type changes
  useEffect(() => {
    if (testType === 'full') {
      setSelectedSubject('all');
      setQuestionCount(100);
      setTimeLimit(90);
    } else if (testType === 'speed') {
      setQuestionCount(20);
      setTimeLimit(10);
    } else {
      // Subject Mock
      if (selectedSubject === 'all') setSelectedSubject('general-knowledge');
      setQuestionCount(25);
      setTimeLimit(25);
    }
  }, [testType, selectedSubject]);

  const handleStartTest = () => {
    navigate(
      `/mock-test/live?subject=${selectedSubject}&type=${testType}&count=${questionCount}&time=${timeLimit}`
    );
  };

  const getSubjectName = (subId: string) => {
    if (subId === 'all') return 'Full Syllabus (All Subjects)';
    return SUBJECTS.find(s => s.id === subId)?.name || subId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 no-print">
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-textPrimary">
          Mock Test & Assessment Center
        </h1>
        <p className="text-sm text-textMuted max-w-2xl mx-auto">
          Test your preparation with exam-standard questions. Choose between subject-specific targets, full exam conditions, or daily speed runs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER COLUMN: Configuration */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Select Format */}
          <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-display font-bold text-lg text-textPrimary">1. Choose Mock Test Format</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Option A: Subject Mock */}
              <button
                onClick={() => setTestType('subject')}
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between h-40 transition-all ${
                  testType === 'subject'
                    ? 'border-accent bg-accent/[0.03] ring-1 ring-accent'
                    : 'border-border bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className={`w-6 h-6 ${testType === 'subject' ? 'text-accent' : 'text-textMuted'}`} />
                <div>
                  <h3 className="font-bold text-textPrimary text-sm">Subject Mock</h3>
                  <p className="text-[11px] text-textMuted mt-1">Single subject focus. 25 questions, 25 minutes. Boost topic confidence.</p>
                </div>
              </button>

              {/* Option B: Full Length Mock */}
              <button
                onClick={() => setTestType('full')}
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between h-40 transition-all ${
                  testType === 'full'
                    ? 'border-accent bg-accent/[0.03] ring-1 ring-accent'
                    : 'border-border bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Award className={`w-6 h-6 ${testType === 'full' ? 'text-accent' : 'text-textMuted'}`} />
                <div>
                  <h3 className="font-bold text-textPrimary text-sm">Full Length Mock</h3>
                  <p className="text-[11px] text-textMuted mt-1">Full RRB syllabus. 100 questions, 90 minutes. Simulate exam pressure.</p>
                </div>
              </button>

              {/* Option C: Speed Test */}
              <button
                onClick={() => setTestType('speed')}
                className={`p-6 rounded-2xl border text-left flex flex-col justify-between h-40 transition-all ${
                  testType === 'speed'
                    ? 'border-accent bg-accent/[0.03] ring-1 ring-accent'
                    : 'border-border bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Zap className={`w-6 h-6 ${testType === 'speed' ? 'text-accent' : 'text-textMuted'}`} />
                <div>
                  <h3 className="font-bold text-textPrimary text-sm">Speed Run</h3>
                  <p className="text-[11px] text-textMuted mt-1">Quick assessments. 20 questions, 10 minutes. Sharpen reaction speed.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Card 2: Customize settings */}
          <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-display font-bold text-lg text-textPrimary">2. Configure Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Subject Selection (Hidden for Full Length) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-textPrimary block">Select Target Subject</label>
                <select
                  disabled={testType === 'full'}
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-3 text-sm font-semibold text-textPrimary focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                >
                  <option value="all">Mix All Subjects</option>
                  {SUBJECTS.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Stats Preview Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-border flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-textMuted font-mono uppercase">Question count</span>
                  <span className="text-lg font-bold text-primary dark:text-blue-400 font-mono">{questionCount} Qs</span>
                </div>
                <div className="border-l border-border h-8 mx-2" />
                <div>
                  <span className="block text-[10px] text-textMuted font-mono uppercase">Time limit</span>
                  <span className="text-lg font-bold text-accent font-mono">{timeLimit} Mins</span>
                </div>
              </div>

            </div>

            {/* Test rules alert */}
            <div className="flex gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-xs text-textMuted border border-orange-100 dark:border-slate-800">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="space-y-1">
                <span className="font-bold text-accent">Practice Regulations:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Full screen mode is available during testing to block interruptions.</li>
                  <li>Questions are randomly selected and mixed from the historical banks.</li>
                  <li>The test auto-submits when the timer reaches 0.</li>
                </ul>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartTest}
              className="w-full py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" />
              Begin Assessment
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Past Test Records */}
        <div className="space-y-8">
          <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <History className="w-5 h-5 text-primary dark:text-blue-400" />
              <h2 className="font-display font-bold text-lg text-textPrimary">Your Test Records</h2>
            </div>

            {pastTests.length === 0 ? (
              <div className="text-center py-8">
                <Award className="w-10 h-10 text-textMuted mx-auto opacity-30 mb-2" />
                <p className="text-xs text-textMuted">No test attempts logged yet.</p>
                <p className="text-[10px] text-textMuted/80 mt-1">Complete a mock test to save scores here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {pastTests.map((res) => (
                  <Link
                    key={res.id}
                    to={`/mock-test/result/${res.id}`}
                    className="block p-4 rounded-xl border border-border bg-slate-50 dark:bg-slate-900/50 hover:border-accent hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-textPrimary font-bold">{getSubjectName(res.subject)}</span>
                      <span className="text-[10px] font-mono text-textMuted">{new Date(res.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/50">
                      <div className="flex gap-4">
                        <div>
                          <span className="block text-[8px] text-textMuted uppercase">Score</span>
                          <span className="text-xs font-mono font-bold text-accent">
                            {res.score} / {res.totalQuestions}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-textMuted uppercase">Accuracy</span>
                          <span className="text-xs font-mono font-bold text-success">
                            {res.totalQuestions > 0 ? Math.round((res.correct / res.totalQuestions) * 100) : 0}%
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-primary dark:text-blue-400 hover:text-accent font-semibold flex items-center gap-0.5">
                        Scorecard <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default MockTestHub;
