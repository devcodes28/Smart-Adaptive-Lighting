import React, { useContext, useEffect, useState } from "react";
import { getVisionHealth, getVisionModelSummary } from "../api/visionApi";
import { SystemContext } from "../context/SystemContext"; // Import Global State
import { Activity, AlertTriangle, Sun, Zap, User } from "lucide-react";

export default function VisionAnalytics() {
  const { systemState } = useContext(SystemContext); // Access live system data
  const [health, setHealth] = useState("loading");
  const [modelSummary, setModelSummary] = useState(null);

  useEffect(() => {
    const loadVisionData = async () => {
      const healthRes = await getVisionHealth();
      const summaryRes = await getVisionModelSummary();
      setHealth(healthRes?.vision ?? "error");
      setModelSummary(summaryRes);
    };
    loadVisionData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tighter">
          VISION <span className="text-cyan-400">ANALYTICS</span>
        </h1>
        <p className="text-slate-400 mt-2">Real-time Object Detection & Adaptive Logic</p>
      </header>

      {/* --- MAIN GRID: VIDEO + LIVE STATS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        
        {/* 1. CCTV FEED (Takes up 2/3 space) */}
        <div className="lg:col-span-2 bg-black rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl shadow-cyan-900/10">
          <img 
            src="http://localhost:5000/api/vision/video_feed" 
            alt="Live YOLO Feed" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'flex'; 
            }}
          />
          
          {/* Fallback Error */}
          <div className="absolute inset-0 flex flex-col items-center justify-center hidden bg-slate-900/90">
             <Activity className="text-red-500 mb-4" size={48} />
             <p className="text-red-400 font-mono">VIDEO STREAM OFFLINE</p>
          </div>

          {/* Overlays */}
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"/> LIVE FEED
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-300 bg-black/70 px-3 py-1 rounded backdrop-blur-md border border-white/10">
            CAM-01 • 1080p • 30FPS
          </div>
        </div>

        {/* 2. LIVE ANALYSIS PANEL (Takes up 1/3 space) */}
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 backdrop-blur-sm">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <Activity size={16} className="text-cyan-400"/> AI Inference
          </h3>

          {/* A. ACCIDENT STATUS */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
            systemState.accident === "YES" 
            ? "bg-red-500/20 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
            : "bg-white/5 border-white/10"
          }`}>
            <div className={`p-3 rounded-full ${systemState.accident === "YES" ? "bg-red-500 text-white" : "bg-slate-800 text-slate-500"}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Accident Status</p>
              <p className={`text-xl font-black ${systemState.accident === "YES" ? "text-red-400" : "text-emerald-400"}`}>
                {systemState.accident === "YES" ? "DETECTED" : "CLEAR"}
              </p>
            </div>
          </div>

          {/* B. HUMAN DETECTION STATUS */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
            systemState.occupancy === "YES" 
            ? "bg-cyan-500/20 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]" 
            : "bg-white/5 border-white/10"
          }`}>
            <div className={`p-3 rounded-full ${systemState.occupancy === "YES" ? "bg-cyan-500 text-black" : "bg-slate-800 text-slate-500"}`}>
              <User size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Human Detected</p>
              <p className={`text-xl font-black ${systemState.occupancy === "YES" ? "text-cyan-400" : "text-slate-500"}`}>
                {systemState.occupancy === "YES" ? "YES" : "NO"}
              </p>
            </div>
          </div>

          {/* C. ADAPTIVE BRIGHTNESS SLIDER */}
          <div className="flex-1 bg-slate-950/50 rounded-2xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center z-10 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                <Sun size={14} className="text-amber-400"/> Adaptive Dimming
              </span>
              <span className="text-2xl font-mono font-bold text-white">{systemState.brightness}%</span>
            </div>
            
            {/* The Bar Container */}
            <div className="flex-1 w-full bg-slate-800/50 rounded-xl relative overflow-hidden flex items-end">
              {/* The Moving Fill Bar */}
              <div 
                className="w-full bg-gradient-to-t from-cyan-900 via-cyan-500 to-white transition-all duration-1000 ease-in-out relative"
                style={{ height: `${systemState.brightness}%` }}
              >
                {/* Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-2 bg-white blur-md opacity-50"/>
              </div>

              {/* Grid Lines for style */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-white/50 border-t border-dashed"/>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM GRID: TECHNICAL DETAILS --- */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-xl mb-3 flex items-center gap-2">
            <Zap size={20} className="text-amber-400"/> System Health
          </h2>
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${health === 'ok' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}/>
             <span className="font-mono text-slate-300 uppercase">{health === 'ok' ? 'Online & Operational' : 'System Fault'}</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-xl mb-3">Model Configuration</h2>
          {!modelSummary ? (
            <p className="text-slate-400 text-sm">Waiting for model data...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-slate-500 uppercase">Current Model</p>
                <p className="text-cyan-400 font-mono truncate">{modelSummary.config.dataset_slug}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-slate-500 uppercase">Last Training</p>
                <p className="text-emerald-400 font-mono">{new Date(modelSummary.latest.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}