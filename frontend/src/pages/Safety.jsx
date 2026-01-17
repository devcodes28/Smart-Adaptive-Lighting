import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import { ShieldAlert, Zap } from 'lucide-react';

export default function Safety() {
  const { systemState } = useContext(SystemContext);

  const triggerSOS = async () => {
    try {
      await fetch("http://localhost:5000/api/sos", { method: "POST" });
    } catch (e) {
      console.error("SOS Link failed");
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-white">Safety Protocols</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SOS Card */}
        <div className={`glass-card border-2 transition-all ${systemState.emergency ? 'border-neon-red shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-white/5'}`}>
          <div className="flex items-center gap-4 mb-6">
            <ShieldAlert className="text-neon-red" size={32} />
            <h2 className="text-xl font-bold">Manual SOS</h2>
          </div>
          <button 
            onClick={triggerSOS}
            className={`w-full py-4 rounded-xl font-black transition-all ${
              systemState.emergency ? 'bg-neon-red text-white' : 'bg-white/10 hover:bg-neon-red hover:text-white'
            }`}
          >
            {systemState.emergency ? 'EMERGENCY ACTIVE' : 'TRIGGER SOS'}
          </button>
        </div>
        
        <div className="glass-card">
          <div className="flex items-center gap-4 mb-4">
            <Zap className="text-neon-amber" size={24} />
            <h2 className="text-lg font-bold">System Integrity</h2>
          </div>
          <p className="text-slate-400 text-sm">Vision logic (P0/P1) and motion sensors are monitored in real-time.</p>
        </div>
      </div>
    </div>
  );
}