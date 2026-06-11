import React from 'react';
import { Link } from 'react-router-dom';
import { Train, ShieldAlert } from 'lucide-react';
import { SUBJECTS } from '../data/questionSeeds';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-20 md:pb-8 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Platform Info */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-white">
                <Train className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Rail<span className="text-accent">Exam</span> Mastery
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              A comprehensive preparation ecosystem designed to help aspirants clear Indian Railways competitive examinations. Practice thousands of past questions, learn with stories, and test your speed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Study Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mock-test" className="hover:text-accent transition-colors">Mock Test Hub</Link>
              </li>
              <li>
                <Link to="/syllabus" className="hover:text-accent transition-colors">Master Syllabus</Link>
              </li>
              <li>
                <Link to="/history-stories" className="hover:text-accent transition-colors">Historical Stories</Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-accent transition-colors">Bookmarked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Subjects Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Exam Subjects</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {SUBJECTS.slice(0, 6).map((sub) => (
                <Link
                  key={sub.id}
                  to={`/subjects/${sub.id}`}
                  className="hover:text-accent transition-colors block"
                >
                  {sub.name}
                </Link>
              ))}
              <Link to="/subjects" className="text-accent hover:underline font-medium">All Subjects</Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 uppercase">Legal Disclaimer:</span>
              <p>
                This platform is an independent study resource. Questions are compiled from publicly available previous year papers and memory-based recollections. This site is not affiliated with the Railway Recruitment Board (RRB), Railway Recruitment Cell (RRC), or the Ministry of Railways, Government of India.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} RailExam Mastery. Built for railway aspirants.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline">About Us</Link>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
