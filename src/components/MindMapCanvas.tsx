/**
 * Interactive Mind Map Canvas
 * Direct SVG graph manipulation with draggable nodes, labeled directional edges,
 * relationship verbs, and AI graph critique.
 */

import React, { useState, useRef } from 'react';
import { MindMapData, MindMapNode } from '../types';
import { TutorApi } from '../services/tutorApi';

interface MindMapCanvasProps {
  mindMap: MindMapData;
  onChange: (updated: MindMapData) => void;
  conceptTitle: string;
  isMemoryReconstructionMode?: boolean;
}

export const MindMapCanvas: React.FC<MindMapCanvasProps> = ({
  mindMap,
  onChange,
  conceptTitle,
  isMemoryReconstructionMode = false,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [newRelationshipTarget, setNewRelationshipTarget] = useState<string | null>(null);
  const [relationText, setRelationText] = useState('');
  const [isCreatingEdge, setIsCreatingEdge] = useState(false);
  const [aiReviewResult, setAiReviewResult] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeCategory, setNewNodeCategory] = useState<MindMapNode['category']>('machinery');

  const svgRef = useRef<SVGSVGElement>(null);

  const categoryColors: Record<MindMapNode['category'], { bg: string; border: string; text: string }> = {
    input: { bg: '#064e3b', border: '#059669', text: '#a7f3d0' },
    energy: { bg: '#78350f', border: '#d97706', text: '#fde68a' },
    machinery: { bg: '#1e1b4b', border: '#6366f1', text: '#c7d2fe' },
    output: { bg: '#0e7490', border: '#06b6d4', text: '#a5f3fc' },
    process: { bg: '#312e81', border: '#818cf8', text: '#e0e7ff' },
    variable: { bg: '#4c1d95', border: '#a855f7', text: '#f3e8ff' },
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = mindMap.nodes.find((n) => n.id === nodeId);
    if (!node || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDraggingNodeId(nodeId);
    setSelectedNodeId(nodeId);
    setDragOffset({
      x: mouseX - node.x,
      y: mouseY - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = Math.max(30, Math.min(rect.width - 120, mouseX - dragOffset.x));
    const newY = Math.max(30, Math.min(rect.height - 50, mouseY - dragOffset.y));

    const updatedNodes = mindMap.nodes.map((n) =>
      n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n
    );

    onChange({
      ...mindMap,
      nodes: updatedNodes,
      lastModified: new Date().toISOString(),
    });
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const handleAddNode = () => {
    if (!newNodeLabel.trim()) return;
    const newNode: MindMapNode = {
      id: `node_${Date.now()}`,
      label: newNodeLabel.trim(),
      category: newNodeCategory,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 150,
    };
    onChange({
      ...mindMap,
      nodes: [...mindMap.nodes, newNode],
      lastModified: new Date().toISOString(),
      version: mindMap.version + 1,
    });
    setNewNodeLabel('');
  };

  const handleDeleteSelected = () => {
    if (!selectedNodeId) return;
    const filteredNodes = mindMap.nodes.filter((n) => n.id !== selectedNodeId);
    const filteredEdges = mindMap.edges.filter(
      (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
    );
    onChange({
      ...mindMap,
      nodes: filteredNodes,
      edges: filteredEdges,
      lastModified: new Date().toISOString(),
    });
    setSelectedNodeId(null);
  };

  const handleCreateEdge = () => {
    if (!selectedNodeId || !newRelationshipTarget || !relationText.trim()) return;
    if (selectedNodeId === newRelationshipTarget) return;

    const newEdge = {
      source: selectedNodeId,
      target: newRelationshipTarget,
      relationLabel: relationText.trim(),
    };

    onChange({
      ...mindMap,
      edges: [...mindMap.edges, newEdge],
      lastModified: new Date().toISOString(),
      version: mindMap.version + 1,
    });

    setIsCreatingEdge(false);
    setRelationText('');
    setNewRelationshipTarget(null);
  };

  const handleDeleteEdge = (index: number) => {
    const updated = [...mindMap.edges];
    updated.splice(index, 1);
    onChange({
      ...mindMap,
      edges: updated,
      lastModified: new Date().toISOString(),
    });
  };

  const handleAiReview = async () => {
    setIsReviewing(true);
    const result = await TutorApi.reviewMindMap({
      conceptTitle,
      nodes: mindMap.nodes,
      edges: mindMap.edges,
    });
    setAiReviewResult(result);
    setIsReviewing(false);
  };

  const handleClearForMemoryReconstruction = () => {
    onChange({
      ...mindMap,
      nodes: [],
      edges: [],
      isReconstructedFromMemory: true,
      lastModified: new Date().toISOString(),
      version: mindMap.version + 1,
    });
    setAiReviewResult(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">
            {isMemoryReconstructionMode ? 'Memory Retrieval Canvas' : 'Concept Relationship Canvas'}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400 font-mono">
            {mindMap.nodes.length} nodes · {mindMap.edges.length} relationships
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isMemoryReconstructionMode && (
            <button
              onClick={handleClearForMemoryReconstruction}
              className="px-2.5 py-1 text-xs text-amber-300 hover:text-amber-200 bg-amber-950/60 border border-amber-800 rounded transition-colors"
            >
              Start Blank Memory Drill
            </button>
          )}

          <button
            onClick={handleAiReview}
            disabled={isReviewing}
            className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded transition-colors"
          >
            {isReviewing ? 'Analyzing...' : 'AI Graph Review'}
          </button>
        </div>
      </div>

      {/* Node creation & Edge connection bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950/40 border-b border-slate-800 text-xs">
        <input
          type="text"
          placeholder="New concept keyword..."
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNode()}
          className="bg-slate-900 border border-slate-700 text-slate-200 px-2.5 py-1 rounded focus:outline-none focus:border-indigo-500 w-44"
        />
        <select
          value={newNodeCategory}
          onChange={(e) => setNewNodeCategory(e.target.value as MindMapNode['category'])}
          className="bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded"
        >
          <option value="input">Input / Reactant</option>
          <option value="energy">Energy Source</option>
          <option value="machinery">Machinery / Site</option>
          <option value="output">Output / Product</option>
          <option value="process">Causal Process</option>
        </select>
        <button
          onClick={handleAddNode}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-medium"
        >
          + Add Node
        </button>

        {selectedNodeId && (
          <>
            <span className="text-slate-600 mx-1">|</span>
            <button
              onClick={() => setIsCreatingEdge(!isCreatingEdge)}
              className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 text-indigo-300 rounded font-medium"
            >
              {isCreatingEdge ? 'Cancel Link' : 'Connect Selected Node →'}
            </button>
            <button
              onClick={handleDeleteSelected}
              className="px-2.5 py-1 bg-rose-950/80 border border-rose-800 text-rose-300 rounded font-medium ml-auto"
            >
              Delete Node
            </button>
          </>
        )}
      </div>

      {/* Edge creation dialog */}
      {isCreatingEdge && selectedNodeId && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-indigo-950/30 border-b border-indigo-900/60 text-xs text-indigo-200">
          <span>Connect from <strong>{mindMap.nodes.find((n) => n.id === selectedNodeId)?.label}</strong> to:</span>
          <select
            value={newRelationshipTarget || ''}
            onChange={(e) => setNewRelationshipTarget(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded"
          >
            <option value="">Select target node...</option>
            {mindMap.nodes
              .filter((n) => n.id !== selectedNodeId)
              .map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="Relationship verb (e.g. 'splits into', 'catalyzes')..."
            value={relationText}
            onChange={(e) => setRelationText(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 px-2.5 py-1 rounded w-60"
          />
          <button
            onClick={handleCreateEdge}
            disabled={!newRelationshipTarget || !relationText.trim()}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-medium rounded"
          >
            Save Relation
          </button>
        </div>
      )}

      {/* SVG Interactive Canvas */}
      <div className="relative w-full h-[460px] bg-slate-950 select-none overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => setSelectedNodeId(null)}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {/* Grid lines */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges */}
          {mindMap.edges.map((edge, index) => {
            const sourceNode = mindMap.nodes.find((n) => n.id === edge.source);
            const targetNode = mindMap.nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const sx = sourceNode.x + 80;
            const sy = sourceNode.y + 24;
            const tx = targetNode.x + 80;
            const ty = targetNode.y + 24;

            const midX = (sx + tx) / 2;
            const midY = (sy + ty) / 2;

            return (
              <g key={`edge_${index}`} className="group">
                <line
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  stroke="#475569"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="group-hover:stroke-indigo-400 transition-colors"
                />
                {/* Labeled relationship verb capsule */}
                <rect
                  x={midX - 50}
                  y={midY - 10}
                  width="100"
                  height="20"
                  rx="4"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete relation "${edge.relationLabel}"?`)) {
                      handleDeleteEdge(index);
                    }
                  }}
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="IBM Plex Mono"
                  className="pointer-events-none"
                >
                  {edge.relationLabel}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {mindMap.nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const colors = categoryColors[node.category] || categoryColors.machinery;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                className="cursor-move"
              >
                <rect
                  width="160"
                  height="48"
                  rx="8"
                  fill={colors.bg}
                  stroke={isSelected ? '#ffffff' : colors.border}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                />
                <text
                  x="80"
                  y="22"
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Plus Jakarta Sans"
                  className="pointer-events-none"
                >
                  {node.label.length > 20 ? `${node.label.slice(0, 19)}…` : node.label}
                </text>
                <text
                  x="80"
                  y="38"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="IBM Plex Mono"
                  className="pointer-events-none uppercase tracking-wider"
                >
                  {node.category}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Empty state hint */}
        {mindMap.nodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
            <span className="text-slate-400 font-medium text-sm mb-1">Canvas is ready</span>
            <p className="text-slate-400 text-xs max-w-sm">
              Add keywords from the top bar or reconstruct your mental model from memory. Drag nodes to arrange and click to connect them.
            </p>
          </div>
        )}
      </div>

      {/* AI Graph Feedback Box */}
      {aiReviewResult && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-indigo-400">
              Questora Graph Review
            </span>
            <button
              onClick={() => setAiReviewResult(null)}
              className="text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          </div>
          <div className="whitespace-pre-line text-slate-300 leading-relaxed font-mono">
            {aiReviewResult}
          </div>
        </div>
      )}
    </div>
  );
};
