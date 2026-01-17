import { createContext, useEffect, useState } from "react";

export const SystemContext = createContext();

export function SystemProvider({ children }) {
  const [systemState, setSystemState] = useState({
    occupancy: "NO",
    crowd: "NORMAL",
    accident: "NO",
    brightness: "OFF",
    emergency: false,
  });

  useEffect(() => {
    const fetchInterval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/api/status");
        const data = await res.json();
        setSystemState(data);
      } catch (e) {
        console.error("Backend unreachable");
      }
    }, 2000); // Polling every 2 seconds

    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <SystemContext.Provider value={{ systemState }}>
      {children}
    </SystemContext.Provider>
  );
}