import { LayoutDashboard, Lightbulb, Eye, ShieldAlert, History } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Lightbulb, label: 'Lighting' },
    { icon: Eye, label: 'Vision' },
    { icon: ShieldAlert, label: 'Safety' },
    { icon: History, label: 'Logs' },
  ];

  return (
    <aside className="w-64 h-screen border-r border-white/10 bg-slate-950 p-6 flex flex-col fixed left-0 top-0 z-50">
      <div className="mb-10 flex items-center gap-3">
        <div className="p-2 bg-neon-cyan/20 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.4)]">
          <Lightbulb className="text-neon-cyan" size={24} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">SmartLight</h2>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button key={item.label} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white group">
            <item.icon size={20} className="group-hover:text-neon-cyan transition-colors" />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hardware Linked</span>
        </div>
      </div>
    </aside>
  );
}