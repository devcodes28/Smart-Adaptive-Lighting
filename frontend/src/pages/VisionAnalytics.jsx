import { useEffect, useState } from "react";
import { getVisionHealth, getVisionModelSummary } from "../api/visionApi";

export default function VisionAnalytics() {
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
    <div className="space-y-8">
      <h1 className="text-5xl font-black text-white">Vision Stream</h1>

      <div className="aspect-video bg-black rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
          ● LIVE
        </div>
        <p className="text-slate-500 font-mono">WAITING FOR CAMERA FEED (RTSP)...</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-xl mb-3">Vision Backend Health</h2>
          <p className="text-slate-300">
            Status: <span className="font-mono text-emerald-400">{health}</span>
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-xl mb-3">YOLO Model Summary</h2>
          {!modelSummary ? (
            <p className="text-slate-400">Unable to load model summary.</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                Dataset: <span className="font-mono text-sky-300">{modelSummary.config.dataset_slug}</span>
              </p>
              <p className="text-slate-300">
                Latest Update: <span className="font-mono">{String(modelSummary.latest.updated_at)}</span>
              </p>
              <p className="text-slate-300">
                Train Command: <span className="font-mono text-emerald-400">{modelSummary.commands.train}</span>
              </p>
              <p className="text-slate-300">
                Update Command: <span className="font-mono text-amber-300">{modelSummary.commands.update}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
