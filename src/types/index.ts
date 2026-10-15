/**
 * Questora Type Definitions
 * Nova-Principia Learning Protocol, Atlas Knowledge Intelligence, Recall Adaptive Learning
 */

export type ProtocolStage =
  | 'stage_0_intention'
  | 'stage_1_prediction'
  | 'stage_2_preview'
  | 'stage_3_filter'
  | 'stage_4_deep_dive'
  | 'stage_5_practice'
  | 'stage_6_system'
  | 'stage_7_debate'
  | 'stage_8_mastery_gate'
  | 'stage_9_next_concept'
  | 'stage_10_chapter_map'
  | 'stage_11_spaced_revision';

export type AssistanceLevel =
  | 'independent'
  | 'hint_level_1'
  | 'hint_level_2'
  | 'scaffold'
  | 'worked_example'
  | 'full_explanation';

export type QuestionCategory =
  | 'recall'
  | 'causal'
  | 'diagram'
  | 'application'
  | 'transfer'
  | 'misconception'
  | 'comparison'
  | 'counterfactual'
  | 'derivation';

export interface SourceExcerpt {
  id: string;
  pageNumber: number;
  sectionTitle: string;
  quote: string;
  hasDiagram?: boolean;
  diagramDescription?: string;
}

export interface SourceDocument {
  id: string;
  title: string;
  authors: string;
  edition: string;
  type: 'textbook' | 'paper' | 'lecture_transcript' | 'diagram_archive';
  totalChapters?: number;
  verifiedCitation: string;
  excerpts: SourceExcerpt[];
}

export interface KeywordItem {
  id: string;
  word: string;
  definition: string;
  group: 'input' | 'energy' | 'machinery' | 'output' | 'constraint';
  sourcePage: number;
}

export interface MindMapNode {
  id: string;
  label: string;
  category: 'input' | 'energy' | 'machinery' | 'output' | 'process' | 'variable';
  x: number;
  y: number;
  notes?: string;
}

export interface MindMapEdge {
  id?: string;
  source: string;
  target: string;
  relationLabel: string;
}

export interface MindMapData {
  id: string;
  conceptId: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  lastModified: string;
  version: number;
  isReconstructedFromMemory?: boolean;
}

export interface AssessmentQuestion {
  id: string;
  conceptId: string;
  category: QuestionCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reasoningGapExplanation: string;
  sourceCitation: string;
  difficulty: 'foundational' | 'intermediate' | 'rigorous';
}

export interface PracticeAttempt {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  assistanceUsed: AssistanceLevel;
  timestamp: string;
}

export interface SocraticTurn {
  id: string;
  sender: 'ai_coach' | 'student';
  content: string;
  focusPoint?: 'assumption' | 'boundary_condition' | 'mechanism' | 'evidence';
  timestamp: string;
}

export interface ConceptDefinition {
  id: string;
  chapterId: string;
  title: string;
  subheading: string;
  motive: string;
  objective: string;
  implementation: string;
  prerequisites: string[];
  sourceCitation: string;
  sourcePage: number;
  defaultKeywords: KeywordItem[];
  defaultAnalogy: {
    analogyText: string;
    whatItExplains: string;
    whereItFails: string;
  };
  firstPrinciplesDerivation: {
    assumptions: string[];
    startingFacts: string[];
    steps: string[];
    limitingCases: string[];
  };
  questions: AssessmentQuestion[];
}

export interface ChapterDefinition {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  concepts: ConceptDefinition[];
}

export interface CourseDefinition {
  id: string;
  title: string;
  subject: 'biology' | 'mathematics' | 'physics';
  leadDescription: string;
  sources: SourceDocument[];
  chapters: ChapterDefinition[];
}

export interface ConceptSessionState {
  conceptId: string;
  stage: ProtocolStage;
  // Stage 0
  intention: {
    goal: string;
    desiredOutcome: string;
    timeAvailableMin: number;
    initialFamiliarity: number; // 1-5
  };
  // Stage 1
  prediction: {
    priorKnowledge: string;
    expectedMechanism: string;
    suspectedCause: string;
    uncertaintyList: string[];
    confidenceLevel: number; // 1-5
  };
  // Stage 2
  previewMarkedConcepts: Record<string, 'familiar' | 'unfamiliar' | 'core_question'>;
  // Stage 4
  selectedKeywords: string[];
  mindMap: MindMapData;
  analogyAssessment: {
    studentProposedAnalogy: string;
    identifiedBreakdownPoint: string;
  };
  explanation: {
    plainLanguage: string;
    oneLineParaphrase: string;
    aiFeedback?: string;
  };
  hypothesesNotes: string;
  // Stage 5
  practiceAttempts: PracticeAttempt[];
  currentBatchIndex: number;
  // Stage 6
  systemIntegrationNotes: string;
  // Stage 7
  debateTurns: SocraticTurn[];
  // Stage 8
  gateStatus: 'not_assessed' | 'developing' | 'passed' | 'review_recommended';
  gateEvaluation?: {
    accuracyRate: number;
    independentRatio: number;
    explanationScore: number;
    summaryScore: number;
    feedback: string;
  };
  // Stage 11 - Spaced revision
  spacedReviews: {
    day0Date: string;
    review1: { dueDate: string; completedDate?: string; score?: number };
    review2: { dueDate: string; completedDate?: string; score?: number };
    review3: { dueDate: string; completedDate?: string; score?: number };
  };
}

export interface MasteryModel {
  conceptId: string;
  estimatedMastery: number; // 0 - 100
  uncertaintyScore: number; // 0 - 100
  independentCount: number;
  assistedCount: number;
  lastAssessedDate: string;
  retentionStreak: number;
  status: 'novice' | 'learning' | 'mastered' | 'review_overdue';
}
