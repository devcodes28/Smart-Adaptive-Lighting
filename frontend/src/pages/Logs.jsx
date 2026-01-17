export default function Logs() {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-black text-white">System Logs</h1>
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6 font-mono text-sm text-slate-400">
        <p>[10:42:01] SYSTEM_INIT: Connection established.</p>
        <p>[10:42:05] MODULE_LOAD: YOLOv8 model loaded successfully.</p>
        <p className="text-emerald-400">[10:42:06] STATUS: System healthy. Monitoring active.</p>
      </div>
    </div>
  );
}