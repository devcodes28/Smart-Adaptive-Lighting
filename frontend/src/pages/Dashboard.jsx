import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const { systemState } = useContext(SystemContext);

  const getPriorityInfo = () => {
    if (systemState.emergency || systemState.accident === "YES") 
      return { level: "P0", label: "SOS / ACCIDENT", color: "text-neon-red", bg: "bg-neon-red/10" };
    if (systemState.crowd === "HIGH") 
      return { level: "P1", label: "CROWD ANOMALY", color: "text-neon-amber", bg: "bg-neon-amber/10" };
    if (systemState.occupancy === "YES") 
      return { level: "P2", label: "NORMAL MOTION", color: "text-neon-cyan", bg: "bg-neon-cyan/10" };
    return { level: "P3", label: "NO ACTIVITY", color: "text-slate-500", bg: "bg-white/5" };
  };

  const priority = getPriorityInfo();

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <main className={`flex-1 ml-64 p-8 transition-all duration-500 ${systemState.emergency ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.2)]' : ''}`}>
        
        {/* Top Priority HUD */}
        <div className={`mb-8 p-6 rounded-2xl border border-white/10 backdrop-blur-md flex justify-between items-center ${priority.bg}`}>
          <div>
            <h3 className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Active Priority Logic</h3>
            <p className={`text-2xl font-black ${priority.color}`}>{priority.level} — {priority.label}</p>
          </div>
          {systemState.emergency && (
            <div className="bg-neon-red text-white px-4 py-1 rounded-full text-xs font-bold animate-pulse">
              EMERGENCY OVERRIDE
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card">
            <h3 className="text-xs text-slate-500 uppercase font-bold mb-4">Occupancy</h3>
            <p className="text-4xl font-black text-white">{systemState.occupancy}</p>
          </div>
          <div className={`glass-card ${systemState.crowd === "HIGH" ? 'neon-glow-cyan' : ''}`}>
            <h3 className="text-xs text-slate-500 uppercase font-bold mb-4">Crowd Density</h3>
            <p className="text-4xl font-black text-white">{systemState.crowd}</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xs text-slate-500 uppercase font-bold mb-4">Light Output</h3>
            <p className="text-4xl font-black text-neon-cyan">{systemState.brightness}</p>
          </div>
          <div className={`glass-card ${systemState.accident === "YES" ? 'neon-glow-red' : ''}`}>
            <h3 className="text-xs text-slate-500 uppercase font-bold mb-4">Safety State</h3>
            <p className={`text-4xl font-black ${systemState.accident === "YES" ? 'text-neon-red' : 'text-green-500'}`}>
              {systemState.accident === "YES" ? "FALL!!" : "SECURE"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}