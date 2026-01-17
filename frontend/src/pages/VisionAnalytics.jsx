export default function VisionAnalytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-black text-white">Vision Stream</h1>
      <div className="aspect-video bg-black rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">● LIVE</div>
        <p className="text-slate-500 font-mono">WAITING FOR CAMERA FEED (RTSP)...</p>
      </div>
    </div>
  );
}