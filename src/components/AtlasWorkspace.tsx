/**
 * Atlas Knowledge Intelligence Workspace
 * Verified textbook excerpts, page citations, syllabus prerequisites, and source inspector.
 */

import React, { useState } from 'react';
import { CourseDefinition, SourceDocument, SourceExcerpt } from '../types';

interface AtlasWorkspaceProps {
  course: CourseDefinition;
  onSelectConcept: (conceptId: string) => void;
  activeConceptId: string;
}

export const AtlasWorkspace: React.FC<AtlasWorkspaceProps> = ({
  course,
  onSelectConcept,
  activeConceptId,
}) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(course.sources[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExcerpt, setSelectedExcerpt] = useState<SourceExcerpt | null>(
    course.sources[0]?.excerpts[0] || null
  );

  const activeSource: SourceDocument | undefined =
    course.sources.find((s) => s.id === selectedSourceId) || course.sources[0];

  const filteredExcerpts = (activeSource?.excerpts || []).filter(
    (e) =>
      e.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-indigo-400">
                Atlas Knowledge Intelligence
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                {course.subject.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {course.title}
            </h1>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Verified Source Grounding
          </div>
        </div>

        <p className="text-sm text-slate-300 mt-3 leading-relaxed max-w-3xl">
          {course.leadDescription}
        </p>

        {/* Course Syllabus / Prerequisite Sequence */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Curriculum Knowledge Sequence & Concepts
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {course.chapters.flatMap((ch) =>
              ch.concepts.map((concept) => {
                const isActive = concept.id === activeConceptId;
                return (
                  <button
                    key={concept.id}
                    onClick={() => onSelectConcept(concept.id)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-indigo-950/70 border-indigo-500 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {concept.title}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono text-indigo-400">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {concept.motive}
                    </p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                      <span>p. {concept.sourcePage}</span>
                      <span>·</span>
                      <span>{concept.questions.length} cognitive questions</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Source Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Source Selection and Excerpts List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Authorized Course Sources
            </label>
            <div className="space-y-1.5">
              {course.sources.map((src) => (
                <button
                  key={src.id}
                  onClick={() => {
                    setSelectedSourceId(src.id);
                    setSelectedExcerpt(src.excerpts[0] || null);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                    src.id === selectedSourceId
                      ? 'bg-slate-800 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-slate-200 truncate">{src.title}</div>
                  <div className="text-[11px] text-slate-400 truncate">{src.authors} ({src.edition})</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                Indexed Excerpts & Citations
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {filteredExcerpts.length} entries
              </span>
            </div>
            <input
              type="text"
              placeholder="Search source passages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500 mb-2.5"
            />
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredExcerpts.map((excerpt) => {
                const isSelected = selectedExcerpt?.id === excerpt.id;
                return (
                  <button
                    key={excerpt.id}
                    onClick={() => setSelectedExcerpt(excerpt)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-300 truncate">
                        {excerpt.sectionTitle}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 shrink-0">
                        p. {excerpt.pageNumber}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                      "{excerpt.quote}"
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Full Excerpt & Citation Grounding */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          {selectedExcerpt ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-0.5">
                    Verified Citation Grounding
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {selectedExcerpt.sectionTitle}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono px-2.5 py-1 bg-slate-950 text-slate-300 border border-slate-800 rounded">
                    Page {selectedExcerpt.pageNumber}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/90 rounded-lg border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 block mb-2 font-mono uppercase">
                  Primary Text Excerpt
                </span>
                <blockquote className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-1">
                  "{selectedExcerpt.quote}"
                </blockquote>
              </div>

              {selectedExcerpt.hasDiagram && (
                <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-indigo-300 font-mono">
                      Associated Textbook Figure / Diagram
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedExcerpt.diagramDescription}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                <div><strong>Source Citation: </strong>{activeSource?.verifiedCitation}</div>
                <div><strong>Integrity Policy: </strong>Every factual claim in Questora is grounded in verifiable page references. No hallucinated citations.</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500">
              <p>Select an excerpt from the index to review the verified textbook text.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
