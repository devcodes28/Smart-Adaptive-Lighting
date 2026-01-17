import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ChartCard({ title }) {
  const data = [
    { time: '00:00', value: 20 }, { time: '04:00', value: 50 },
    { time: '08:00', value: 80 }, { time: '12:00', value: 40 },
    { time: '16:00', value: 60 }, { time: '20:00', value: 90 },
  ];

  return (
    <div className="glass-card p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
      <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">{title}</h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
  );
}