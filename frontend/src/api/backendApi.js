import axios from "axios";

const API_BASE = "http://localhost:5000/api";

/**
 * Triggers a manual SOS override in the backend logic
 */
export const triggerManualSos = async () => {
  try {
    const res = await axios.post(`${API_BASE}/sos`);
    return res.data;
  } catch (error) {
    console.error("SOS Trigger failed:", error);
    return { error: true };
  }
};