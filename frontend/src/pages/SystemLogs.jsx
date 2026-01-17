export default function SystemLogs() {
  const mockLogs = [
    { id: 1, time: "02:10:45", event: "P0: ACCIDENT_DETECTED", status: "CRITICAL" },
    { id: 2, time: "02:08:12", event: "P1: CROWD_LIMIT_EXCEEDED", status: "WARNING" },
    { id: 3, time: "01:55:30", event: "P2: MOTION_SENSING_ACTIVE", status: "INFO" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">System Event Logs</h1>
      <div className="glass-card overflow-hidden !p-0">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Event Description</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockLogs.map(log => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-sm">{log.time}</td>
                <td className="p-4 text-sm font-medium">{log.event}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    log.status === 'CRITICAL' ? 'bg-neon-red/20 text-neon-red' : 
                    log.status === 'WARNING' ? 'bg-neon-amber/20 text-neon-amber' : 'bg-neon-cyan/20 text-neon-cyan'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}