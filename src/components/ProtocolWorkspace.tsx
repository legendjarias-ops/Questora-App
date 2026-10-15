/**
 * Nova-Principia Protocol Workspace
 * Comprehensive 11-stage orchestrator covering Intention, Prediction, Preview,
 * Pre-Learning Filter, Deep Dive, 15-Question Practice, System Integration,
 * Socratic Debate, Mastery Gate, Next Concept, Chapter Map, and Spaced Revision.
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ConceptDefinition,
  ConceptSessionState,
  CourseDefinition,
  ProtocolStage,
  AssistanceLevel,
  SocraticTurn,
} from '../types';
import { StorageService } from '../services/storage';
import { TutorApi } from '../services/tutorApi';
import { AICoachCard } from './AICoachCard';
import { MindMapCanvas } from './MindMapCanvas';
import { VisualSimulator } from './VisualSimulator';

interface ProtocolWorkspaceProps {
  course: CourseDefinition;
  concept: ConceptDefinition;
  session: ConceptSessionState;
  onUpdateSession: (updated: ConceptSessionState) => void;
  onSelectConcept: (conceptId: string) => void;
  onNavigateToRecall: () => void;
}

const PROTOCOL_STAGES: { id: ProtocolStage; label: string; number: string }[] = [
  { id: 'stage_0_intention', label: 'Intention', number: '00' },
  { id: 'stage_1_prediction', label: 'Prediction', number: '01' },
  { id: 'stage_2_preview', label: 'Preview', number: '02' },
  { id: 'stage_3_filter', label: 'Motive & Filter', number: '03' },
  { id: 'stage_4_deep_dive', label: 'Deep Dive & Canvas', number: '04' },
  { id: 'stage_5_practice', label: '15-Q Practice', number: '05' },
  { id: 'stage_6_system', label: 'System Integration', number: '06' },
  { id: 'stage_7_debate', label: 'Socratic Debate', number: '07' },
  { id: 'stage_8_mastery_gate', label: 'Mastery Gate', number: '08' },
  { id: 'stage_9_next_concept', label: 'Next Concept', number: '09' },
  { id: 'stage_10_chapter_map', label: 'Chapter Map', number: '10' },
  { id: 'stage_11_spaced_revision', label: 'Spaced Recall', number: '11' },
];

export const ProtocolWorkspace: React.FC<ProtocolWorkspaceProps> = ({
  course,
  concept,
  session,
  onUpdateSession,
  onSelectConcept,
  onNavigateToRecall,
}) => {
  const [deepDiveSubTab, setDeepDiveSubTab] = useState<
    'canvas' | 'visual_model' | 'keywords' | 'analogy' | 'paraphrase' | 'derivation'
  >('canvas');

  // AI Evaluation states
  const [evaluatingPrediction, setEvaluatingPrediction] = useState(false);
  const [predictionFeedback, setPredictionFeedback] = useState<string | null>(null);

  const [evaluatingParaphrase, setEvaluatingParaphrase] = useState(false);
  const [paraphraseFeedback, setParaphraseFeedback] = useState<string | null>(null);

  const [studentDebateInput, setStudentDebateInput] = useState('');
  const [isDebating, setIsDebating] = useState(false);

  // Assistance level tracker
  const [activeAssistance, setActiveAssistance] = useState<AssistanceLevel>('independent');

  // Stage navigation
  const setStage = (st: ProtocolStage) => {
    onUpdateSession({ ...session, stage: st });
  };

  const advanceStage = () => {
    const currentIndex = PROTOCOL_STAGES.findIndex((s) => s.id === session.stage);
    if (currentIndex < PROTOCOL_STAGES.length - 1) {
      setStage(PROTOCOL_STAGES[currentIndex + 1].id);
    }
  };

  // --- Handlers ---
  const handleEvaluatePrediction = async () => {
    setEvaluatingPrediction(true);
    const feedback = await TutorApi.evaluatePrediction({
      conceptTitle: concept.title,
      priorKnowledge: session.prediction.priorKnowledge,
      expectedMechanism: session.prediction.expectedMechanism,
      suspectedCause: session.prediction.suspectedCause,
      uncertainties: session.prediction.uncertaintyList,
    });
    setPredictionFeedback(feedback);
    setEvaluatingPrediction(false);
  };

  const handleEvaluateParaphrase = async () => {
    setEvaluatingParaphrase(true);
    const analysis = await TutorApi.evaluateParaphrase({
      conceptTitle: concept.title,
      sourceDefinition: concept.objective,
      plainLanguage: session.explanation.plainLanguage,
      oneLineSummary: session.explanation.oneLineParaphrase,
    });
    setParaphraseFeedback(analysis);
    onUpdateSession({
      ...session,
      explanation: {
        ...session.explanation,
        aiFeedback: analysis,
      },
    });
    setEvaluatingParaphrase(false);
  };

  const handleSendDebateMessage = async () => {
    if (!studentDebateInput.trim() || isDebating) return;

    const studentTurn: SocraticTurn = {
      id: `turn_${Date.now()}`,
      sender: 'student',
      content: studentDebateInput.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedTurns = [...session.debateTurns, studentTurn];
    onUpdateSession({
      ...session,
      debateTurns: updatedTurns,
    });
    setStudentDebateInput('');
    setIsDebating(true);

    const aiReply = await TutorApi.socraticDebate({
      conceptTitle: concept.title,
      conversationHistory: updatedTurns,
      studentResponse: studentTurn.content,
      focusPoint: 'mechanism',
    });

    const aiTurn: SocraticTurn = {
      id: `turn_${Date.now() + 1}`,
      sender: 'ai_coach',
      content: aiReply,
      timestamp: new Date().toISOString(),
    };

    onUpdateSession({
      ...session,
      debateTurns: [...updatedTurns, aiTurn],
    });
    setIsDebating(false);
  };

  const handleAnswerPracticeQuestion = (questionId: string, optionIndex: number) => {
    const question = concept.questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = optionIndex === question.correctIndex;
    const existingIndex = session.practiceAttempts.findIndex((a) => a.questionId === questionId);

    const newAttempt = {
      questionId,
      selectedOptionIndex: optionIndex,
      isCorrect,
      assistanceUsed: activeAssistance,
      timestamp: new Date().toISOString(),
    };

    let updatedAttempts = [...session.practiceAttempts];
    if (existingIndex >= 0) {
      updatedAttempts[existingIndex] = newAttempt;
    } else {
      updatedAttempts.push(newAttempt);
    }

    onUpdateSession({
      ...session,
      practiceAttempts: updatedAttempts,
    });
  };

  const handleEvaluateMasteryGate = () => {
    const totalQ = concept.questions.length;
    const correctCount = session.practiceAttempts.filter((a) => a.isCorrect).length;
    const accuracy = totalQ > 0 ? (correctCount / totalQ) * 100 : 0;
    const independentCount = session.practiceAttempts.filter(
      (a) => a.assistanceUsed === 'independent' && a.isCorrect
    ).length;
    const independentRatio = totalQ > 0 ? (independentCount / totalQ) * 100 : 0;

    const hasParaphrase = session.explanation.oneLineParaphrase.length > 20;
    const passed = accuracy >= 70 && hasParaphrase;

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      // Update Recall model in storage
      const currentModel = StorageService.getMasteryModel(concept.id);
      StorageService.saveMasteryModel({
        ...currentModel,
        estimatedMastery: Math.min(100, Math.round(accuracy * 0.95)),
        uncertaintyScore: Math.max(10, Math.round(100 - accuracy)),
        independentCount: currentModel.independentCount + independentCount,
        lastAssessedDate: new Date().toISOString(),
        retentionStreak: currentModel.retentionStreak + 1,
        status: 'mastered',
      });
    }

    onUpdateSession({
      ...session,
      gateStatus: passed ? 'passed' : 'developing',
      gateEvaluation: {
        accuracyRate: Math.round(accuracy),
        independentRatio: Math.round(independentRatio),
        explanationScore: session.explanation.plainLanguage.length > 50 ? 90 : 60,
        summaryScore: hasParaphrase ? 95 : 50,
        feedback: passed
          ? 'Mastery Gate Verified. Demonstrated multi-perspective competence. Ready to integrate into chapter map and schedule spaced recall.'
          : 'Developing understanding. Review the reasoning gaps in practice questions before progressing.',
      },
    });
  };

  // Practice batch calculations (5 per batch)
  const currentBatch = session.currentBatchIndex;
  const batchQuestions = concept.questions.slice(currentBatch * 5, (currentBatch + 1) * 5);

  return (
    <div className="space-y-6">
      {/* Stage Progress Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {PROTOCOL_STAGES.map((st, idx) => {
            const isCurrent = session.stage === st.id;
            const isPast =
              PROTOCOL_STAGES.findIndex((s) => s.id === session.stage) > idx;

            return (
              <button
                key={st.id}
                onClick={() => setStage(st.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : isPast
                    ? 'bg-slate-800/80 text-slate-300 hover:text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{st.number}</span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Persistent AI Coach Card */}
      <AICoachCard
        currentStage={session.stage}
        conceptTitle={concept.title}
        onAdvanceStage={advanceStage}
        onRecordAssistance={(level) => setActiveAssistance(level)}
      />

      {/* STAGE 0: INTENTION */}
      {session.stage === 'stage_0_intention' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 00</span>
            <h2 className="text-lg font-bold text-white">Define Target Intention & Outcome</h2>
            <p className="text-xs text-slate-400">
              Set your specific cognitive finish line before consuming new explanations.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                What do you intend to be able to explain, derive, or solve independently?
              </label>
              <textarea
                rows={3}
                value={session.intention.goal}
                onChange={(e) =>
                  onUpdateSession({
                    ...session,
                    intention: { ...session.intention, goal: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Explain how photons split water to generate ATP, and derive stoichiometry for 1 glucose..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                What does successful understanding look like?
              </label>
              <input
                type="text"
                value={session.intention.desiredOutcome}
                onChange={(e) =>
                  onUpdateSession({
                    ...session,
                    intention: { ...session.intention, desiredOutcome: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Draw the complete flow without notes and solve 15 varied questions."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Available Study Time (Minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="120"
                  value={session.intention.timeAvailableMin}
                  onChange={(e) =>
                    onUpdateSession({
                      ...session,
                      intention: {
                        ...session.intention,
                        timeAvailableMin: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Prior Familiarity Level ({session.intention.initialFamiliarity}/5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={session.intention.initialFamiliarity}
                  onChange={(e) =>
                    onUpdateSession({
                      ...session,
                      intention: {
                        ...session.intention,
                        initialFamiliarity: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full accent-indigo-500 mt-2 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={advanceStage}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Save Intention & Proceed to Prediction →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 1: PREDICTION */}
      {session.stage === 'stage_1_prediction' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 01</span>
            <h2 className="text-lg font-bold text-white">Activate Prior Knowledge & Predict</h2>
            <p className="text-xs text-slate-400">
              Articulate your existing mental model before reading the authoritative textbook explanation.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                What do you already know about this concept or observation?
              </label>
              <textarea
                rows={2}
                value={session.prediction.priorKnowledge}
                onChange={(e) =>
                  onUpdateSession({
                    ...session,
                    prediction: { ...session.prediction, priorKnowledge: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                What mechanism do you predict causes it? What do you think happens step-by-step?
              </label>
              <textarea
                rows={3}
                value={session.prediction.expectedMechanism}
                onChange={(e) =>
                  onUpdateSession({
                    ...session,
                    prediction: { ...session.prediction, expectedMechanism: e.target.value },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                What are you least certain about? What specific question do you want answered?
              </label>
              <input
                type="text"
                value={session.prediction.uncertaintyList.join('; ')}
                onChange={(e) =>
                  onUpdateSession({
                    ...session,
                    prediction: {
                      ...session.prediction,
                      uncertaintyList: e.target.value.split(';').map((s) => s.trim()),
                    },
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="Separate uncertainties with semicolons..."
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleEvaluatePrediction}
                disabled={evaluatingPrediction}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
              >
                {evaluatingPrediction ? 'Analyzing Prediction...' : 'Evaluate Prediction with AI Coach'}
              </button>
              <button
                onClick={advanceStage}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors ml-auto"
              >
                Proceed to Topic Preview →
              </button>
            </div>

            {predictionFeedback && (
              <div className="p-4 bg-slate-950 rounded-lg border border-indigo-900/60 text-xs text-slate-200 leading-relaxed font-mono mt-3">
                <span className="text-indigo-400 font-sans font-semibold block mb-1">
                  AI Coach Guidance:
                </span>
                {predictionFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAGE 2: PREVIEW */}
      {session.stage === 'stage_2_preview' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 02</span>
            <h2 className="text-lg font-bold text-white">Skim & Build a Topic Preview</h2>
            <p className="text-xs text-slate-400">
              Survey the textbook structure without taking exhaustive notes. Build the high-level roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">
                Chapter Section Outline (Campbell Biology Ch. 10)
              </span>
              {[
                { title: '10.1 Overview: Light to Chemical Energy', desc: 'Photosynthesis split into two cooperative phases.' },
                { title: '10.2 Light Reactions & Photolysis', desc: 'Thylakoid electron transport, water splitting, chemiosmosis.' },
                { title: '10.3 The Calvin Cycle', desc: 'Carbon fixation via RuBisCO, reduction, RuBP regeneration.' },
                { title: '10.4 Alternative Mechanisms', desc: 'Photorespiration, C4 and CAM adaptations.' },
              ].map((sec) => (
                <div key={sec.title} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                  <div className="font-semibold text-slate-200">{sec.title}</div>
                  <div className="text-slate-400 mt-0.5">{sec.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">
                Mark Your Familiarity Before Reading Details
              </span>
              {['Purpose of Photosynthesis', 'The Photolysis of Water', 'Thylakoids & Chemiosmosis', 'RuBisCO & Calvin Cycle'].map((topic) => {
                const currentMark = session.previewMarkedConcepts[topic] || 'unfamiliar';
                return (
                  <div key={topic} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-300">{topic}</span>
                    <div className="flex items-center gap-1">
                      {(['familiar', 'unfamiliar', 'core_question'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            onUpdateSession({
                              ...session,
                              previewMarkedConcepts: {
                                ...session.previewMarkedConcepts,
                                [topic]: status,
                              },
                            })
                          }
                          className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                            currentMark === status
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {status.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Proceed to Pre-Learning Filter →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: PRE-LEARNING FILTER */}
      {session.stage === 'stage_3_filter' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 03</span>
            <h2 className="text-lg font-bold text-white">The Pre-Learning Filter</h2>
            <p className="text-xs text-slate-400">
              Every substantive concept requires Motive, Objective, and Implementation before detailed study.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-amber-400 block">
                A. Motive: Why Does It Exist?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{concept.motive}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-indigo-400 block">
                B. Objective: What Are We Solving?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{concept.objective}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 block">
                C. Implementation: How Does It Work?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{concept.implementation}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
            <div><strong>Source Citation: </strong>{concept.sourceCitation} (Page {concept.sourcePage})</div>
            <div><strong>Prerequisites: </strong>{concept.prerequisites.join(' · ')}</div>
          </div>

          <div>
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Enter Concept Deep Dive & Canvas →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: CONCEPT DEEP DIVE */}
      {session.stage === 'stage_4_deep_dive' && (
        <div className="space-y-4">
          {/* Sub-tabs for Deep Dive */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setDeepDiveSubTab('canvas')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                deepDiveSubTab === 'canvas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Concept Mind Map
            </button>
            <button
              onClick={() => setDeepDiveSubTab('visual_model')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                deepDiveSubTab === 'visual_model' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dual-Coding Visual Simulator
            </button>
            <button
              onClick={() => setDeepDiveSubTab('keywords')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                deepDiveSubTab === 'keywords' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Keywords & Grouping
            </button>
            <button
              onClick={() => setDeepDiveSubTab('analogy')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                deepDiveSubTab === 'analogy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Analogy & Limits
            </button>
            <button
              onClick={() => setDeepDiveSubTab('paraphrase')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                deepDiveSubTab === 'paraphrase' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Plain Language & One-Line Summary
            </button>
            <button
              onClick={() => setDeepDiveSubTab('derivation')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                deepDiveSubTab === 'derivation' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              First-Principles Derivation
            </button>
          </div>

          {/* SubTab 1: Canvas */}
          {deepDiveSubTab === 'canvas' && (
            <MindMapCanvas
              mindMap={session.mindMap}
              onChange={(updated) => onUpdateSession({ ...session, mindMap: updated })}
              conceptTitle={concept.title}
            />
          )}

          {/* SubTab 2: Visual Simulator */}
          {deepDiveSubTab === 'visual_model' && <VisualSimulator conceptId={concept.id} />}

          {/* SubTab 3: Keywords */}
          {deepDiveSubTab === 'keywords' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">Extracted Core Keywords & Minimal Vocabulary</h3>
                <p className="text-xs text-slate-400">
                  PACER Reference discipline: use the minimum set of words required to build the mental model.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {concept.defaultKeywords.map((kw) => (
                  <div key={kw.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{kw.word}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-900 text-indigo-400 rounded">
                        {kw.group}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">{kw.definition}</p>
                    <span className="text-[10px] text-slate-500 font-mono block pt-1">
                      Source Page {kw.sourcePage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SubTab 4: Analogy */}
          {deepDiveSubTab === 'analogy' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">Analogy Analysis & Limitation Testing</h3>
                <p className="text-xs text-slate-400">
                  PACER Analogous discipline: explore intuitive analogies, but rigorously define where they fail.
                </p>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                  <span className="font-semibold text-indigo-300 font-mono">Reference Analogy</span>
                  <p className="text-slate-200 leading-relaxed">{concept.defaultAnalogy.analogyText}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-900/60">
                    <span className="font-semibold text-emerald-300 block mb-1">What It Explains Well</span>
                    <p className="text-slate-300 leading-relaxed">{concept.defaultAnalogy.whatItExplains}</p>
                  </div>
                  <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-900/60">
                    <span className="font-semibold text-rose-300 block mb-1">Where The Analogy Fails</span>
                    <p className="text-slate-300 leading-relaxed">{concept.defaultAnalogy.whereItFails}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Own Proposed Analogy (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={session.analogyAssessment.studentProposedAnalogy}
                    onChange={(e) =>
                      onUpdateSession({
                        ...session,
                        analogyAssessment: {
                          ...session.analogyAssessment,
                          studentProposedAnalogy: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                    placeholder="Create your own real-world comparison..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* SubTab 5: Paraphrase */}
          {deepDiveSubTab === 'paraphrase' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">Synthesize in Simple Language & One-Line Paraphrase</h3>
                <p className="text-xs text-slate-400">
                  Teach it to a beginner, then distill the entire mechanism into one airtight sentence.
                </p>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Explain the mechanism in everyday simple language (as if teaching a peer):
                  </label>
                  <textarea
                    rows={3}
                    value={session.explanation.plainLanguage}
                    onChange={(e) =>
                      onUpdateSession({
                        ...session,
                        explanation: {
                          ...session.explanation,
                          plainLanguage: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                    placeholder="Explain what enters, what happens in between, and what exits..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Compress into a single-sentence paraphrase:
                  </label>
                  <input
                    type="text"
                    value={session.explanation.oneLineParaphrase}
                    onChange={(e) =>
                      onUpdateSession({
                        ...session,
                        explanation: {
                          ...session.explanation,
                          oneLineParaphrase: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500 font-medium"
                    placeholder="One accurate sentence preserving the essential causal mechanism..."
                  />
                </div>

                <div>
                  <button
                    onClick={handleEvaluateParaphrase}
                    disabled={evaluatingParaphrase}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    {evaluatingParaphrase ? 'Evaluating Paraphrase...' : 'Critique Paraphrase with AI Editor'}
                  </button>
                </div>

                {paraphraseFeedback && (
                  <div className="p-4 bg-slate-950 rounded-lg border border-indigo-900/60 text-xs text-slate-200 leading-relaxed font-mono">
                    <span className="text-indigo-400 font-sans font-semibold block mb-1">
                      Editor Feedback:
                    </span>
                    {paraphraseFeedback}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SubTab 6: Derivation */}
          {deepDiveSubTab === 'derivation' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">First-Principles Derivation Blueprint</h3>
                <p className="text-xs text-slate-400">
                  Derive from foundational axioms, conservation laws, and geometric representations.
                </p>
              </div>

              <div className="space-y-4 max-w-2xl text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-1">Core Physical Assumptions</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {concept.firstPrinciplesDerivation.assumptions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-1">Starting Facts & Definitions</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {concept.firstPrinciplesDerivation.startingFacts.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-indigo-900/60">
                  <span className="font-semibold text-indigo-300 block mb-2 font-mono">
                    Step-by-Step Derivation Chain
                  </span>
                  <div className="space-y-2">
                    {concept.firstPrinciplesDerivation.steps.map((step, idx) => (
                      <div key={idx} className="p-2 bg-slate-900/90 rounded border border-slate-800 text-slate-200">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-900/50">
                  <span className="font-semibold text-amber-300 block mb-1">Limiting Cases & Boundary Checks</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {concept.firstPrinciplesDerivation.limitingCases.map((lc, i) => (
                      <li key={i}>{lc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Stage Advance Button */}
          <div className="pt-2">
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Complete Deep Dive → Proceed to Immediate 15-Question Practice
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: IMMEDIATE 15-QUESTION PRACTICE */}
      {session.stage === 'stage_5_practice' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase">Stage 05</span>
              <h2 className="text-lg font-bold text-white">Immediate Concept-Specific Practice</h2>
              <p className="text-xs text-slate-400">
                15 diverse cognitive questions spanning 9 taxonomy categories. Batched in sets of 5.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-slate-400">Batch {currentBatch + 1} of {Math.ceil(concept.questions.length / 5)}</span>
              <span className="text-slate-600">·</span>
              <span className="text-indigo-400 font-semibold">
                {session.practiceAttempts.length}/{concept.questions.length} Attempted
              </span>
            </div>
          </div>

          {/* Batch Selector */}
          <div className="flex items-center gap-2 text-xs">
            {Array.from({ length: Math.ceil(concept.questions.length / 5) }).map((_, bIdx) => (
              <button
                key={bIdx}
                onClick={() => onUpdateSession({ ...session, currentBatchIndex: bIdx })}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  currentBatch === bIdx
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Batch {bIdx + 1} (Q{bIdx * 5 + 1}–Q{Math.min(concept.questions.length, (bIdx + 1) * 5)})
              </button>
            ))}
          </div>

          {/* Questions list in this batch */}
          <div className="space-y-5">
            {batchQuestions.map((q, idx) => {
              const attempt = session.practiceAttempts.find((a) => a.questionId === q.id);
              const qNumber = currentBatch * 5 + idx + 1;

              return (
                <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-400">
                        Q{qNumber}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[11px] uppercase font-mono px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                        {q.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                        {q.difficulty}
                      </span>
                    </div>

                    {attempt && (
                      <span
                        className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                          attempt.isCorrect
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {attempt.isCorrect ? 'CORRECT' : 'INCORRECT'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-200 font-medium leading-relaxed">{q.question}</p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = attempt?.selectedOptionIndex === optIdx;
                      const isCorrectChoice = optIdx === q.correctIndex;
                      const showResult = attempt !== undefined;

                      return (
                        <button
                          key={optIdx}
                          disabled={showResult}
                          onClick={() => handleAnswerPracticeQuestion(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${
                            showResult
                              ? isCorrectChoice
                                ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                                : isSelected
                                ? 'bg-rose-950/70 border-rose-600 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <span className="font-mono font-semibold text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {attempt && (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5 font-mono">
                      <div className="text-slate-300 leading-relaxed font-sans">
                        <strong className="text-white">Explanation: </strong>
                        {q.explanation}
                      </div>
                      {!attempt.isCorrect && (
                        <div className="text-rose-300 pt-1 border-t border-slate-800/60">
                          <strong>Reasoning Gap: </strong>{q.reasoningGapExplanation}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-500 pt-1">
                        Citation: {q.sourceCitation} · Assistance: {attempt.assistanceUsed}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {currentBatch < Math.ceil(concept.questions.length / 5) - 1 ? (
              <button
                onClick={() => onUpdateSession({ ...session, currentBatchIndex: currentBatch + 1 })}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors ml-auto"
              >
                Next Batch (Q{(currentBatch + 1) * 5 + 1}–{Math.min(concept.questions.length, (currentBatch + 2) * 5)}) →
              </button>
            ) : (
              <button
                onClick={advanceStage}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors ml-auto"
              >
                Proceed to System Integration →
              </button>
            )}
          </div>
        </div>
      )}

      {/* STAGE 6: SYSTEM INTEGRATION */}
      {session.stage === 'stage_6_system' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 06</span>
            <h2 className="text-lg font-bold text-white">System-Level Understanding</h2>
            <p className="text-xs text-slate-400">
              Connect this concept to the wider planetary, biological, or mathematical system.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl text-xs">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="font-semibold text-indigo-300 block">Planetary & Cellular Integration</span>
              <p className="text-slate-300 leading-relaxed">
                Photosynthesis does not exist alone. It provides the reducing carbon molecules (glucose) and O2 consumed by mitochondrial cellular respiration. The outputs of cellular respiration (CO2 and H2O) are the precise inputs for photosynthesis.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Your System Integration Notes:
              </label>
              <textarea
                rows={4}
                value={session.systemIntegrationNotes}
                onChange={(e) =>
                  onUpdateSession({
                    ...session,
                    systemIntegrationNotes: e.target.value,
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="How does this concept connect to prior knowledge or other courses?"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={advanceStage}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Proceed to Socratic AI Debate →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 7: SOCRATIC DEBATE */}
      {session.stage === 'stage_7_debate' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 07</span>
            <h2 className="text-lg font-bold text-white">The Socratic Challenge & Debate</h2>
            <p className="text-xs text-slate-400">
              Defend your mental model against counterfactuals, edge cases, and assumption probes.
            </p>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {session.debateTurns.map((turn) => {
              const isAi = turn.sender === 'ai_coach';
              return (
                <div
                  key={turn.id}
                  className={`p-3 rounded-lg text-xs leading-relaxed max-w-xl ${
                    isAi
                      ? 'bg-slate-950 border border-indigo-900/60 text-slate-200 mr-auto'
                      : 'bg-indigo-950/80 border border-indigo-700 text-indigo-100 ml-auto'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] text-slate-400 font-mono">
                    <span className="font-semibold text-indigo-400">{isAi ? 'Questora Socratic Coach' : 'You'}</span>
                    <span>{new Date(turn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p>{turn.content}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Defend your model or address the coach's question..."
              value={studentDebateInput}
              onChange={(e) => setStudentDebateInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendDebateMessage()}
              className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendDebateMessage}
              disabled={isDebating || !studentDebateInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {isDebating ? 'Thinking...' : 'Respond'}
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Proceed to Mastery Gate →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 8: MASTERY GATE */}
      {session.stage === 'stage_8_mastery_gate' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 08</span>
            <h2 className="text-lg font-bold text-white">Concept Mastery Gate Evaluation</h2>
            <p className="text-xs text-slate-400">
              Before advancing, we examine your evidence: practice accuracy, independent execution, and paraphrase precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Practice Accuracy</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {session.practiceAttempts.length > 0
                  ? `${Math.round(
                      (session.practiceAttempts.filter((a) => a.isCorrect).length /
                        session.practiceAttempts.length) *
                        100
                    )}%`
                  : '0%'}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Independent Ratio</span>
              <span className="text-xl font-bold font-mono text-indigo-400">
                {session.practiceAttempts.length > 0
                  ? `${Math.round(
                      (session.practiceAttempts.filter(
                        (a) => a.assistanceUsed === 'independent' && a.isCorrect
                      ).length /
                        session.practiceAttempts.length) *
                        100
                    )}%`
                  : '0%'}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">One-Line Paraphrase</span>
              <span className="text-xl font-bold font-mono text-cyan-400">
                {session.explanation.oneLineParaphrase.length > 20 ? 'COMPLETE' : 'INCOMPLETE'}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Gate Status</span>
              <span className="text-xs font-bold font-mono text-amber-400 uppercase">
                {session.gateStatus.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={handleEvaluateMasteryGate}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Run Mastery Gate Evaluation
            </button>
          </div>

          {session.gateEvaluation && (
            <div className="p-4 bg-slate-950 rounded-lg border border-indigo-900/60 text-xs text-slate-200 space-y-2 font-mono">
              <div className="font-semibold text-indigo-400 font-sans">Evaluation Summary:</div>
              <p>{session.gateEvaluation.feedback}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Progress to Next Stage (Chapter Synthesis) →
            </button>
            <button
              onClick={onNavigateToRecall}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors ml-auto"
            >
              Open Recall Dashboard ↗
            </button>
          </div>
        </div>
      )}

      {/* STAGE 9: NEXT CONCEPT */}
      {session.stage === 'stage_9_next_concept' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 09</span>
            <h2 className="text-lg font-bold text-white">Curriculum Progression</h2>
            <p className="text-xs text-slate-400">
              Advance along the knowledge graph sequence or solidify linked prerequisites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.chapters.flatMap((ch) =>
              ch.concepts.map((c) => (
                <div key={c.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                  <span className="font-semibold text-white">{c.title}</span>
                  <p className="text-slate-400">{c.subheading}</p>
                  <button
                    onClick={() => {
                      onSelectConcept(c.id);
                      setStage('stage_0_intention');
                    }}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium"
                  >
                    Start Concept Cycle →
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Or Build Complete Chapter Mind Map →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 10: CHAPTER MIND MAP SYNTHESIS */}
      {session.stage === 'stage_10_chapter_map' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="pb-2 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-indigo-400 uppercase">Stage 10</span>
              <h2 className="text-lg font-bold text-white">Complete Chapter Mind Map Synthesis</h2>
              <p className="text-xs text-slate-400">
                Integrate individual concept maps into a single holistic chapter graph. Verify cross-concept causal arrows.
              </p>
            </div>
            <MindMapCanvas
              mindMap={session.mindMap}
              onChange={(updated) => onUpdateSession({ ...session, mindMap: updated })}
              conceptTitle={`${course.title} (Chapter Synthesis)`}
            />
          </div>

          <div>
            <button
              onClick={advanceStage}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Proceed to Recall Spaced Revision Setup →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 11: SPACED REVISION */}
      {session.stage === 'stage_11_spaced_revision' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-indigo-400 uppercase">Stage 11</span>
            <h2 className="text-lg font-bold text-white">Recall Spaced Revision Schedule</h2>
            <p className="text-xs text-slate-400">
              The Nova-Principia revision pattern: Review 1 (Day 3), Review 2 (+7d = Day 10), Review 3 (+9d = Day 19).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-semibold block">Review 1 · Day 3</span>
              <div className="text-slate-300">
                Due: {new Date(session.spacedReviews.review1.dueDate).toLocaleDateString()}
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-2">
                Reconstruct concept map from blank canvas from memory. Teach back mechanism.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-semibold block">Review 2 · Day 10 (+7d)</span>
              <div className="text-slate-300">
                Due: {new Date(session.spacedReviews.review2.dueDate).toLocaleDateString()}
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-2">
                Examine weak relationships and solve previously difficult questions.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-semibold block">Review 3 · Day 19 (+9d)</span>
              <div className="text-slate-300">
                Due: {new Date(session.spacedReviews.review3.dueDate).toLocaleDateString()}
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-2">
                Transfer questions in new contexts. Check whether the concept remains usable.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800 text-xs space-y-2">
            <span className="font-semibold text-slate-200">Start Blank Memory Drill Now</span>
            <p className="text-slate-400 text-[11px]">
              Ready to test active retrieval? You can switch the canvas into memory reconstruction mode to redraw the nodes without peeking at the textbook.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setStage('stage_4_deep_dive')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold mr-2"
              >
                Go to Canvas Drill
              </button>
              <button
                onClick={onNavigateToRecall}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold"
              >
                View Mastery in Recall Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
