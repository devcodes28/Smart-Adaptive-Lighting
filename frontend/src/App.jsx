import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Replace Navbar with Sidebar
import Dashboard from "./pages/Dashboard";
import Lighting from "./pages/Lighting";
import VisionAnalytics from "./pages/VisionAnalytics";
import Safety from "./pages/Safety";
import Logs from "./pages/Logs";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-slate-950 min-h-screen">
        <Sidebar /> {/* Fixed sidebar on the left */}
        
        {/* ml-64 shifts content to the right so it is visible */}
        <main className="flex-1 ml-64 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lighting" element={<Lighting />} />
            <Route path="/vision" element={<VisionAnalytics />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;