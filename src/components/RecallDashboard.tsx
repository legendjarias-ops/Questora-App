/**
 * Recall Adaptive Learning Dashboard
 * Tracks demonstrated mastery, uncertainty levels, error patterns,
 * and schedules Day 3, 10, 19 spaced revision drills.
 */

import React from 'react';
import { CourseDefinition, MasteryModel } from '../types';
import { StorageService } from '../services/storage';

interface RecallDashboardProps {
  course: CourseDefinition;
  onSelectConcept: (conceptId: string) => void;
  onOpenProtocol: () => void;
}

export const RecallDashboard: React.FC<RecallDashboardProps> = ({
  course,
  onSelectConcept,
  onOpenProtocol,
}) => {
  const allConcepts = course.chapters.flatMap((ch) => ch.concepts);

  const conceptModels: { conceptTitle: string; conceptId: string; model: MasteryModel }[] =
    allConcepts.map((c) => ({
      conceptTitle: c.title,
      conceptId: c.id,
      model: StorageService.getMasteryModel(c.id),
    }));

  const averageMastery = Math.round(
    conceptModels.reduce((acc, curr) => acc + curr.model.estimatedMastery, 0) /
      Math.max(1, conceptModels.length)
  );

  const totalIndependentAttempts = conceptModels.reduce(
    (acc, curr) => acc + curr.model.independentCount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-indigo-400">
                Recall Adaptive Learning
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                {course.title}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Adaptive Mastery & Spaced Revision Engine
            </h1>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-slate-950 text-indigo-300 border border-slate-800 rounded self-start sm:self-auto">
            Knowledge Tracing Active
          </span>
        </div>

        <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-3xl">
          Recall tracks demonstrated understanding rather than passive completion. Mastery estimates weigh independent answers, error patterns, assistance levels, and retrieval retention across the Day 3, Day 10, and Day 19 spaced intervals.
        </p>

        {/* Global Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-800 font-mono">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 text-xs block mb-1">Curriculum Mastery</span>
            <span className="text-xl font-bold text-indigo-400">{averageMastery}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 text-xs block mb-1">Independent Solves</span>
            <span className="text-xl font-bold text-emerald-400">{totalIndependentAttempts}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 text-xs block mb-1">Concepts Tracked</span>
            <span className="text-xl font-bold text-slate-200">{conceptModels.length}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 text-xs block mb-1">Revision Cycle</span>
            <span className="text-xl font-bold text-cyan-400">Day 3 / 10 / 19</span>
          </div>
        </div>
      </div>

      {/* Concept Mastery Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Demonstrated Concept Mastery</h2>
            <p className="text-xs text-slate-400">
              Mastery is an evidence-based probability estimate, not a permanent label.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {conceptModels.map(({ conceptTitle, conceptId, model }) => {
            const session = StorageService.getSession(conceptId);

            return (
              <div
                key={conceptId}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{conceptTitle}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                      <span>Status: {model.status.toUpperCase()}</span>
                      <span>·</span>
                      <span>Uncertainty: {model.uncertaintyScore}%</span>
                      <span>·</span>
                      <span>Streak: {model.retentionStreak}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="text-right">
                      <div className="text-base font-bold font-mono text-indigo-400">
                        {model.estimatedMastery}%
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">ESTIMATED MASTERY</div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectConcept(conceptId);
                        onOpenProtocol();
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                      Study Concept →
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${model.estimatedMastery}%` }}
                  />
                </div>

                {/* Spaced Review Schedule Milestones */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">REVIEW 1 (DAY 3)</span>
                    <span className="text-slate-200">
                      {new Date(session.spacedReviews.review1.dueDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">REVIEW 2 (DAY 10)</span>
                    <span className="text-slate-200">
                      {new Date(session.spacedReviews.review2.dueDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">REVIEW 3 (DAY 19)</span>
                    <span className="text-slate-200">
                      {new Date(session.spacedReviews.review3.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized Learning Guidance */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
        <h2 className="text-base font-bold text-white">Recall Cognitive Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-indigo-400 font-semibold font-mono block">Recommended Next Action</span>
            <p className="text-slate-300 leading-relaxed">
              Complete the remaining practice items in Batch 2 and Batch 3 of Photosynthesis to reduce the model uncertainty score from 24% to &lt;10%.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-amber-400 font-semibold font-mono block">Prerequisite Continuity</span>
            <p className="text-slate-300 leading-relaxed">
              When transitioning to Cellular Respiration, make sure you can explain the reverse chemiosmotic flow across the inner mitochondrial membrane without looking at references.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
