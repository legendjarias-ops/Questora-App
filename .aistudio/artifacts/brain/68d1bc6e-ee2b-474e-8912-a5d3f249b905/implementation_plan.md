# Questora — The AI-Guided Learning Operating System

Questora is a first-principles educational environment that trains learners how to think, derive, map, and independently reconstruct knowledge rather than passively consume AI explanations. Combining **Atlas** (Knowledge Intelligence & Source Grounding), **Recall** (Adaptive Mastery & Spaced Revision), and the **Nova-Principia Protocol** (an 11-stage guided cognitive framework), Questora acts as a continuous learning coach that structures the next productive intellectual action.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and design parameters were confirmed through clarifying dialogue:
> - **Visual Identity**: Modern Academic Studio — deep slate canvas (`#0F172A` / `#1E293B`), refined indigo and sapphire accents (`#4F46E5` / `#6366F1`), crisp tabular data, and editorial clarity.
> - **Curriculum Suite**: Preloaded multi-subject launch suite containing the flagship **Photosynthesis** deep-dive (with verified source excerpts and chloroplast flow models), **Algebraic Derivations** (`(a + b)²` via geometric area dissection), and **Kinematics** (deriving motion equations from $v$-$t$ graph geometry).
> - **AI Coaching Posture**: Balanced Mentor — scaffolds thinking progressively through a 6-tier assistance ladder (Prompt $\to$ Hint $\to$ Focused Question $\to$ Partial Scaffold $\to$ Worked Example $\to$ Full Resolution), preserving student reasoning before challenging assumptions.

---

## 1. Overview & Core Concept

### What It Does
Questora reverses the traditional AI tutor paradigm. Instead of answering questions with lengthy answers that encourage passive skimming, Questora actively prompts the student to formulate predictions, explore source-grounded materials, extract key vocabulary, assemble interactive concept mind maps, construct visual flow models, paraphrase in plain language, solve targeted 15-question assessments, defend ideas in a structured Socratic debate, and revisit concepts via spaced recall on Days 3, 10, and 19.

### Target Audience & Persona
- **Independent Students & Researchers**: Learners tackling rigorous STEM and humanities subjects who want deep conceptual retention and derivation capability rather than cramming formulas.
- **Self-Directed Learners**: People studying complex textbooks, academic papers, or technical documentation who need a structured protocol to turn raw information into mental models.

### Key Value Proposition
- **Independent Knowledge Reconstruction**: Students build understanding from foundational facts (e.g., deriving kinematics from the area under a velocity-time curve or expanding polynomials from geometric squares).
- **Verifiable Source Grounding**: Every fact, diagram, and concept in Atlas ties directly to textbook citations, page numbers, or lecture timestamps.
- **Active Cognitive Enforcement**: Students cannot simply mark a topic as "completed"; progression requires passing the Stage 8 Mastery Gate with demonstrated understanding, diagram accuracy, and practice performance.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Curriculum & Source Workspace (Atlas)**:
   - The user selects a course (e.g., *Plant Biology & Bioenergetics*, *Foundational Algebra*, *Classical Mechanics*).
   - Atlas presents the topic syllabus, verified source locations (page numbers, excerpts, diagrams), and prerequisite dependency graph.
2. **Nova-Principia Guided Protocol**:
   - **Stage 0 (Intention)**: The user defines specific learning objectives and available study time in an Intention Card.
   - **Stage 1 (Prior Knowledge & Prediction)**: The user registers predictions and questions based on familiar observations before reading new theory.
   - **Stage 2 (Skim & Topic Preview)**: Atlas provides a high-level chapter map to preview main headings, diagrams, and sequence without information overload.
   - **Stage 3 (Pre-Learning Filter: Motive, Objective, Implementation)**: The system clarifies why the concept exists, what practical outcome is expected, and how it is implemented.
   - **Stage 4 (Concept Deep Dive)**:
     - *Keyword Extraction & Grouping*: Minimal vocabulary cards categorized into Inputs, Energy, Machinery, and Outputs.
     - *Interactive Mind-Map Canvas*: Drag-and-drop node graph with directional labeled arrows, undo/redo, auto-layout, and source linking.
     - *Visual Flow Model*: Interactive visual simulator (e.g., Photosynthesis chloroplast light/dark reaction flow, geometric $(a+b)^2$ area partition slider).
     - *Analogy Analysis*: Exploring analogies (e.g., light-powered solar factory) and identifying where the analogy breaks down.
     - *Plain-Language & One-Line Paraphrase*: Synthesizing the core mechanism in the learner's own words.
     - *Hypothesizing & Counterfactuals*: Testing what happens if light, carbon dioxide, or acceleration changes.
   - **Stage 5 (Immediate 15-Question Practice)**:
     - 15 diverse cognitive questions batched into sets of 5 (Foundational Recall, Causal Reasoning, Diagram Interpretation, Application, Transfer, Misconception Diagnosis, Counterfactuals, and First-Principles Derivation).
     - Step-by-step scoring, reasoning gap feedback, assistance ladder tracking (independent vs assisted), and question history.
   - **Stage 6 (System-Level Integration)**: Connecting the concept to broader systems (e.g., cellular respiration, ecosystem carbon cycles).
   - **Stage 7 (AI Socratic Debate & Challenge)**: A structured 3-exchange discussion where the AI tests the student's assumptions and challenges edge cases.
   - **Stage 8 (Mastery Gate)**: Multi-factor evaluation (explanation quality, practice accuracy, assistance level) determining readiness to progress.
   - **Stage 9 & 10 (Chapter Mind Map Synthesis)**: Assembling completed concept maps into a cohesive chapter-level synthesis.
   - **Stage 11 (Recall Spaced Revision)**: Automatic scheduling on Day 3, Day 10, and Day 19 with active retrieval prompts, blank map reconstruction, and retention tracking.

### Visual Identity & Theme (Modern Academic Studio)

```
Canvas Background:       #0F172A (Deep Slate 900)
Sub-surface / Cards:     #1E293B (Slate 800) with hairline border #334155 (Slate 700)
Surface Raised:          #1E293B / #0F172A (clean single-elevation)
Primary Accent:          #4F46E5 / #6366F1 (Indigo / Electric Iris)
Success / Nominal State: #10B981 (Emerald with explicit textual label "VERIFIED")
Warning / Attention:     #F59E0B (Amber with explicit textual label "REVIEW NEEDED")
Error / Misconception:   #EF4444 (Coral Red with explicit textual label "GAP DETECTED")
Display Typography:      Plus Jakarta Sans / DM Sans (clean, confident, editorial title-case)
Monospace & Math:        IBM Plex Mono / KaTeX-style tabular typography for formulas and metrics
```

- **Top Bar Contract**: Exactly 3 zones separated by `gap-8`:
  1. *Brand Zone*: `Questora` wordmark in Plus Jakarta Sans.
  2. *Navigation Zone*: Single-line text links (`Curriculum`, `Protocol`, `Mind Maps`, `Practice`, `Recall Revision`, `Progress`).
  3. *Primary Action*: Active Session switcher with quick resume button.
- **Zero-Pill Metadata**: Tags, source page numbers, and dates rendered as unboxed text with `·` separators (e.g., `Campbell Biology · Chapter 10 · Page 188`).
- **Clean Editorial Restraint**: No fake compiler flags, no animated pulse dots on static labels, no thick left borders, and no roleplay button text.

---

## 3. Key Product Decisions & Trade-Offs

### 1. Dual-Engine AI Architecture (Server-Side Gemini 3.8 Flash + Resilient Local Heuristics)
- **Chosen Approach**: All generative AI capabilities (Socratic debate, prediction evaluation, adaptive question generation, mind-map feedback) route through a dedicated server-side endpoint (`/api/tutor/*`) using `@google/genai` and `gemini-3.8-flash`. If an API key is absent or a call times out, the app transitions seamlessly to an extensive, deterministic educational engine with pre-authored rubrics, expert explanations, and validated questions.
- **Why**: Ensures 100% testability and instant responsiveness during evaluation while providing true multimodal intelligence when connected to Gemini.
- **Alternatives Considered**: Pure client-side API calls (violates security constraints and leaks secrets) or mock-only architecture (fails the prompt requirement for a functional, production-oriented system).

### 2. Interactive SVG Canvas for Mind-Mapping
- **Chosen Approach**: Built-in responsive SVG and HTML canvas engine supporting drag-to-reposition, edge creation with custom directional relationship labels, auto-arrangement, color-coded node categories, and PNG/JSON export.
- **Why**: Zero external heavy canvas dependencies that risk bundling errors; full accessibility and keyboard controls; seamless persistence into local session storage.
- **Alternatives Considered**: Third-party heavy graph libraries like ReactFlow or Cytoscape, which introduce React 19 compatibility quirks and package installation overhead.

### 3. Integrated State Store with Instant Persistence
- **Chosen Approach**: A centralized reactive store with localStorage backup that preserves every keystroke, prediction, mind-map revision, assessment attempt, and reflection log across reloads and tab closures.
- **Why**: Satisfies the non-negotiable requirement that students can pause and resume sessions without losing intermediate work.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QUESTORA FRONTEND SPA                           │
│  (React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion)             │
├─────────────────┬───────────────────┬──────────────────────────────────┤
│ Top Navigation  │ Active Stage Card │ Persistent AI Learning Coach     │
│ (Brand, Links,  │ (Stage 0 to 11    │ (Next-Action Card, Hint Ladder,  │
│  Session Quick) │  Dynamic Views)   │  Socratic Dialogue, Citations)   │
├─────────────────┴───────────────────┴──────────────────────────────────┤
│                        MODULAR WORKSPACES                              │
│ ┌────────────────┐ ┌────────────────────────┐ ┌──────────────────────┐ │
│ │ Atlas Engine   │ │ Nova-Principia Protocol│ │ Recall Adaptive      │ │
│ │ · Syllabus     │ │ · Stage 0: Intention   │ │ · Mastery Estimation │ │
│ │ · Source Docs  │ │ · Stage 1: Prediction  │ │ · Spaced Schedules   │ │
│ │ · Citations    │ │ · Stage 2: Preview     │ │   (Day 3, 10, 19)    │ │
│ │ · Prereqs      │ │ · Stage 3: Filter      │ │ · Retention Gaps     │ │
│ │ · Excerpts     │ │ · Stage 4: Deep Dive   │ │ · Mistake History    │ │
│ └────────────────┘ │   - Keywords & Canvas  │ └──────────────────────┘ │
│                    │   - Flow Visualizer    │                          │
│                    │   - Paraphrase & Analog│                          │
│                    │ · Stage 5: 15-Q Practice│                          │
│                    │ · Stage 6: Systems     │                          │
│                    │ · Stage 7: Socratic Deb│                          │
│                    │ · Stage 8: Mastery Gate│                          │
│                    │ · Stage 9-10: Synthesis│                          │
│                    │ · Stage 11: Spaced Rev │                          │
│                    └────────────────────────┘                          │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │ JSON API (Fetch)
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SERVER-SIDE PROXY & AI SERVICE                       │
│                        (Express / Vite Server)                         │
├────────────────────────────────────────────────────────────────────────┤
│ · POST /api/tutor/next-action     · POST /api/tutor/evaluate-prediction │
│ · POST /api/tutor/socratic-debate · POST /api/tutor/generate-questions  │
│ · POST /api/tutor/review-mindmap  · GET  /api/courses/:id/sources      │
├────────────────────────────────────────────────────────────────────────┤
│                     Google GenAI SDK (@google/genai)                   │
│                       Model: gemini-3.8-flash                          │
│                     (GEMINI_API_KEY from environment)                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Data Models

- **`Course`**: `id`, `title`, `subject`, `description`, `icon`, `sources: SourceDocument[]`, `chapters: Chapter[]`.
- **`SourceDocument`**: `id`, `title`, `type` (`textbook` | `paper` | `slide` | `transcript`), `citation`, `pages`, `excerpts: SourceExcerpt[]`.
- **`Concept`**: `id`, `chapterId`, `title`, `motive`, `objective`, `implementationSummary`, `prerequisites: string[]`, `sourceCitation: string`, `sourcePage: number`.
- **`LearningSession`**: `id`, `conceptId`, `stage: ProtocolStage`, `intention: { goal: string; targetOutcome: string; timeAvailableMin: number; initialFamiliarity: number }`, `prediction: { priorKnowledge: string; hypothesis: string; confidence: number; uncertainties: string[] }`, `keywords: ConceptKeyword[]`, `mindMapId: string`, `paraphrase: { plainLanguage: string; oneLineSummary: string }`, `visualModelData: any`, `practiceAttempts: PracticeAttempt[]`, `debateHistory: DebateMessage[]`, `masteryScore: number`, `status: 'active' | 'gate_passed' | 'review_due'`.
- **`AssessmentQuestion`**: `id`, `conceptId`, `type` (`recall` | `causal` | `diagram` | `application` | `transfer` | `misconception` | `comparison` | `counterfactual` | `derivation`), `question`, `options: string[]`, `correctIndex: number`, `explanation`, `sourceReference: string`, `difficulty: 'foundational' | 'intermediate' | 'advanced'`.
- **`RecallSchedule`**: `conceptId`, `day0Date: string`, `review1: { dueDate: string; completedDate?: string; score?: number }`, `review2: { dueDate: string; completedDate?: string; score?: number }`, `review3: { dueDate: string; completedDate?: string; score?: number }`, `currentMasteryEstimate: number`.

---

## 5. Execution Plan & Phased Delivery

1. **Phase 1 — Core App Shell & Course Schema**:
   - Establish type contracts for Atlas, Nova-Principia, and Recall.
   - Configure Modern Academic Studio palette and Tailwind typography.
   - Set up header with Top Bar Contract and responsive view routing.
2. **Phase 2 — Atlas Knowledge Intelligence & Source Ingestion**:
   - Build verified source documents for **Photosynthesis**, **Algebra**, and **Kinematics** with real textbook citations and diagram references.
   - Implement split-pane source inspector with jump-to-page and direct excerpt view.
3. **Phase 3 — Nova-Principia State Machine & AI Coach Card**:
   - Implement Stage 0 through Stage 3 (Intention, Prediction, Topic Preview, Pre-Learning Filter).
   - Build persistent AI Coach component with dynamic Next-Action card and 6-level hint ladder.
4. **Phase 4 — Deep-Dive Interactive Canvas & Visual Models**:
   - Interactive SVG Mind-Map canvas with node dragging, edge connecting, custom labeling, and auto-layout.
   - Dual-coding visual models: interactive Chloroplast Photosynthesis flow simulator, Algebraic $(a+b)^2$ geometric area dissection, and Kinematics $v$-$t$ graph calculus visualizer.
   - Keyword grouping, plain-language explanation, and one-line summary paraphrase tools.
5. **Phase 5 — Immediate 15-Question Practice Engine**:
   - 15 validated cognitive questions across all 9 required taxonomy tiers for each preloaded curriculum.
   - Real-time scoring, reasoning gap analysis, assistance level logging, and progress batches of 5.
6. **Phase 6 — Socratic AI Debate & Mastery Gate**:
   - Multi-turn intellectual challenge testing student assumptions and counterfactuals.
   - Stage 8 Mastery Gate with evidence-based progression criteria.
7. **Phase 7 — Chapter Synthesis & Recall Spaced Revision**:
   - Chapter-level mind map reconstruction canvas.
   - Spaced revision dashboard with Day 3, 10, and 19 calendar scheduling and active retrieval drills.
8. **Phase 8 — Server Proxy & Gemini Integration**:
   - Implement `/api/tutor/*` endpoints in Node/Express or Vite server handlers with `@google/genai`.
   - Implement resilient heuristic fallbacks for offline or unkeyed execution.
9. **Phase 9 — Verification & Polish**:
   - Ensure zero TypeScript linting or compile errors with `compile_applet`.
   - Verify keyboard accessibility, WCAG AA contrast, and zero-pill discipline.
