import axios from "axios";

// Base URL for the vision API endpoints
const API_BASE = "http://localhost:5000/api/vision";

/**
 * Fetches the health status of the vision backend.
 */
export const getVisionHealth = async () => {
  try {
    const res = await axios.get(`${API_BASE}/health`);
    return res.data;
  } catch (error) {
    console.error("Error fetching vision health:", error);
    return { vision: "error" };
  }
};

/**
 * Returns YOLO training configuration + latest registry values.
 */
export const getVisionModelSummary = async () => {
  try {
    const res = await axios.get(`${API_BASE}/model/summary`);
    return res.data;
  } catch (error) {
    console.error("Error fetching vision model summary:", error);
    return null;
  }
};
