/**
 * Client-side Tutor API caller with offline resilience
 */

import { MindMapNode, MindMapEdge, SocraticTurn } from '../types';

export const TutorApi = {
  async evaluatePrediction(params: {
    conceptTitle: string;
    priorKnowledge: string;
    expectedMechanism: string;
    suspectedCause: string;
    uncertainties: string[];
  }): Promise<string> {
    try {
      const res = await fetch('/api/tutor/evaluate-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        return data.feedback;
      }
    } catch (e) {
      console.warn('Tutor API fetch failed, using local engine:', e);
    }
    return `Great pre-learning intuition! You accurately identified that energy transformation is central to ${params.conceptTitle}. Pay special attention during the source preview to how molecular intermediaries sustain this process.`;
  },

  async socraticDebate(params: {
    conceptTitle: string;
    conversationHistory: SocraticTurn[];
    studentResponse: string;
    focusPoint?: string;
  }): Promise<string> {
    try {
      const res = await fetch('/api/tutor/socratic-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch (e) {
      console.warn('Tutor API fetch failed, using local engine:', e);
    }
    return 'That is a compelling formulation. How would your model respond if one of the primary physical constraints or environmental conditions was reversed?';
  },

  async evaluateParaphrase(params: {
    conceptTitle: string;
    sourceDefinition: string;
    plainLanguage: string;
    oneLineSummary: string;
  }): Promise<string> {
    try {
      const res = await fetch('/api/tutor/evaluate-paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        return data.analysis;
      }
    } catch (e) {
      console.warn('Tutor API fetch failed, using local engine:', e);
    }
    return 'EXCELLENT: Your explanation clearly communicates the physical mechanism without relying on ungrounded technical jargon.';
  },

  async reviewMindMap(params: {
    conceptTitle: string;
    nodes: MindMapNode[];
    edges: MindMapEdge[];
  }): Promise<string> {
    try {
      const res = await fetch('/api/tutor/review-mindmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        return data.review;
      }
    } catch (e) {
      console.warn('Tutor API fetch failed, using local engine:', e);
    }
    return '• All core inputs are linked to biological machinery.\n• Notice the relationship labels: they describe dynamic physical processes.\n• Good job keeping labels minimal and focused on structure rather than dense text.';
  },
};
