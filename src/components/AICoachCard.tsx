/**
 * Persistent AI Learning Coach & Next-Action Card
 * Implements context-aware next action, stage objectives, and the 6-level assistance ladder
 */

import React, { useState } from 'react';
import { ProtocolStage, AssistanceLevel } from '../types';

interface AICoachCardProps {
  currentStage: ProtocolStage;
  conceptTitle: string;
  onAdvanceStage?: () => void;
  onRecordAssistance?: (level: AssistanceLevel) => void;
}

interface StageGuide {
  title: string;
  stageNumber: string;
  objective: string;
  whyItMatters: string;
  nextAction: string;
  completionCriteria: string;
  hints: {
    level1: string;
    level2: string;
    scaffold: string;
    workedExample: string;
    fullExplanation: string;
  };
}

const STAGE_GUIDES: Record<ProtocolStage, StageGuide> = {
  stage_0_intention: {
    stageNumber: '00',
    title: 'Learning Target & Intention',
    objective: 'Establish your concrete target outcome before consuming information.',
    whyItMatters: 'Passive reading creates an illusion of competence. Explicit intention activates your reticular cognitive filters.',
    nextAction: 'Define what you will independently explain or derive by the end of this session.',
    completionCriteria: 'Clear outcome statement and realistic study duration configured.',
    hints: {
      level1: 'Focus on what you will be able to do without looking at any notes.',
      level2: 'Frame it as: "I want to explain mechanism X and derive formula Y."',
      scaffold: 'Goal template: "Master the dual phases of photosynthesis and solve 15 questions."',
      workedExample: 'Example: "I want to derive the splitting of water and trace where every oxygen atom exits."',
      fullExplanation: 'Setting an intention prepares your working memory to tag relevant vs tangential details in the textbook.',
    },
  },
  stage_1_prediction: {
    stageNumber: '01',
    title: 'Prior Knowledge & Prediction',
    objective: 'Make your current mental model explicit before reading the verified explanation.',
    whyItMatters: 'Prediction generates generative cognitive tension. Comparing your guess with evidence cements neural pathways.',
    nextAction: 'Write down what you believe causes this phenomenon, even if you suspect your guess is flawed.',
    completionCriteria: 'Prior knowledge, suspected mechanism, and 1+ uncertainty recorded.',
    hints: {
      level1: 'Start with everyday observations you already trust.',
      level2: 'Ask yourself: what raw ingredients enter, and what physical force acts on them?',
      scaffold: 'Consider: do plants eat soil, or do they build tissue from the invisible atmosphere?',
      workedExample: 'Example prediction: "I think light breaks water molecules, but I am unsure where carbon enters."',
      fullExplanation: 'Being wrong during prediction is actively beneficial; error correction activates striatal dopamine learning signals.',
    },
  },
  stage_2_preview: {
    stageNumber: '02',
    title: 'Skim & Topic Preview',
    objective: 'Construct a structural mental scaffold before diving into minute details.',
    whyItMatters: 'Cognitive load is drastically reduced when your brain knows the high-level roadmap in advance.',
    nextAction: 'Scan the textbook chapter headings and mark concepts as familiar vs unfamiliar.',
    completionCriteria: 'All main sections scanned; core questions highlighted.',
    hints: {
      level1: 'Do not read full paragraphs yet. Only look at headings, bold terms, and figure captions.',
      level2: 'Notice how the chapter splits into distinct energetic or mathematical phases.',
      scaffold: 'Identify the primary anatomical site (e.g., thylakoid vs stroma) before reading mechanisms.',
      workedExample: 'Example: "Phase 1 is Light Reactions (membrane); Phase 2 is Calvin Cycle (liquid stroma)."',
      fullExplanation: 'Previewing builds the cognitive coat rack where subsequent detailed knowledge will hang.',
    },
  },
  stage_3_filter: {
    stageNumber: '03',
    title: 'Pre-Learning Filter',
    objective: 'Establish the Motive, Objective, and Implementation of this concept.',
    whyItMatters: 'Concepts do not exist in isolation; they were discovered to solve specific intellectual or physical puzzles.',
    nextAction: 'Review the Motive (why this concept exists) and the Implementation blueprint.',
    completionCriteria: 'Pre-learning filter reviewed; connection to initial prediction established.',
    hints: {
      level1: 'What mystery were scientists or mathematicians trying to resolve?',
      level2: 'Think about what physical impossibility would occur if this mechanism did not exist.',
      scaffold: 'Motive: How can stationary autotrophs create high-energy carbon bonds from low-energy atmospheric CO2?',
      workedExample: 'Implementation: Separate the photon-harvesting light motor from the enzymatic carbon assembler.',
      fullExplanation: 'Understanding the motive prevents rote memorization of arbitrary formulas.',
    },
  },
  stage_4_deep_dive: {
    stageNumber: '04',
    title: 'First-Principles Deep Dive',
    objective: 'Reconstruct the mechanism: extract keywords, map relationships, and test analogies.',
    whyItMatters: 'True understanding is generative. You must be able to build the system from foundational pieces.',
    nextAction: 'Arrange keywords on the canvas, connect them with descriptive relationship verbs, and write your paraphrase.',
    completionCriteria: 'Mind map connected; interactive model explored; one-line paraphrase completed.',
    hints: {
      level1: 'Keep node labels short. Never write full paragraphs on a mind map node.',
      level2: 'Ensure every connecting arrow has an active verb label (e.g., "splits", "charges", "pumps").',
      scaffold: 'Inputs (Photons, H2O) -> Machinery (Thylakoid, PS II) -> Energy (ATP, NADPH) -> Output (O2, G3P).',
      workedExample: 'Paraphrase: "Light splits water to charge ATP/NADPH, which then powers RuBisCO to turn CO2 into sugar."',
      fullExplanation: 'Dual-coding combines spatial/visual graphs with verbal paraphrasing, doubling retention strength.',
    },
  },
  stage_5_practice: {
    stageNumber: '05',
    title: 'Immediate Concept Practice',
    objective: 'Solve 15 diverse cognitive questions spanning recall, causal reasoning, transfer, and derivations.',
    whyItMatters: 'Knowledge degrades rapidly unless immediately tested across varying cognitive dimensions.',
    nextAction: 'Attempt the current batch of 5 questions independently before inspecting hints.',
    completionCriteria: 'All 15 questions completed; reasoning gaps identified and reviewed.',
    hints: {
      level1: 'Read the question carefully: is it asking about the light reactions or the Calvin cycle?',
      level2: 'Track where the atoms or forces originate from foundational conservation laws.',
      scaffold: 'Remember Ruben & Kamen: the oxygen released comes from H2O photolysis, not CO2!',
      workedExample: 'Derivation: 6 NADPH requires 12 electrons, which requires splitting 6 water molecules.',
      fullExplanation: 'Targeted retrieval forces synaptogenesis and distinguishes recognition from true mastery.',
    },
  },
  stage_6_system: {
    stageNumber: '06',
    title: 'System-Level Integration',
    objective: 'Place the concept into its macro-system and identify cross-disciplinary connections.',
    whyItMatters: 'Isolated knowledge decays; interconnected knowledge becomes an adaptable mental lattice.',
    nextAction: 'Examine how photosynthesis anchors planetary thermodynamic equilibria and cellular respiration.',
    completionCriteria: 'System integration notes documented and connected to the course syllabus.',
    hints: {
      level1: 'What other biological or physical processes rely directly on this output?',
      level2: 'Consider energy flow: solar nuclear fusion -> photon travel -> chemical bonds -> cellular work.',
      scaffold: 'Photosynthesis produces O2 and glucose, which cellular respiration consumes to make CO2 and H2O.',
      workedExample: 'Planetary link: Banded iron formations 2.4B years ago prove when cyanobacteria evolved this process.',
      fullExplanation: 'Systems thinking protects against fragile, single-domain oversimplification.',
    },
  },
  stage_7_debate: {
    stageNumber: '07',
    title: 'Socratic Challenge & Debate',
    objective: 'Defend your understanding against counterfactuals, edge cases, and assumption probes.',
    whyItMatters: 'If you cannot defend your model against a counterargument, you do not truly understand its limits.',
    nextAction: 'Respond to the AI Coach’s Socratic challenge using evidence and causal reasoning.',
    completionCriteria: 'At least 2 rounds of intellectual defense completed with refined conclusions.',
    hints: {
      level1: 'Differentiate between established physical facts and secondary assumptions.',
      level2: 'Check boundary conditions: what happens in total darkness or extreme drought?',
      scaffold: 'Explain why the Calvin cycle stops in the dark even though it does not absorb photons.',
      workedExample: 'Argument: "The ATP/NADPH pool is consumed within seconds; without light, the fuel tankers are empty."',
      fullExplanation: 'Intellectual sparring eliminates cognitive blind spots and builds authentic confidence.',
    },
  },
  stage_8_mastery_gate: {
    stageNumber: '08',
    title: 'Concept Mastery Gate',
    objective: 'Assess multi-factor evidence to verify genuine readiness to progress.',
    whyItMatters: 'Progressing with fragile prerequisites guarantees failure on downstream advanced topics.',
    nextAction: 'Review your mastery scorecard: practice accuracy, independent performance, and paraphrase precision.',
    completionCriteria: 'Gate cleared with satisfactory independent demonstration.',
    hints: {
      level1: 'Review any questions you answered incorrectly during Stage 5.',
      level2: 'Ensure your one-line paraphrase is crisp and self-contained.',
      scaffold: 'Need an extra boost? Revisit the visual simulation to cement the flow of intermediates.',
      workedExample: 'Demonstrated mastery means you can explain the system from memory without assistance.',
      fullExplanation: 'The mastery gate is an honest mirror, not an obstacle. It protects your learning trajectory.',
    },
  },
  stage_9_next_concept: {
    stageNumber: '09',
    title: 'Curriculum Progression',
    objective: 'Advance to the next concept in the knowledge sequence or review linked prerequisites.',
    whyItMatters: 'Learning is compounding. Each mastered concept becomes a building block for the next.',
    nextAction: 'Select the next concept in the curriculum syllabus or review prerequisite bridges.',
    completionCriteria: 'Next concept selected with continuity established.',
    hints: {
      level1: 'Observe how the next concept utilizes the outputs of the concept you just mastered.',
      level2: 'Keep your previous concept mind map fresh as you transition.',
      scaffold: 'Next up: Cellular Respiration — the exact reverse thermodynamic mirror of photosynthesis.',
      workedExample: 'Notice how glucose from chloroplasts becomes the substrate for glycolysis in the cytoplasm.',
      fullExplanation: 'Curriculum continuity transforms separate lessons into a unified conceptual graph.',
    },
  },
  stage_10_chapter_map: {
    stageNumber: '10',
    title: 'Chapter Mind Map Synthesis',
    objective: 'Reconstruct the entire chapter knowledge graph into a cohesive visual synthesis.',
    whyItMatters: 'Individual concepts are puzzle pieces; the chapter map reveals the complete cognitive architecture.',
    nextAction: 'Connect your concept nodes into a global chapter graph, verifying all cross-concept causal arrows.',
    completionCriteria: 'Integrated chapter map assembled with zero orphaned nodes.',
    hints: {
      level1: 'Group concepts by their biological compartment or mathematical domain.',
      level2: 'Look for cyclic feedback loops and energy exchange pathways.',
      scaffold: 'Link Light Reactions -> Calvin Cycle -> Starch Storage -> Cellular Respiration.',
      workedExample: 'A complete chapter map shows inputs on the left, processing in the center, and outputs on the right.',
      fullExplanation: 'Reconstructing the complete map from memory is the gold standard of holistic mastery.',
    },
  },
  stage_11_spaced_revision: {
    stageNumber: '11',
    title: 'Recall Spaced Revision',
    objective: 'Lock in permanent neural retention through active retrieval at Day 3, Day 10, and Day 19 intervals.',
    whyItMatters: 'Memory traces decay exponentially unless interrupted by effortful spaced retrieval drills.',
    nextAction: 'Reconstruct the concept map from a blank canvas from memory and solve retrieval transfer drills.',
    completionCriteria: 'Review intervals recorded in Recall dashboard; active retrieval completed.',
    hints: {
      level1: 'Do not peek at your old notes before attempting to redraw the map from memory!',
      level2: 'Struggling to remember is the exact cognitive signal that triggers synaptic consolidation.',
      scaffold: 'Test yourself: list the 4 inputs, 3 machinery complexes, and 2 main products from memory.',
      workedExample: 'Day 3: Reconstruct map; Day 10: Socratic teach-back; Day 19: New context transfer test.',
      fullExplanation: 'Spaced retrieval turns short-term working memory into durable, lifelong understanding.',
    },
  },
};

export const AICoachCard: React.FC<AICoachCardProps> = ({
  currentStage,
  conceptTitle,
  onAdvanceStage,
  onRecordAssistance,
}) => {
  const [assistanceOpen, setAssistanceOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<AssistanceLevel>('independent');

  const guide = STAGE_GUIDES[currentStage] || STAGE_GUIDES.stage_0_intention;

  const selectAssistance = (level: AssistanceLevel) => {
    setCurrentLevel(level);
    if (onRecordAssistance) {
      onRecordAssistance(level);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm text-slate-100">
      {/* Header bar: Stage and Objective */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold text-indigo-400">
            {guide.stageNumber}
          </span>
          <span className="text-slate-600" aria-hidden="true">
            ·
          </span>
          <h2 className="text-sm font-semibold text-slate-200">
            {guide.title}
          </h2>
          <span className="text-slate-600 hidden md:inline" aria-hidden="true">
            ·
          </span>
          <span className="text-xs text-slate-400 hidden md:inline truncate max-w-[200px]">
            {conceptTitle}
          </span>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
          <span>Nova-Principia Protocol</span>
        </div>
      </div>

      {/* Main guidance section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div>
          <span className="text-xs text-slate-400 block mb-1">
            Current Objective
          </span>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {guide.objective}
          </p>
          <span className="text-xs text-slate-400 block mt-3 mb-1">
            Why This Matters
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            {guide.whyItMatters}
          </p>
        </div>

        <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-indigo-400 font-semibold">
                Recommended Action
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Assistance: {currentLevel.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed mb-3">
              {guide.nextAction}
            </p>
            <div className="text-xs text-slate-400">
              <span className="text-slate-400 font-medium">Completion Criteria: </span>
              {guide.completionCriteria}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => setAssistanceOpen(!assistanceOpen)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors whitespace-nowrap"
            >
              {assistanceOpen ? 'Close Scaffold' : 'Need a Scaffold?'}
            </button>
            {onAdvanceStage && (
              <button
                onClick={onAdvanceStage}
                className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors whitespace-nowrap ml-auto"
              >
                Complete Stage →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Assistance Ladder Accordion */}
      {assistanceOpen && (
        <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300">
              The 6-Level Assistance Ladder
            </span>
            <span className="text-xs text-slate-400">
              Assisted attempts are marked in your Recall model
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-3">
            <button
              onClick={() => selectAssistance('hint_level_1')}
              className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                currentLevel === 'hint_level_1'
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Gentle Hint
            </button>
            <button
              onClick={() => selectAssistance('hint_level_2')}
              className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                currentLevel === 'hint_level_2'
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Focused Hint
            </button>
            <button
              onClick={() => selectAssistance('scaffold')}
              className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                currentLevel === 'scaffold'
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Partial Scaffold
            </button>
            <button
              onClick={() => selectAssistance('worked_example')}
              className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                currentLevel === 'worked_example'
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Worked Example
            </button>
            <button
              onClick={() => selectAssistance('full_explanation')}
              className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                currentLevel === 'full_explanation'
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              5. Full Solution
            </button>
          </div>

          <div className="bg-slate-900/90 rounded-md p-3 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
            {currentLevel === 'independent' && (
              <span className="text-slate-400 italic font-sans">
                No assistance selected. You are solving independently (highest mastery weight).
              </span>
            )}
            {currentLevel === 'hint_level_1' && guide.hints.level1}
            {currentLevel === 'hint_level_2' && guide.hints.level2}
            {currentLevel === 'scaffold' && guide.hints.scaffold}
            {currentLevel === 'worked_example' && guide.hints.workedExample}
            {currentLevel === 'full_explanation' && guide.hints.fullExplanation}
          </div>
        </div>
      )}
    </div>
  );
};
