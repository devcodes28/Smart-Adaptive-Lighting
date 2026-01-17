import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Lightbulb, Eye, ShieldAlert, History, Zap, Power, AlertTriangle, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';

// --- 1. SYSTEM CONTEXT (Global State) ---
const SystemContext = createContext();

const SystemProvider = ({ children }) => {
  const [systemState, setSystemState] = useState({
    occupancy: "NO",
    accident: "NO",
    brightness: 80,
    emergency: false,
    crowd_status: "NORMAL",
    active_cameras: 4,
    power_usage: "1.2 kW"
  });

  // Simulation Loop for Live Data Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemState(prev => ({
        ...prev,
        brightness: Math.floor(Math.random() * (100 - 60) + 60),
        occupancy: Math.random() > 0.6 ? "YES" : "NO",
        power_usage: (Math.random() * (1.5 - 0.8) + 0.8).toFixed(1) + " kW"
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SystemContext.Provider value={{ systemState, setSystemState }}>
      {children}
    </SystemContext.Provider>
  );
};

// --- 2. SIDEBAR COMPONENT ---
const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Lightbulb, label: 'Lighting', path: '/lighting' },
    { icon: Eye, label: 'Vision', path: '/vision' },
    { icon: ShieldAlert, label: 'Safety', path: '/safety' },
    { icon: History, label: 'Logs', path: '/logs' },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-white/10 p-6 flex flex-col fixed left-0 top-0 z-50">
      <div className="mb-10 flex items-center gap-3">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Lightbulb className="text-cyan-400" size={24} />
        </div>
        <h1 className="text-white font-bold text-xl tracking-tight">SmartLight</h1>
      </div>
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path 
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="pt-6 border-t border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> SYSTEM ONLINE
      </div>
    </aside>
  );
};

// --- 3. DASHBOARD PAGE ---
const StatusCard = ({ label, value, color, icon: Icon }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm flex flex-col justify-between h-32 hover:bg-white/10 transition-colors">
    <div className="flex justify-between items-start">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</h3>
      {Icon && <Icon size={18} className="text-slate-600" />}
    </div>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

const Dashboard = () => {
  const { systemState } = useContext(SystemContext);
  const data = [{time:'00:00',v:20},{time:'04:00',v:40},{time:'08:00',v:80},{time:'12:00',v:50},{time:'16:00',v:70},{time:'20:00',v:90},{time:'23:00',v:30}];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-6xl font-black text-white tracking-tighter">
          SMART<span className="text-cyan-400">LIGHT</span>
        </h1>
        <p className="text-slate-400 uppercase tracking-widest text-sm mt-2 border-l-2 border-cyan-400 pl-4">System Overview</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatusCard label="Occupancy" value={systemState.occupancy === "YES" ? "DETECTED" : "CLEAR"} color="text-white" icon={Eye} />
        <StatusCard label="Safety" value={systemState.accident === "YES" ? "CRITICAL" : "SECURE"} color={systemState.accident === "YES" ? "text-red-500" : "text-emerald-400"} icon={ShieldAlert} />
        <StatusCard label="Brightness" value={systemState.brightness + "%"} color="text-cyan-400" icon={Lightbulb} />
        <StatusCard label="Power Usage" value={systemState.power_usage} color="text-white" icon={Zap} />
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-80">
        <h3 className="text-slate-500 text-xs font-bold uppercase mb-6">Live Traffic Density</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" hide />
            <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff'}} />
            <Area type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={3} fill="url(#colorV)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- 4. LIGHTING PAGE ---
const Lighting = () => {
  const { systemState } = useContext(SystemContext);
  const [manualMode, setManualMode] = useState(false);
  const [level, setLevel] = useState(systemState.brightness);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white">LIGHTING <span className="text-cyan-400">CONTROL</span></h1>
          <p className="text-slate-400 mt-2">Manage Grid Intensity & Modes</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold text-sm ${manualMode ? 'bg-amber-500 text-black' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'}`}>
          MODE: {manualMode ? "MANUAL OVERRIDE" : "ADAPTIVE AI"}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Manual Control Card */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3"><Zap className="text-amber-400"/> Intensity Level</h2>
            <span className="text-4xl font-mono font-bold text-cyan-400">{manualMode ? level : systemState.brightness}%</span>
          </div>
          
          <input 
            type="range" 
            min="0" max="100" 
            value={manualMode ? level : systemState.brightness}
            onChange={(e) => { setManualMode(true); setLevel(e.target.value); }}
            className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
          />
          <p className="text-slate-500 text-sm mt-4 text-center">Drag slider to activate Manual Mode</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setManualMode(false)} className="bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
            <div className="p-3 bg-slate-800 rounded-full group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              <CheckCircle size={24} />
            </div>
            <span className="font-bold text-white">Auto Mode</span>
          </button>
          <button onClick={() => { setManualMode(true); setLevel(0); }} className="bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
            <div className="p-3 bg-slate-800 rounded-full group-hover:bg-red-500 group-hover:text-black transition-colors">
              <Power size={24} />
            </div>
            <span className="font-bold text-white">Emergency Off</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 5. VISION PAGE ---
const Vision = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-white">VISION <span className="text-cyan-400">ANALYTICS</span></h1>
        <p className="text-slate-400 mt-2">Real-time Object Detection Stream</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 aspect-video bg-black rounded-3xl border border-white/10 relative overflow-hidden group">
          {/* Simulated Camera Feed Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
             <p className="text-red-500 font-bold animate-pulse mb-1">● LIVE FEED</p>
             <h3 className="text-white font-mono text-lg">CAM-01 [MAIN GATE]</h3>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <p className="text-slate-600 font-mono text-sm">[ WAITING FOR RTSP STREAM ]</p>
          </div>
          {/* Grid Overlay Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-slate-500 text-xs font-bold uppercase mb-2">Detected Objects</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-white">
                <span>Person</span>
                <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-bold">02</span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>Car</span>
                <span className="bg-slate-700 text-slate-400 px-2 py-1 rounded text-xs font-bold">00</span>
              </div>
            </div>
          </div>

           <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-slate-500 text-xs font-bold uppercase mb-2">Camera Status</h3>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Signal Stable (12ms)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 6. SAFETY PAGE ---
const Safety = () => {
  const { systemState, setSystemState } = useContext(SystemContext);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-white">SAFETY <span className="text-red-500">MODULE</span></h1>
        <p className="text-slate-400 mt-2">Emergency Protocols & Alerts</p>
      </header>

      {/* Main Status Banner */}
      <div className={`p-8 rounded-3xl border ${systemState.emergency ? 'bg-red-500/10 border-red-500' : 'bg-emerald-500/10 border-emerald-500/50'} transition-all duration-500`}>
        <div className="flex items-center gap-4 mb-4">
          {systemState.emergency ? <AlertTriangle size={40} className="text-red-500" /> : <ShieldAlert size={40} className="text-emerald-500" />}
          <div>
            <h2 className={`text-2xl font-bold ${systemState.emergency ? 'text-red-500' : 'text-emerald-500'}`}>
              {systemState.emergency ? "EMERGENCY PROTOCOLS ACTIVE" : "SYSTEM SECURE"}
            </h2>
            <p className="text-slate-400 text-sm">Automated Threat Detection System</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setSystemState(prev => ({ ...prev, emergency: !prev.emergency }))}
          className="h-32 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
        >
          <span className="text-2xl font-black text-white group-hover:text-red-500">TOGGLE EMERGENCY</span>
          <span className="text-xs text-slate-500 uppercase tracking-widest">Manual Override</span>
        </button>

         <div className="h-32 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-y-auto">
           <h3 className="text-slate-500 text-xs font-bold uppercase mb-3">Recent Alerts</h3>
           <p className="text-slate-400 text-sm italic">No recent safety incidents recorded.</p>
         </div>
      </div>
    </div>
  );
};

// --- 7. LOGS PAGE ---
const Logs = () => {
  const logs = [
    { time: "10:45:02", type: "INFO", msg: "System routine check complete. All nodes active." },
    { time: "10:44:15", type: "SUCCESS", msg: "Camera 04 reconnected successfully." },
    { time: "10:30:00", type: "WARN", msg: "High latency detected on Node 2 (140ms)." },
    { time: "10:15:22", type: "INFO", msg: "Adaptive Lighting engaged: Brightness set to 80%." },
    { time: "09:55:01", type: "INFO", msg: "User login detected from Admin Console." },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <header>
        <h1 className="text-4xl font-black text-white">SYSTEM <span className="text-slate-500">LOGS</span></h1>
        <p className="text-slate-400 mt-2">Audit Trail & Event History</p>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Status</th>
              <th className="p-4">Event Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300 text-sm font-mono">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-slate-500">{log.time}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    log.type === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                    log.type === 'WARN' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.type}
                  </span>
                </td>
                <td className="p-4">{log.msg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 8. MAIN APP COMPONENT ---
export default function App() {
  return (
    <SystemProvider>
      <BrowserRouter>
        <div className="flex bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500 selection:text-black">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lighting" element={<Lighting />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/logs" element={<Logs />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </SystemProvider>
  );
}