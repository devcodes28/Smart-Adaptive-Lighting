import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
// We are importing Recharts directly here to avoid "Missing Component" errors
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Dashboard() {
  const { systemState } = useContext(SystemContext);

  // 1. FAIL-SAFE: If context is dead, provide default data so the app doesn't crash
  const state = systemState || { 
    occupancy: "NO", 
    accident: "NO", 
    brightness: 0, 
    emergency: false,
    crowd_status: "OFFLINE" 
  };

  // 2. INLINE CHART DATA (No external file needed)
  const chartData = [
    { time: '00:00', value: 20 }, { time: '04:00', value: 50 },
    { time: '08:00', value: 80 }, { time: '12:00', value: 40 },
    { time: '16:00', value: 60 }, { time: '20:00', value: 90 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <header>
        <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg">
          SMART<span className="text-neon-cyan">LIGHT</span>
        </h1>
        <p className="text-slate-400 uppercase tracking-widest text-sm border-l-2 border-neon-cyan pl-4 mt-2">
          System Overview
        </p>
      </header>

      {/* EMERGENCY ALERT */}
      {state.emergency && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-xl text-center font-bold animate-pulse">
          🚨 EMERGENCY PROTOCOLS ENGAGED
        </div>
      )}

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Occupancy */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Occupancy</h3>
          <p className="text-4xl font-black text-white mt-2">
            {state.occupancy === "YES" ? "DETECTED" : "CLEAR"}
          </p>
        </div>
        
        {/* Safety */}
        <div className={`bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm ${state.accident === "YES" ? "border-red-500" : ""}`}>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Safety Status</h3>
          <p className={`text-4xl font-black mt-2 ${state.accident === "YES" ? "text-red-500" : "text-emerald-400"}`}>
            {state.accident === "YES" ? "CRITICAL" : "SECURE"}
          </p>
        </div>

        {/* Lighting */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Brightness</h3>
          <p className="text-4xl font-black text-neon-cyan mt-2">
            {state.brightness}%
          </p>
        </div>

        {/* Crowd */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Crowd Level</h3>
          <p className="text-4xl font-black text-white mt-2">
            {state.crowd_status}
          </p>
        </div>
      </div>

      {/* INLINE CHART COMPONENT */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h3 className="text-slate-500 text-xs font-bold uppercase mb-4 tracking-widest">Live Traffic Analysis</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#06b6d4' }}
              />
              <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}