/**
 * Domain-Specific Dual-Coding Visual Simulators
 * Implements interactive biological process models, geometric algebra area dissection,
 * and kinematics v-t graph geometric calculus visualizer.
 */

import React, { useState } from 'react';

interface VisualSimulatorProps {
  conceptId: string;
}

export const VisualSimulator: React.FC<VisualSimulatorProps> = ({ conceptId }) => {
  // Biology state: Photosynthesis
  const [lightIntensity, setLightIntensity] = useState(75);
  const [co2Concentration, setCo2Concentration] = useState(420);
  const [isWaterAvailable, setIsWaterAvailable] = useState(true);

  // Math state: Binomial Area
  const [sideA, setSideA] = useState(6);
  const [sideB, setSideB] = useState(4);

  // Physics state: Kinematics
  const [v0, setV0] = useState(10);
  const [accel, setAccel] = useState(3);
  const [timeT, setTimeT] = useState(5);

  // --- Biology Calculations ---
  const atpProductionRate = isWaterAvailable ? Math.round((lightIntensity / 100) * 100) : 5;
  const carbonFixationRate = Math.min(
    atpProductionRate,
    Math.round((co2Concentration / 800) * 100)
  );
  const oxygenReleaseRate = isWaterAvailable ? Math.round(atpProductionRate * 0.95) : 0;
  const photorespirationRisk = co2Concentration < 300 && lightIntensity > 60;

  // --- Math Calculations ---
  const areaA2 = sideA * sideA;
  const areaB2 = sideB * sideB;
  const areaAB = sideA * sideB;
  const areaTotal = (sideA + sideB) * (sideA + sideB);

  // --- Physics Calculations ---
  const vFinal = v0 + accel * timeT;
  const rectArea = v0 * timeT;
  const triArea = 0.5 * accel * timeT * timeT;
  const totalDisplacement = rectArea + triArea;

  if (conceptId === 'concept_binomial_square') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Geometric Area Dissection of (a + b)²
            </h3>
            <p className="text-xs text-slate-400">
              Interactive 2D spatial proof: observe why the cross-term 2ab is required to cover the square.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">
            Total Area = {areaTotal}
          </span>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Segment a Length</span>
              <span className="font-mono text-indigo-400">{sideA} units</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              value={sideA}
              onChange={(e) => setSideA(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Segment b Length</span>
              <span className="font-mono text-emerald-400">{sideB} units</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={sideB}
              onChange={(e) => setSideB(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Interactive 2D Square Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center p-4 bg-slate-950 rounded-lg border border-slate-800">
            <svg
              width="260"
              height="260"
              viewBox="0 0 260 260"
              className="overflow-visible select-none"
            >
              {/* Outer boundary */}
              <rect x="10" y="10" width="240" height="240" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

              {/* Sub-region 1: a^2 */}
              {(() => {
                const total = sideA + sideB;
                const aFrac = (sideA / total) * 240;
                const bFrac = (sideB / total) * 240;

                return (
                  <>
                    {/* Top-left: a^2 */}
                    <rect
                      x="10"
                      y="10"
                      width={aFrac}
                      height={aFrac}
                      fill="#312e81"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <text
                      x={10 + aFrac / 2}
                      y={10 + aFrac / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#e0e7ff"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      a² ({areaA2})
                    </text>

                    {/* Top-right: ab */}
                    <rect
                      x={10 + aFrac}
                      y="10"
                      width={bFrac}
                      height={aFrac}
                      fill="#064e3b"
                      stroke="#059669"
                      strokeWidth="2"
                    />
                    <text
                      x={10 + aFrac + bFrac / 2}
                      y={10 + aFrac / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#a7f3d0"
                      fontSize="12"
                      fontWeight="600"
                    >
                      ab ({areaAB})
                    </text>

                    {/* Bottom-left: ab */}
                    <rect
                      x="10"
                      y={10 + aFrac}
                      width={aFrac}
                      height={bFrac}
                      fill="#064e3b"
                      stroke="#059669"
                      strokeWidth="2"
                    />
                    <text
                      x={10 + aFrac / 2}
                      y={10 + aFrac + bFrac / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#a7f3d0"
                      fontSize="12"
                      fontWeight="600"
                    >
                      ab ({areaAB})
                    </text>

                    {/* Bottom-right: b^2 */}
                    <rect
                      x={10 + aFrac}
                      y={10 + aFrac}
                      width={bFrac}
                      height={bFrac}
                      fill="#78350f"
                      stroke="#d97706"
                      strokeWidth="2"
                    />
                    <text
                      x={10 + aFrac + bFrac / 2}
                      y={10 + aFrac + bFrac / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fde68a"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      b² ({areaB2})
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Algebraic Breakdown */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Composite Side Dimensions</span>
              <span className="text-white text-sm">
                ({sideA} + {sideB}) = {sideA + sideB} units
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Sum of Component Regions</span>
              <div className="space-y-1 text-slate-300">
                <div>a² square: <span className="text-indigo-400">{areaA2}</span></div>
                <div>Top rectangle (ab): <span className="text-emerald-400">{areaAB}</span></div>
                <div>Bottom rectangle (ab): <span className="text-emerald-400">{areaAB}</span></div>
                <div>b² square: <span className="text-amber-400">{areaB2}</span></div>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 rounded border border-indigo-900/60 text-slate-200">
              <span className="text-indigo-300 block mb-1 font-sans font-semibold">First-Principles Identity:</span>
              <p className="text-sm">
                ({sideA} + {sideB})² = {areaA2} + 2({areaAB}) + {areaB2} = <strong className="text-white">{areaTotal}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptId === 'concept_kinematics_derivation') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Kinematics v-t Graph Calculus Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Deriving x(t) - x₀ = v₀t + ½at² from the trapezoidal area under the velocity-time line.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">
            Displacement Δx = {totalDisplacement.toFixed(1)} m
          </span>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Initial Velocity v₀</span>
              <span className="font-mono text-cyan-400">{v0} m/s</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={v0}
              onChange={(e) => setV0(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Acceleration a</span>
              <span className="font-mono text-amber-400">{accel} m/s²</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              value={accel}
              onChange={(e) => setAccel(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Elapsed Time t</span>
              <span className="font-mono text-indigo-400">{timeT} s</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={timeT}
              onChange={(e) => setTimeT(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Graph & Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex justify-center">
            <svg width="280" height="200" viewBox="0 0 280 200" className="overflow-visible select-none">
              {/* Axes */}
              <line x1="30" y1="170" x2="260" y2="170" stroke="#64748b" strokeWidth="2" />
              <line x1="30" y1="20" x2="30" y2="170" stroke="#64748b" strokeWidth="2" />
              <text x="260" y="185" fill="#94a3b8" fontSize="10" fontFamily="IBM Plex Mono">t (s)</text>
              <text x="10" y="25" fill="#94a3b8" fontSize="10" fontFamily="IBM Plex Mono">v (m/s)</text>

              {/* Coordinates scaled to canvas */}
              {(() => {
                const maxV = Math.max(50, vFinal + 10);
                const scaleY = (val: number) => 170 - (val / maxV) * 140;
                const scaleX = (val: number) => 30 + (val / 10) * 200;

                const y0 = scaleY(v0);
                const yFinal = scaleY(vFinal);
                const xT = scaleX(timeT);

                return (
                  <>
                    {/* Lower Rectangle: v0 * t */}
                    <polygon
                      points={`30,170 ${xT},170 ${xT},${y0} 30,${y0}`}
                      fill="#083344"
                      stroke="#06b6d4"
                      strokeWidth="1.5"
                    />
                    <text
                      x={(30 + xT) / 2}
                      y={(170 + y0) / 2}
                      textAnchor="middle"
                      fill="#a5f3fc"
                      fontSize="10"
                      fontFamily="IBM Plex Mono"
                    >
                      Rectangle = v₀t ({rectArea}m)
                    </text>

                    {/* Upper Triangle: 1/2 * at * t */}
                    <polygon
                      points={`30,${y0} ${xT},${y0} ${xT},${yFinal}`}
                      fill="#78350f"
                      stroke="#d97706"
                      strokeWidth="1.5"
                    />
                    <text
                      x={(30 + xT) / 2}
                      y={(y0 + yFinal) / 2 + 5}
                      textAnchor="middle"
                      fill="#fde68a"
                      fontSize="10"
                      fontFamily="IBM Plex Mono"
                    >
                      Triangle = ½at² ({triArea.toFixed(1)}m)
                    </text>

                    {/* Velocity Line */}
                    <line
                      x1="30"
                      y1={y0}
                      x2={xT}
                      y2={yFinal}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    {/* Slope label */}
                    <text
                      x={xT + 6}
                      y={yFinal}
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="IBM Plex Mono"
                    >
                      v({timeT}) = {vFinal} m/s
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Instantaneous Velocity</span>
              <span className="text-white text-sm">
                v({timeT}s) = v₀ + at = {v0} + ({accel})({timeT}) = <strong>{vFinal} m/s</strong>
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400 block mb-1">Geometric Area Composition</span>
              <div className="space-y-1 text-slate-300">
                <div>Lower Rectangle (Constant Speed): <span className="text-cyan-400">{rectArea} meters</span></div>
                <div>Upper Triangle (Acceleration Ramp): <span className="text-amber-400">{triArea.toFixed(1)} meters</span></div>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 rounded border border-indigo-900/60 text-slate-200">
              <span className="text-indigo-300 block mb-1 font-sans font-semibold">Total Trajectory Displacement:</span>
              <p className="text-sm">
                x({timeT}) - x₀ = {rectArea} + {triArea.toFixed(1)} = <strong className="text-white">{totalDisplacement.toFixed(1)} m</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Biology Photosynthesis Chloroplast Simulator
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Chloroplast Biochemical Flow Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Manipulate physiological parameters to trace photon capture, photolysis, and carbon fixation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {photorespirationRisk && (
            <span className="text-xs px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded font-mono">
              ▲ ELEVATED PHOTORESPIRATION
            </span>
          )}
          <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-mono">
            ● NOMINAL FLOW
          </span>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium">Solar Photon Flux</span>
            <span className="font-mono text-amber-400">{lightIntensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lightIntensity}
            onChange={(e) => setLightIntensity(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium">Ambient CO₂</span>
            <span className="font-mono text-indigo-400">{co2Concentration} ppm</span>
          </div>
          <input
            type="range"
            min="150"
            max="1200"
            step="10"
            value={co2Concentration}
            onChange={(e) => setCo2Concentration(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div className="flex flex-col justify-center">
          <label className="text-xs text-slate-300 font-medium mb-1.5 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isWaterAvailable}
              onChange={(e) => setIsWaterAvailable(e.target.checked)}
              className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
            />
            <span>Water Transpiration Supply</span>
          </label>
          <span className="text-[11px] text-slate-500">
            {isWaterAvailable ? 'Hydrated soil: photolysis active' : 'Severe drought: stomata closed'}
          </span>
        </div>
      </div>

      {/* Visual Chloroplast Architecture Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Thylakoid Light Engine */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-400">
              Department 1: Thylakoid Membrane
            </span>
            <span className="text-[11px] font-mono text-slate-400">Light Reactions</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Water Photolysis:</span>
              <span className="font-mono text-cyan-400">
                {isWaterAvailable ? '2 H₂O → 4 H⁺ + 4 e⁻ + O₂ ↑' : 'INHIBITED (No H₂O)'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Electron Transport Rate:</span>
              <span className="font-mono text-slate-200">{atpProductionRate}% max capacity</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Oxygen (O₂) Exhaust:</span>
              <span className="font-mono text-emerald-400">{oxygenReleaseRate} relative flux</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Output Energy Shuttles:</span>
              <span className="font-mono text-indigo-300">Charged ATP & NADPH</span>
            </div>
          </div>
        </div>

        {/* Right: Stroma Calvin Engine */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-indigo-400">
              Department 2: Aqueous Stroma
            </span>
            <span className="text-[11px] font-mono text-slate-400">Calvin Cycle</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">RuBisCO Carboxylation:</span>
              <span className="font-mono text-indigo-300">CO₂ + RuBP → 2 (3-PGA)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Available Energy Fuel:</span>
              <span className="font-mono text-slate-200">{atpProductionRate}% pool</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Triose Sugar Synthesis (G3P):</span>
              <span className="font-mono text-emerald-400">{carbonFixationRate}% rate</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Return Cycle Shuttles:</span>
              <span className="font-mono text-slate-400">Discharged ADP, Pi, NADP⁺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
