import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Lightbulb, Eye, ShieldAlert, History } from 'lucide-react';

export default function Sidebar() {
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
        <div className="p-2 bg-neon-cyan/20 rounded-lg">
          <Lightbulb className="text-neon-cyan" size={24} />
        </div>
        <h1 className="text-white font-bold text-xl tracking-tight">SmartLight</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
              ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
         <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
         </div>
      </div>
    </aside>
  );
}