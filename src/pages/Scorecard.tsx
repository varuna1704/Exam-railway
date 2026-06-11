import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import confetti from 'canvas-confetti';
import { SUBJECTS, QUESTIONS } from '../data/questionSeeds';
import { TrainProgressBar } from '../components/TrainProgressBar';
import { 
  ArrowRight, TrendingUp, AlertTriangle, Printer, RotateCcw, Share2
} from 'lucide-react';
import type { TestResult } from '../types';

export const Scorecard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Load result from localStorage
  const result: TestResult | null = useMemo(() => {
    const history = JSON.parse(localStorage.getItem('railway_mock_test_history') || '[]');
    return history.find((res: TestResult) => res.id === id) || null;
  }, [id]);

  // Trigger confetti if high score
  useEffect(() => {
    if (result) {
      const accuracy = (result.correct / result.totalQuestions) * 100;
      if (accuracy >= 80) {
        // Confetti burst
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
      }
    }
  }, [result]);

  const motivationalDetails = useMemo(() => {
    if (!result) return { message: '', badge: '' };
    const pct = (result.correct / result.totalQuestions) * 100;
    if (pct >= 90) {
      return {
        message: 'Outstanding! You are extremely close to securing the green signal! 🚦',
        color: 'text-green-500 bg-green-500/10 border-green-500/30'
      };
    } else if (pct >= 75) {
      return {
        message: 'Great work! Keep practicing to secure your merit position! 🏆',
        color: 'text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-500/10 border-primary/20'
      };
    } else if (pct >= 50) {
      return {
        message: 'Good attempt! Brush up on your weak areas to push past 80%. 📈',
        color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-950/50'
      };
    } else {
      return {
        message: 'Keep pushing! Focus on syllabus concepts and try again. 🚂',
        color: 'text-red-500 bg-red-500/10 border-red-500/30'
      };
    }
  }, [result]);

  // Percentile Rank Estimate (simple mock mapping for gamified feedback)
  const percentileRank = useMemo(() => {
    if (!result) return 'Top 50%';
    const pct = (result.correct / result.totalQuestions) * 100;
    if (pct >= 95) return 'Top 2%';
    if (pct >= 90) return 'Top 5%';
    if (pct >= 85) return 'Top 12%';
    if (pct >= 75) return 'Top 22%';
    if (pct >= 60) return 'Top 38%';
    if (pct >= 50) return 'Top 48%';
    return 'Top 70%';
  }, [result]);

  // Chart Data: Donut
  const donutData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Correct', value: result.correct, color: '#22C55E' },
      { name: 'Wrong', value: result.wrong, color: '#EF4444' },
      { name: 'Skipped', value: result.skipped, color: '#6B7280' }
    ];
  }, [result]);

  // Chart Data: Radar (Subject wise percentage)
  const radarData = useMemo(() => {
    if (!result) return [];
    return Object.entries(result.subjectBreakdown).map(([subId, stats]) => {
      const name = SUBJECTS.find(s => s.id === subId)?.name || subId;
      const scorePct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      return {
        subject: name,
        Score: scorePct
      };
    });
  }, [result]);

  if (!result) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-danger mx-auto" />
        <h3 className="font-bold text-textPrimary">Scorecard Not Found</h3>
        <p className="text-xs text-textMuted">This scorecard result identifier does not exist or has been cleared.</p>
        <Link to="/mock-test" className="text-accent underline text-xs font-semibold">Return to test configuration</Link>
      </div>
    );
  }

  // Removed unused getSubjectName helper

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // Mock sharing feature
    if (navigator.share) {
      navigator.share({
        title: 'My RRB Mock Test Score',
        text: `I scored ${result.score}/${result.totalQuestions} on the RailExam Mastery Platform!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Share link copied to clipboard: ${window.location.href}`);
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Scorecard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-border pb-6 no-print">
        <div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider font-mono">Test Complete</span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-textPrimary mt-1">
            Exam Scorecard & Performance Metrics
          </h1>
          <p className="text-xs text-textMuted mt-1">Attempted on: {new Date(result.date).toLocaleString()}</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Result PDF
          </button>
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Result
          </button>
        </div>
      </div>

      {/* Print Only Header */}
      <div className="hidden print-only text-center border-b pb-6 space-y-2">
        <h1 className="text-2xl font-bold font-display text-slate-900">RailExam Live Portal</h1>
        <h2 className="text-lg font-bold text-slate-800">Mock Examination Scorecard</h2>
        <p className="text-xs text-slate-500">Test ID: {result.id} • Taken on: {new Date(result.date).toLocaleString()}</p>
      </div>

      {/* Hero Overview: Large Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-surface dark:bg-slate-800 p-8 rounded-3xl border border-border shadow-sm items-center">
        {/* Score Column */}
        <div className="col-span-1 text-center space-y-2 py-4 md:border-r border-border">
          <span className="text-[10px] text-textMuted uppercase tracking-wider font-mono font-bold">Total Score</span>
          <div className="text-5xl sm:text-6xl font-extrabold text-accent font-mono">
            {result.score} <span className="text-2xl text-textMuted font-normal">/ {result.totalQuestions}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold font-mono text-primary dark:text-blue-400 mt-1">
            {percentileRank}
          </span>
        </div>

        {/* Breakdown Stats */}
        <div className="col-span-1 md:col-span-3 space-y-6 md:pl-6">
          <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <span className="block text-[10px] text-textMuted uppercase font-mono">Accuracy</span>
              <span className="text-lg sm:text-2xl font-extrabold text-success font-mono">
                {result.totalQuestions > 0 ? Math.round((result.correct / result.totalQuestions) * 100) : 0}%
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-textMuted uppercase font-mono">Attempt Rate</span>
              <span className="text-lg sm:text-2xl font-extrabold text-primary dark:text-blue-400 font-mono">
                {result.totalQuestions > 0 ? Math.round((result.attempted / result.totalQuestions) * 100) : 0}%
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-textMuted uppercase font-mono">Time Taken</span>
              <span className="text-lg sm:text-2xl font-extrabold text-textPrimary font-mono">
                {Math.floor(result.timeTaken / 60)} min {result.timeTaken % 60} sec
              </span>
            </div>
          </div>

          {/* Motivational alert */}
          <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold ${motivationalDetails.color}`}>
            <TrendingUp className="w-5 h-5 flex-shrink-0" />
            <p>{motivationalDetails.message}</p>
          </div>
        </div>
      </div>

      {/* Train Track Journey Progress bar */}
      <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
        <h3 className="font-display font-bold text-sm text-textPrimary mb-4">Journey to 100% Score</h3>
        <TrainProgressBar progress={(result.score / result.totalQuestions) * 100} />
      </div>

      {/* Detailed Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Box A: Subject Score Breakdown Table */}
        <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-textPrimary border-b border-border pb-3">
              Subject-wise Performance
            </h3>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-textMuted font-semibold">
                    <th className="py-2.5">Subject</th>
                    <th className="py-2.5 text-center">Attempted</th>
                    <th className="py-2.5 text-center">Correct</th>
                    <th className="py-2.5 text-right">Score %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {Object.entries(result.subjectBreakdown).map(([subId, stats]) => (
                    <tr key={subId} className="text-textPrimary hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="py-3 font-semibold">{SUBJECTS.find(s => s.id === subId)?.name || subId}</td>
                      <td className="py-3 text-center font-mono">{stats.attempted} / {stats.total}</td>
                      <td className="py-3 text-center font-mono text-success font-bold">{stats.correct}</td>
                      <td className="py-3 text-right font-mono font-bold text-accent">
                        {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="no-print pt-6">
            <button
              onClick={() => navigate('/mock-test')}
              className="w-full py-3 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-textPrimary flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Attempt Another Examination
            </button>
          </div>
        </div>

        {/* Box B: Donut Proportion & Radar Chart */}
        <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <h3 className="font-display font-bold text-base text-textPrimary border-b border-border pb-3">
            Response & Skill Analytics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Donut chart */}
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} questions`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold font-mono text-textPrimary">{result.attempted}</span>
                <span className="text-[8px] text-textMuted uppercase font-mono">Solved</span>
              </div>
            </div>

            {/* Custom chart legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-textPrimary">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-success" /> Correct</span>
                <span className="font-mono">{result.correct} Qs</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-textPrimary">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-danger" /> Wrong</span>
                <span className="font-mono">{result.wrong} Qs</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-textPrimary">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Skipped</span>
                <span className="font-mono">{result.skipped} Qs</span>
              </div>
            </div>
          </div>

          {/* Radar chart (If multiple subjects, else simple bar graphic) */}
          {radarData.length > 1 && (
            <div className="h-48 w-full pt-4 border-t border-border">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                  <Radar name="Score" dataKey="Score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>

      {/* Weak Areas Recommendation Block */}
      <div className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-3 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-display font-bold text-base text-textPrimary">Identified Weak Areas</h3>
        </div>

        {result.weakTopics.length === 0 ? (
          <p className="text-xs text-textMuted">Excellent! You didn't make any errors. Perfect accuracy is recorded.</p>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-textMuted leading-relaxed">
              Based on your incorrect submissions, we recommend reviewing study materials for these topics. Click a topic to open the subject's question bank filtered directly by that keyword:
            </p>
            <div className="flex flex-wrap gap-3">
              {result.weakTopics.map((topic, index) => {
                // Find matching subject to route to
                let matchSub = 'general-knowledge';
                for (const [subId, qList] of Object.entries(QUESTIONS)) {
                  if (qList.some(q => q.topic === topic)) {
                    matchSub = subId;
                    break;
                  }
                }

                return (
                  <Link
                    key={index}
                    to={`/subjects/${matchSub}?search=${encodeURIComponent(topic)}`}
                    className="px-4 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-900/50 hover:border-accent hover:bg-accent/5 transition-all text-xs font-semibold text-textPrimary flex items-center gap-1"
                  >
                    <span>{topic}</span>
                    <ArrowRight className="w-3 h-3 text-accent" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
export default Scorecard;
