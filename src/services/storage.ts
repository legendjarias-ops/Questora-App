/**
 * Questora Storage Service
 * Persistent Local Storage Engine with Schema Migration & Session Recovery
 */

import { ConceptSessionState, CourseDefinition, MasteryModel, MindMapData } from '../types';
import { COURSES } from '../data/curricula';

const STORAGE_KEYS = {
  ACTIVE_COURSE: 'questora_active_course_id',
  ACTIVE_CONCEPT: 'questora_active_concept_id',
  CONCEPT_SESSIONS: 'questora_concept_sessions',
  MASTERY_MODELS: 'questora_mastery_models',
  CHAPTER_MIND_MAPS: 'questora_chapter_mind_maps',
  METACOGNITIVE_LOGS: 'questora_metacognitive_logs',
};

export function getDefaultMindMap(conceptId: string): MindMapData {
  if (conceptId === 'concept_photosynthesis_core') {
    return {
      id: `map_${conceptId}`,
      conceptId,
      version: 1,
      lastModified: new Date().toISOString(),
      nodes: [
        { id: 'n1', label: 'Sunlight / Photons', category: 'energy', x: 80, y: 120 },
        { id: 'n2', label: 'Water (H2O)', category: 'input', x: 80, y: 260 },
        { id: 'n3', label: 'Thylakoid Membrane (Light Rxns)', category: 'machinery', x: 300, y: 180 },
        { id: 'n4', label: 'Oxygen (O2 Byproduct)', category: 'output', x: 300, y: 340 },
        { id: 'n5', label: 'ATP & NADPH (Carriers)', category: 'energy', x: 500, y: 180 },
        { id: 'n6', label: 'Carbon Dioxide (CO2)', category: 'input', x: 500, y: 60 },
        { id: 'n7', label: 'Stroma (Calvin Cycle / RuBisCO)', category: 'machinery', x: 680, y: 180 },
        { id: 'n8', label: 'G3P / Glucose (Sugar)', category: 'output', x: 860, y: 180 },
      ],
      edges: [
        { source: 'n1', target: 'n3', relationLabel: 'excites P680/P700' },
        { source: 'n2', target: 'n3', relationLabel: 'photolysis splits into e- & H+' },
        { source: 'n3', target: 'n4', relationLabel: 'releases into air' },
        { source: 'n3', target: 'n5', relationLabel: 'charges via chemiosmosis' },
        { source: 'n5', target: 'n7', relationLabel: 'supplies energy & reducing power' },
        { source: 'n6', target: 'n7', relationLabel: 'carbon fixation' },
        { source: 'n7', target: 'n8', relationLabel: 'synthesizes triose sugars' },
      ],
    };
  }

  if (conceptId === 'concept_binomial_square') {
    return {
      id: `map_${conceptId}`,
      conceptId,
      version: 1,
      lastModified: new Date().toISOString(),
      nodes: [
        { id: 'm1', label: 'Square Perimeter (a + b)', category: 'input', x: 100, y: 150 },
        { id: 'm2', label: 'Square Area a²', category: 'machinery', x: 320, y: 80 },
        { id: 'm3', label: 'Square Area b²', category: 'machinery', x: 320, y: 240 },
        { id: 'm4', label: 'Two Rectangles 2ab', category: 'machinery', x: 540, y: 160 },
        { id: 'm5', label: 'Total Area = a² + 2ab + b²', category: 'output', x: 760, y: 160 },
      ],
      edges: [
        { source: 'm1', target: 'm2', relationLabel: 'top-left region' },
        { source: 'm1', target: 'm3', relationLabel: 'bottom-right region' },
        { source: 'm1', target: 'm4', relationLabel: 'symmetric off-diagonals' },
        { source: 'm2', target: 'm5', relationLabel: 'additive sum' },
        { source: 'm3', target: 'm5', relationLabel: 'additive sum' },
        { source: 'm4', target: 'm5', relationLabel: 'additive sum' },
      ],
    };
  }

  // Kinematics default map
  return {
    id: `map_${conceptId}`,
    conceptId,
    version: 1,
    lastModified: new Date().toISOString(),
    nodes: [
      { id: 'k1', label: 'Constant Acceleration a', category: 'input', x: 80, y: 160 },
      { id: 'k2', label: 'Initial Velocity v₀', category: 'input', x: 80, y: 280 },
      { id: 'k3', label: 'Velocity Line v(t) = v₀ + at', category: 'machinery', x: 300, y: 200 },
      { id: 'k4', label: 'Lower Rectangle Area (v₀t)', category: 'machinery', x: 520, y: 120 },
      { id: 'k5', label: 'Upper Triangle Area (½at²)', category: 'machinery', x: 520, y: 280 },
      { id: 'k6', label: 'Position x(t) = x₀ + v₀t + ½at²', category: 'output', x: 760, y: 200 },
    ],
    edges: [
      { source: 'k1', target: 'k3', relationLabel: 'slope dv/dt' },
      { source: 'k2', target: 'k3', relationLabel: 'y-intercept at t=0' },
      { source: 'k3', target: 'k4', relationLabel: 'base × height' },
      { source: 'k3', target: 'k5', relationLabel: '½ base × height' },
      { source: 'k4', target: 'k6', relationLabel: 'sum of regions' },
      { source: 'k5', target: 'k6', relationLabel: 'sum of regions' },
    ],
  };
}

export function createInitialSessionState(conceptId: string): ConceptSessionState {
  const now = new Date();
  const day0 = now.toISOString();
  const addDays = (d: Date, days: number) => {
    const copy = new Date(d);
    copy.setDate(copy.getDate() + days);
    return copy.toISOString();
  };

  const isDemo = conceptId === 'concept_photosynthesis_core';

  return {
    conceptId,
    stage: 'stage_0_intention',
    intention: {
      goal: isDemo
        ? 'Understand how plant cells harness light photons to convert water and carbon dioxide into energy-dense carbohydrates from first principles.'
        : 'Understand and independently derive the underlying mechanism and relationships of this concept.',
      desiredOutcome: isDemo
        ? 'Explain the light reactions, chemiosmosis, and the Calvin cycle without looking at notes, and solve 15 varied application problems.'
        : 'Reconstruct the core mechanism from basic axioms and explain its boundary limitations.',
      timeAvailableMin: 45,
      initialFamiliarity: isDemo ? 3 : 2,
    },
    prediction: {
      priorKnowledge: isDemo
        ? 'I know plants use sunlight, soil water, and carbon dioxide to grow, and they release oxygen.'
        : 'I have encountered the basic definition previously.',
      expectedMechanism: isDemo
        ? 'Sunlight excites something inside the leaf that splits water and binds carbon atoms together.'
        : 'The foundational variables interact geometrically or chemically to produce the outcome.',
      suspectedCause: isDemo
        ? 'Chlorophyll absorbs photon energy and drives an electron gradient.'
        : 'Conservation laws and energy transfer mechanisms.',
      uncertaintyList: isDemo
        ? ['Where does the released oxygen really come from (H2O or CO2)?', 'What is the role of ATP versus NADPH?']
        : ['What are the boundary conditions?', 'Why does this exact formula hold?'],
      confidenceLevel: 3,
    },
    previewMarkedConcepts: {
      'Purpose of Photosynthesis': 'familiar',
      'Chloroplasts and Chlorophyll': 'familiar',
      'The Photolysis of Water': 'core_question',
      'Chemiosmosis and ATP Synthase': 'unfamiliar',
      'The Calvin Cycle and RuBisCO': 'unfamiliar',
    },
    selectedKeywords: isDemo
      ? ['kw1', 'kw2', 'kw3', 'kw4', 'kw5', 'kw6', 'kw7', 'kw8']
      : ['mkw1', 'mkw2', 'mkw3', 'mkw4', 'mkw5'],
    mindMap: getDefaultMindMap(conceptId),
    analogyAssessment: {
      studentProposedAnalogy: isDemo
        ? 'A solar-powered automated assembly factory: light panels generate electricity and charge battery packs, which then power robotic welders to fuse raw incoming steel beams.'
        : '',
      identifiedBreakdownPoint: isDemo
        ? 'Biological cells lack rigid mechanical robotic welders; they rely on microscopic Brownian motion, quantum electron orbital excitation, and enzyme conformational shifts.'
        : '',
    },
    explanation: {
      plainLanguage: isDemo
        ? 'Photosynthesis splits water using light energy in the thylakoid membrane to create ATP and NADPH, releasing oxygen as a byproduct. Then, in the stroma, RuBisCO uses that energy to build sugars from carbon dioxide.'
        : '',
      oneLineParaphrase: isDemo
        ? 'Light-driven water photolysis generates ATP and NADPH to power RuBisCO-catalyzed carbon fixation in the stroma.'
        : '',
    },
    hypothesesNotes: isDemo
      ? 'If we deprive a plant of CO2, NADPH will accumulate because the Calvin cycle cannot consume it, and excess photon energy must be quenched as heat or fluorescence.'
      : '',
    practiceAttempts: [],
    currentBatchIndex: 0,
    systemIntegrationNotes: isDemo
      ? 'Photosynthesis is the planetary thermodynamic anchor: it captures ~130 terawatts of solar energy, producing oxygen that sustains aerobic cellular respiration and atmospheric ozone.'
      : '',
    debateTurns: isDemo
      ? [
          {
            id: 'd1',
            sender: 'ai_coach',
            content:
              'Welcome to the Socratic Challenge. Let us test your mental model: You stated that plants need sunlight to make glucose. Does light directly participate in the chemical reaction that builds the glucose molecule from carbon dioxide?',
            focusPoint: 'mechanism',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 'd2',
            sender: 'student',
            content:
              'No! Light energy is only used in the thylakoids to create ATP and NADPH. The Calvin cycle in the stroma that actually binds carbon into sugar does not directly absorb light photons.',
            focusPoint: 'mechanism',
            timestamp: new Date(Date.now() - 3500000).toISOString(),
          },
          {
            id: 'd3',
            sender: 'ai_coach',
            content:
              'Precise reasoning. But if the Calvin cycle does not require photons, why does it halt within minutes of turning off the lights in a living leaf?',
            focusPoint: 'boundary_condition',
            timestamp: new Date(Date.now() - 3400000).toISOString(),
          },
          {
            id: 'd4',
            sender: 'student',
            content:
              'Because the pools of ATP and NADPH generated by the light reactions are tiny and turn over within seconds. Once light stops, those carriers are exhausted, so the Calvin cycle starves for reducing power and energy.',
            focusPoint: 'evidence',
            timestamp: new Date(Date.now() - 3300000).toISOString(),
          },
        ]
      : [],
    gateStatus: 'not_assessed',
    spacedReviews: {
      day0Date: day0,
      review1: { dueDate: addDays(now, 3) },
      review2: { dueDate: addDays(now, 10) },
      review3: { dueDate: addDays(now, 19) },
    },
  };
}

export const StorageService = {
  getActiveCourseId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_COURSE) || 'bio_photosynthesis';
  },

  setActiveCourseId(courseId: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_COURSE, courseId);
  },

  getActiveConceptId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CONCEPT) || 'concept_photosynthesis_core';
  },

  setActiveConceptId(conceptId: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CONCEPT, conceptId);
  },

  getSession(conceptId: string): ConceptSessionState {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.CONCEPT_SESSIONS}_${conceptId}`);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }
    const initial = createInitialSessionState(conceptId);
    this.saveSession(initial);
    return initial;
  },

  saveSession(session: ConceptSessionState) {
    try {
      localStorage.setItem(`${STORAGE_KEYS.CONCEPT_SESSIONS}_${session.conceptId}`, JSON.stringify(session));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  getMasteryModel(conceptId: string): MasteryModel {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.MASTERY_MODELS}_${conceptId}`);
      if (raw) return JSON.parse(raw);
    } catch {}

    const isDemo = conceptId === 'concept_photosynthesis_core';
    const defaultModel: MasteryModel = {
      conceptId,
      estimatedMastery: isDemo ? 68 : 20,
      uncertaintyScore: isDemo ? 24 : 70,
      independentCount: isDemo ? 7 : 0,
      assistedCount: isDemo ? 2 : 0,
      lastAssessedDate: new Date().toISOString(),
      retentionStreak: isDemo ? 1 : 0,
      status: isDemo ? 'learning' : 'novice',
    };
    this.saveMasteryModel(defaultModel);
    return defaultModel;
  },

  saveMasteryModel(model: MasteryModel) {
    try {
      localStorage.setItem(`${STORAGE_KEYS.MASTERY_MODELS}_${model.conceptId}`, JSON.stringify(model));
    } catch (e) {
      console.warn('Mastery save failed:', e);
    }
  },

  getChapterMindMap(courseId: string): MindMapData {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.CHAPTER_MIND_MAPS}_${courseId}`);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaultMap = getDefaultMindMap('concept_photosynthesis_core');
    return {
      ...defaultMap,
      id: `chapter_${courseId}`,
      conceptId: `chapter_${courseId}`,
    };
  },

  saveChapterMindMap(courseId: string, map: MindMapData) {
    try {
      localStorage.setItem(`${STORAGE_KEYS.CHAPTER_MIND_MAPS}_${courseId}`, JSON.stringify(map));
    } catch (e) {
      console.warn('Chapter map save failed:', e);
    }
  },

  resetCurriculumToDemo() {
    localStorage.clear();
    this.setActiveCourseId('bio_photosynthesis');
    this.setActiveConceptId('concept_photosynthesis_core');
  },
};
