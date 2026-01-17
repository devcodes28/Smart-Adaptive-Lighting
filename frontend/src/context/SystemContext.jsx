import { createContext, useState } from "react";

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  // Hardcoded initial state to prevent startup crash
  const [systemState] = useState({
    occupancy: "NO",
    accident: "NO",
    brightness: 100,
    emergency: false,
    crowd_status: "NORMAL"
  });

  return (
    <SystemContext.Provider value={{ systemState }}>
      {children}
    </SystemContext.Provider>
  );
};