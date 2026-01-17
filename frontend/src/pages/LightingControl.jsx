import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import { Lightbulb, Sun, Moon } from 'lucide-react';

export default function LightingControl() {
  const { systemState } = useContext(SystemContext);

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Lighting Systems</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card flex flex-col items-center justify-center text-center">
          <Sun className="text-neon-amber mb-2" size={32} />
          <h3 className="text-xs uppercase font-bold text-slate-500">Current Output</h3>
          <p className="text-4xl font-black text-white">{systemState.brightness}</p>
        </div>
        <div className="glass-card md:col-span-2">
          <h3 className="text-sm font-bold mb-4">Brightness Logic Protocol</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-xs font-mono">P0: EMERGENCY/ACCIDENT</span>
              <span className="text-neon-red font-bold">100%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-xs font-mono">P1: CROWD DETECTED</span>
              <span className="text-neon-amber font-bold">100%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-xs font-mono">P2: NORMAL OCCUPANCY</span>
              <span className="text-neon-cyan font-bold">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}