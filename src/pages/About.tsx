import React from 'react';
import { Info, ShieldAlert, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 no-print">
      
      {/* Intro section */}
      <section className="text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400">
          <Info className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-textPrimary">
          About RailExam Mastery
        </h1>
        <p className="text-sm text-textMuted max-w-2xl mx-auto leading-relaxed">
          RailExam Mastery is a comprehensive, free self-study platform dedicated to helping aspirants prepare for the Indian Railway Recruitment Board (RRB) and Railway Recruitment Cell (RRC) examinations.
        </p>
      </section>

      {/* Core Objectives */}
      <section className="bg-surface dark:bg-slate-800 rounded-3xl border border-border p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="text-accent">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-textPrimary">Previous Year Questions</h3>
          <p className="text-xs text-textMuted leading-relaxed">
            Practice with questions compiled from papers spanning 2010 to 2025. Inspect detailed solutions and explanations.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-primary dark:text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-textPrimary">Story-driven Learning</h3>
          <p className="text-xs text-textMuted leading-relaxed">
            Read history, math, and science concepts structured as narratives where past exam questions are integrated naturally.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-success">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-textPrimary">Realistic Assessments</h3>
          <p className="text-xs text-textMuted leading-relaxed">
            Attempt subject-wise mock tests, full syllabus exams, and speed runs under timed conditions with comprehensive scorecards.
          </p>
        </div>
      </section>

      {/* Exam patterns overview */}
      <section className="space-y-6">
        <h2 className="font-display text-xl font-bold text-textPrimary border-b border-border pb-2">
          Exam Patterns Covered
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border border-border bg-surface dark:bg-slate-800 rounded-2xl">
            <h3 className="font-bold text-sm text-accent">RRB NTPC</h3>
            <p className="text-xs text-textMuted mt-1 leading-relaxed">
              Covers Non-Technical Popular Categories including Station Master, Goods Guard, Clerk, Commercial Apprentice, and Traffic Assistant positions.
            </p>
          </div>
          <div className="p-5 border border-border bg-surface dark:bg-slate-800 rounded-2xl">
            <h3 className="font-bold text-sm text-primary dark:text-blue-400">RRB Group D (Level 1)</h3>
            <p className="text-xs text-textMuted mt-1 leading-relaxed">
              Covers track maintainer, helper/assistant in various departments, and porter roles with strong science and arithmetic weights.
            </p>
          </div>
          <div className="p-5 border border-border bg-surface dark:bg-slate-800 rounded-2xl">
            <h3 className="font-bold text-sm text-success">RRB ALP (Loco Pilot)</h3>
            <p className="text-xs text-textMuted mt-1 leading-relaxed">
              Focuses on engineering concepts, arithmetic velocity questions, reasoning skills, and technological basic awareness.
            </p>
          </div>
          <div className="p-5 border border-border bg-surface dark:bg-slate-800 rounded-2xl">
            <h3 className="font-bold text-sm text-orange-500">RRB JE (Junior Engineer)</h3>
            <p className="text-xs text-textMuted mt-1 leading-relaxed">
              Emphasizes physics, chemistry, basic computer concepts, environmental awareness, and logical reasoning structures.
            </p>
          </div>
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="p-6 rounded-3xl bg-slate-900 text-slate-300 border border-slate-800 flex gap-4 items-start shadow-md">
        <ShieldAlert className="w-8 h-8 text-accent flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs">
          <span className="font-bold text-white uppercase tracking-wider">Independent Study Resource Disclaimer</span>
          <p className="leading-relaxed">
            This platform is an independent study resource. Questions are compiled from publicly available previous year papers and memory-based recollections. This site is not affiliated with the Railway Recruitment Board (RRB), Railway Recruitment Cell (RRC), or the Ministry of Railways, Government of India.
          </p>
          <p className="text-slate-400">
            For official notifications, exam schedules, and applications, please visit official government portals like rrbcdg.gov.in.
          </p>
        </div>
      </section>

    </div>
  );
};
export default About;
