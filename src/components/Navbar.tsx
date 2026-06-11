import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Train, Menu, X, BookMarked, Globe, Home, Award } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { SUBJECTS } from '../data/questionSeeds';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubjectsDropdown, setShowSubjectsDropdown] = useState(false);

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/95 backdrop-blur-md no-print">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-blue-600 text-white group-hover:bg-accent transition-colors">
              <Train className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-textPrimary">
                Rail<span className="text-accent">Exam</span>
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-primary/10 text-primary dark:bg-blue-400/10 dark:text-blue-400">
                Mastery
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-semibold' : 'text-textMuted'
                }`
              }
            >
              Home
            </NavLink>

            {/* Subjects Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowSubjectsDropdown(true)}
                onClick={() => setShowSubjectsDropdown(!showSubjectsDropdown)}
                className="flex items-center gap-1 text-sm font-medium text-textMuted hover:text-accent transition-colors focus:outline-none py-2"
              >
                Subjects
                <span className="text-[10px] transition-transform duration-200">▼</span>
              </button>

              {showSubjectsDropdown && (
                <div 
                  onMouseLeave={() => setShowSubjectsDropdown(false)}
                  className="absolute top-full right-0 mt-1 w-56 rounded-lg border border-border bg-surface p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  {SUBJECTS.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/subjects/${sub.id}`}
                      onClick={() => setShowSubjectsDropdown(false)}
                      className="block px-3 py-2 text-xs font-medium rounded-md text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                  <div className="border-t border-border my-1"></div>
                  <Link
                    to="/subjects"
                    onClick={() => setShowSubjectsDropdown(false)}
                    className="block px-3 py-2 text-xs font-semibold text-center text-primary dark:text-blue-400 hover:text-accent"
                  >
                    View All Subjects
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/mock-test"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-semibold' : 'text-textMuted'
                }`
              }
            >
              Mock Test
            </NavLink>

            <NavLink
              to="/syllabus"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-semibold' : 'text-textMuted'
                }`
              }
            >
              Syllabus
            </NavLink>

            <NavLink
              to="/history-stories"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-semibold' : 'text-textMuted'
                }`
              }
            >
              Stories
            </NavLink>

            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-semibold' : 'text-textMuted'
                }`
              }
            >
              Bookmarks
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent font-semibold' : 'text-textMuted'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/mock-test"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Start Free Test
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-textMuted hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Header Menu (Collapsible dropdown) */}
        {isOpen && (
          <div className="md:hidden border-b border-border bg-surface px-4 py-3 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/subjects"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md font-semibold"
              >
                All Subjects
              </Link>
              {SUBJECTS.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/subjects/${sub.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block pl-6 pr-3 py-1.5 text-sm font-medium text-textMuted hover:text-accent"
                >
                  {sub.name}
                </Link>
              ))}
              <Link
                to="/mock-test"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Mock Test
              </Link>
              <Link
                to="/syllabus"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Syllabus
              </Link>
              <Link
                to="/history-stories"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Stories
              </Link>
              <Link
                to="/bookmarks"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Bookmarks
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                About
              </Link>
              <div className="pt-2">
                <Link
                  to="/mock-test"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-accent/90"
                >
                  Start Free Test
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (hidden on desktop, visible on mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-16 border-t border-border bg-surface/95 backdrop-blur-md px-6 flex items-center justify-between pb-safe no-print">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-accent' : 'text-textMuted'
            }`
          }
        >
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        
        <NavLink
          to="/subjects"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-accent' : 'text-textMuted'
            }`
          }
        >
          <Globe className="h-5 w-5" />
          Subjects
        </NavLink>

        <NavLink
          to="/mock-test"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-accent' : 'text-textMuted'
            }`
          }
        >
          <Award className="h-5 w-5" />
          Test
        </NavLink>

        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-accent' : 'text-textMuted'
            }`
          }
        >
          <BookMarked className="h-5 w-5" />
          Bookmarks
        </NavLink>
      </nav>
    </>
  );
};
export default Navbar;
