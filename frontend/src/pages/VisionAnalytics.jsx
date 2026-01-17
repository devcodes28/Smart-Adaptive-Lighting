import { useContext, useEffect, useState } from "react";
import { SystemContext } from "../context/SystemContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

export default function VisionAnalytics() {
  const { systemState } = useContext(SystemContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString().split(' ')[0];
      const density = systemState.crowd === "HIGH" ? 85 : (systemState.occupancy === "YES" ? 40 : 10);
      setData(prev => [...prev.slice(-14), { time, density }]);
    }, 2000);
    return () => clearInterval(interval);
  }, [systemState]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-white">System Telemetry</h1>
        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 text-neon-cyan">
          <Activity size={14} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase">Live Stream</span>
        </div>
      </div>

      <div className="glass-card h-[400px]">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Neural Density Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" hide />
            <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }} />
            <Area type="monotone" dataKey="density" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}