import { Sun, Zap } from "lucide-react";

export default function Lighting() {
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-black text-white">Lighting Control</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Zap className="text-neon-cyan"/> Manual Override</h3>
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
          </div>
          <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neon-cyan" />
        </div>
      </div>
    </div>
  );
}