import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { SUBJECTS } from '../data/questionSeeds';
import TrainProgressBar from '../components/TrainProgressBar';

// Dynamic icon resolver
export const SubjectIcon = ({ name, className = 'w-6 h-6' }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a generic search / subject page or search GK by default
      navigate(`/subjects/general-knowledge?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative background grids */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-semibold tracking-wide animate-pulse">
            <Icons.Sparkles className="w-3.5 h-3.5" />
            15 Years of Railway Exams (2010–2025)
          </div>
          
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            Master Your Railway Exams.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">
              Free, Interactive & Story-Driven.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-sans">
            Prepare for RRB NTPC, Group D, ALP, JE, and RRC with 8,000+ past questions, master syllabus analysis, interactive mock tests, and history narratives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/mock-test"
              className="px-8 py-4 rounded-xl bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:bg-accent/90 hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              <Icons.PlayCircle className="w-5 h-5" />
              Start Mock Test
            </Link>
            <Link
              to="/syllabus"
              className="px-8 py-4 rounded-xl bg-slate-800 text-slate-100 font-bold border border-slate-700 hover:bg-slate-700 hover:text-white hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              <Icons.FileSpreadsheet className="w-5 h-5" />
              View Syllabus
            </Link>
          </div>

          {/* Train track progress bar demo/decoration */}
          <div className="max-w-xl mx-auto pt-10">
            <p className="text-xs text-slate-400 mb-2 font-mono">Your progress to target exam score:</p>
            <TrainProgressBar progress={75} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface dark:bg-slate-800 p-8 rounded-2xl border border-border shadow-sm text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-blue-400 font-mono">8,000+</div>
            <div className="text-xs sm:text-sm text-textMuted font-medium">Exam PYQ Questions</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-accent font-mono">8</div>
            <div className="text-xs sm:text-sm text-textMuted font-medium">Core Subjects Covered</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-blue-400 font-mono">15+</div>
            <div className="text-xs sm:text-sm text-textMuted font-medium">Years (2010–2025)</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-success font-mono">100%</div>
            <div className="text-xs sm:text-sm text-textMuted font-medium">Free Self-Study Platform</div>
          </div>
        </div>
      </section>

      {/* Subject Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center md:text-left space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-textPrimary">
            Practice Subject-wise Question Banks
          </h2>
          <p className="text-sm text-textMuted max-w-2xl">
            Choose a subject to practice previous year questions, inspect syllabus weights, read conceptual stories, or attempt quick flashcard revision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBJECTS.map((sub) => (
            <Link
              key={sub.id}
              to={`/subjects/${sub.id}`}
              className="group flex flex-col justify-between p-6 bg-surface dark:bg-slate-800 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <SubjectIcon name={sub.icon} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-textPrimary group-hover:text-accent transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-textMuted leading-relaxed">
                    {sub.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold">
                <span className="text-textMuted group-hover:text-textPrimary transition-colors font-mono">
                  {sub.qCount}+ Questions
                </span>
                <span className="text-primary dark:text-blue-400 group-hover:text-accent flex items-center gap-1">
                  Explore <Icons.ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Global Search Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-1/4 translate-x-1/4">
            <Icons.Search className="w-96 h-96" />
          </div>
          <div className="max-w-2xl space-y-6 relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold">
              Looking for a Specific Topic or Question?
            </h3>
            <p className="text-sm text-slate-300">
              Search the master question database across all exam years. Find topics like "Constitution Articles", "Compound Interest", or "Modern History" instantly.
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Iron Man of India, Article 14, speed time..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors"
              >
                Search Bank
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mock Test and Story Splits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mock Test CTA */}
        <div className="bg-surface dark:bg-slate-800 border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="inline-flex p-3 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-2xl">
              <Icons.Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-textPrimary">
              Live Mock Tests & Speed Runs
            </h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Test your speed under realistic RRB conditions. Try full 100-question timed mocks (90 minutes) or quick 20-question speed drills (10 minutes) with real-time timers and auto-submit. Get comprehensive scorecards immediately.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <Link
              to="/mock-test"
              className="px-6 py-3 rounded-xl bg-primary dark:bg-blue-600 hover:bg-primary/95 text-white font-bold transition-all shadow-md"
            >
              Configure Test
            </Link>
          </div>
        </div>

        {/* Stories CTA */}
        <div className="bg-surface dark:bg-slate-800 border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="inline-flex p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-2xl">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-textPrimary">
              Historical & Conceptual Stories
            </h3>
            <p className="text-sm text-textMuted leading-relaxed">
              Dread memorizing dry facts? Read our continuous narratives where actual past exam questions are woven directly into the story flow. Questions appear in navy blue, and correct answers are highlighted in safety orange.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <Link
              to="/history-stories"
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold transition-all shadow-md"
            >
              Browse Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
