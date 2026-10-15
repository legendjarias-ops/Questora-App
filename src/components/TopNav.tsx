/**
 * Top Navigation Bar
 * Follows the strict one-row, three-zone Top Bar Contract from the Universal Frontend Design Constitution
 */

import React from 'react';
import { CourseDefinition } from '../types';
import { COURSES } from '../data/curricula';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCourse: CourseDefinition;
  onSelectCourse: (course: CourseDefinition) => void;
  onOpenEvaluation: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  activeCourse,
  onSelectCourse,
  onOpenEvaluation,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('protocol');
          }}
          className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
        >
          Questora
        </a>
        <span className="text-xs text-slate-500 hidden sm:inline" aria-hidden="true">
          ·
        </span>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          AI Learning OS
        </span>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('protocol')}
          className={`whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'protocol'
              ? 'text-white font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Learning Protocol
        </button>
        <button
          onClick={() => setActiveTab('atlas')}
          className={`whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'atlas'
              ? 'text-white font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Atlas Knowledge
        </button>
        <button
          onClick={() => setActiveTab('mindmap')}
          className={`whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'mindmap'
              ? 'text-white font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Concept Canvas
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'practice'
              ? 'text-white font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Cognitive Practice
        </button>
        <button
          onClick={() => setActiveTab('recall')}
          className={`whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'recall'
              ? 'text-white font-semibold'
              : 'hover:text-slate-200'
          }`}
        >
          Recall Spaced Revision
        </button>
        <button
          onClick={onOpenEvaluation}
          className="whitespace-nowrap shrink-0 text-slate-500 hover:text-slate-300 transition-colors text-xs"
        >
          Evaluation
        </button>
      </nav>

      {/* Zone 3: 1 primary action — Curriculum selector */}
      <div className="flex items-center gap-3 shrink-0">
        <label htmlFor="course-select" className="sr-only">
          Select Curriculum
        </label>
        <select
          id="course-select"
          value={activeCourse.id}
          onChange={(e) => {
            const found = COURSES.find((c) => c.id === e.target.value);
            if (found) onSelectCourse(found);
          }}
          className="bg-slate-800 text-slate-200 text-xs font-medium py-1.5 px-3 rounded-lg border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer whitespace-nowrap shrink-0"
        >
          {COURSES.map((course) => (
            <option key={course.id} value={course.id}>
              {course.subject === 'biology' ? 'Biology: ' : course.subject === 'mathematics' ? 'Math: ' : 'Physics: '}
              {course.title}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
