import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [systemState, setSystemState] = useState({
    occupancy: "NO",
    accident: "NO",
    brightness: 0,
    emergency: false,
    crowd_status: "OFFLINE",
    active_cameras: 0,
    power_usage: "0.0 kW"
  });

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        // 1. Ask the backend for the REAL status
        const res = await axios.get("http://localhost:5000/api/status");
        
        // 2. Update the dashboard with live data
        if (res.data) {
          setSystemState(prevState => ({
            ...prevState,
            occupancy: res.data.occupancy,     // YES/NO from YOLO
            accident: res.data.accident,       // YES/NO from YOLO
            brightness: parseInt(res.data.brightness) || 0, // Brightness level
            emergency: res.data.emergency,     // True/False
            crowd_status: res.data.crowd || "NORMAL",
            power_usage: "1.2 kW" // Placeholder if backend doesn't send this yet
          }));
        }
      } catch (error) {
        console.error("Backend Disconnected:", error);
      }
    };

    // 3. Poll the backend every 1 second
    const interval = setInterval(fetchSystemStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SystemContext.Provider value={{ systemState, setSystemState }}>
      {children}
    </SystemContext.Provider>
  );
};