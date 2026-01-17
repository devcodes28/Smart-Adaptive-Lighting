import { Link, useLocation } from "react-router-dom"; // Added
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
    <aside className="w-64 h-screen border-r border-white/10 bg-slate-950 p-6 flex flex-col fixed left-0 top-0 z-50">
      {/* ... logo section ... */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              location.pathname === item.path ? 'bg-white/10 text-neon-cyan' : 'text-slate-400 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
      {/* ... system status ... */}
    </aside>
  );
}