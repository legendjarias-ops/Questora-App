/**
 * Questora — The AI-Guided Learning Operating System
 * Main Application Entry Point
 */

import { useState, useEffect } from 'react';
import { CourseDefinition } from './types';
import { COURSES } from './data/curricula';
import { StorageService } from './services/storage';
import { TopNav } from './components/TopNav';
import { ProtocolWorkspace } from './components/ProtocolWorkspace';
import { AtlasWorkspace } from './components/AtlasWorkspace';
import { RecallDashboard } from './components/RecallDashboard';
import { MindMapCanvas } from './components/MindMapCanvas';
import { EvaluationModal } from './components/EvaluationModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('protocol');
  const [activeCourseId, setActiveCourseId] = useState<string>(StorageService.getActiveCourseId());
  const [activeConceptId, setActiveConceptId] = useState<string>(StorageService.getActiveConceptId());
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  const activeCourse: CourseDefinition =
    COURSES.find((c) => c.id === activeCourseId) || COURSES[0];

  const activeConcept =
    activeCourse.chapters.flatMap((ch) => ch.concepts).find((c) => c.id === activeConceptId) ||
    activeCourse.chapters[0].concepts[0];

  const [session, setSession] = useState(() => StorageService.getSession(activeConcept.id));

  // Sync state when active concept changes
  useEffect(() => {
    StorageService.setActiveCourseId(activeCourse.id);
    StorageService.setActiveConceptId(activeConcept.id);
    const loaded = StorageService.getSession(activeConcept.id);
    setSession(loaded);
  }, [activeCourse.id, activeConcept.id]);

  const handleUpdateSession = (updated: typeof session) => {
    setSession(updated);
    StorageService.saveSession(updated);
  };

  const handleSelectCourse = (course: CourseDefinition) => {
    setActiveCourseId(course.id);
    const firstConcept = course.chapters[0]?.concepts[0];
    if (firstConcept) {
      setActiveConceptId(firstConcept.id);
    }
  };

  const handleSelectConcept = (conceptId: string) => {
    setActiveConceptId(conceptId);
    // Find parent course if different
    const parentCourse = COURSES.find((c) =>
      c.chapters.some((ch) => ch.concepts.some((cp) => cp.id === conceptId))
    );
    if (parentCourse && parentCourse.id !== activeCourse.id) {
      setActiveCourseId(parentCourse.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Strict 3-zone Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCourse={activeCourse}
        onSelectCourse={handleSelectCourse}
        onOpenEvaluation={() => setIsEvaluationOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'protocol' && (
          <ProtocolWorkspace
            course={activeCourse}
            concept={activeConcept}
            session={session}
            onUpdateSession={handleUpdateSession}
            onSelectConcept={handleSelectConcept}
            onNavigateToRecall={() => setActiveTab('recall')}
          />
        )}

        {activeTab === 'atlas' && (
          <AtlasWorkspace
            course={activeCourse}
            activeConceptId={activeConcept.id}
            onSelectConcept={(id) => {
              handleSelectConcept(id);
              setActiveTab('protocol');
            }}
          />
        )}

        {activeTab === 'mindmap' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <h1 className="text-lg font-bold text-white">Concept Mind Map Workspace</h1>
                <p className="text-xs text-slate-400">
                  Direct interactive node graph for {activeConcept.title}. Connect nodes with active relationship verbs.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('protocol')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Return to Protocol Flow →
              </button>
            </div>
            <MindMapCanvas
              mindMap={session.mindMap}
              onChange={(updated) => handleUpdateSession({ ...session, mindMap: updated })}
              conceptTitle={activeConcept.title}
            />
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h1 className="text-lg font-bold text-white">Cognitive Practice Engine</h1>
                <p className="text-xs text-slate-400">
                  Targeted question sets for {activeConcept.title}.
                </p>
              </div>
              <button
                onClick={() => {
                  handleUpdateSession({ ...session, stage: 'stage_5_practice' });
                  setActiveTab('protocol');
                }}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Open in Guided Protocol →
              </button>
            </div>

            <ProtocolWorkspace
              course={activeCourse}
              concept={activeConcept}
              session={{ ...session, stage: 'stage_5_practice' }}
              onUpdateSession={handleUpdateSession}
              onSelectConcept={handleSelectConcept}
              onNavigateToRecall={() => setActiveTab('recall')}
            />
          </div>
        )}

        {activeTab === 'recall' && (
          <RecallDashboard
            course={activeCourse}
            onSelectConcept={handleSelectConcept}
            onOpenProtocol={() => setActiveTab('protocol')}
          />
        )}
      </main>

      {/* Quiet Academic Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">Questora</span>
          <span aria-hidden="true">·</span>
          <span>Understand deeply. Think independently. Remember what matters.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo sessions and clear local data?')) {
                StorageService.resetCurriculumToDemo();
                window.location.reload();
              }
            }}
            className="hover:text-slate-200 transition-colors"
          >
            Reset Demo Data
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setIsEvaluationOpen(true)}
            className="hover:text-indigo-400 transition-colors"
          >
            View Verification Report
          </button>
        </div>
      </footer>

      {/* Verification & Specification Modal */}
      <EvaluationModal
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
      />
    </div>
  );
}
