# 🏙️ Smart Adaptive Lighting System

An **AI-powered urban infrastructure solution** that dynamically adjusts street lighting based on real-time traffic density and safety incidents using computer vision.

This project combines **YOLOv8-based object detection**, a **Flask backend**, and a **React dashboard** to build **responsive, safety-first smart streets**.

---

## 🚀 Overview

The Smart Adaptive Lighting System automatically adjusts lighting levels in response to street activity:

- Brightness increases when **vehicles or pedestrians** are detected.
- Emergency lighting activates when **accidents or collisions** are detected.
- Lighting dims when roads are empty to conserve power.

This creates safer and more energy-efficient urban environments.

---

## 🏗️ Project Architecture

### 1️⃣ Vision System (YOLOv8)

Responsible for live AI-powered scene analysis.

**Features**
- Vehicle and pedestrian detection
- Collision detection using IoU overlap logic
- Real-time video stream processing
- MJPEG streaming for browser monitoring

**Detected Classes**
- Cars
- Trucks
- Buses
- Motorcycles
- Pedestrians

---

### 2️⃣ Backend (Flask)

Handles system logic and decision-making.

**Capabilities**
- Global state management
- Lighting decision engine
- REST API endpoints
- Real-time status updates
- Model and system health reporting

**Priority Logic**
Safety always overrides energy savings:

| Priority | Mode |
|-----------|------|
| P0 | Emergency lighting |
| P1 | High traffic brightness |
| P2 | Moderate lighting |
| P3 | Power-saving dim mode |

---

### 3️⃣ Frontend (React + Tailwind CSS)

Provides a modern monitoring dashboard.

**Features**
- Live CCTV feed with AI detection overlays
- Adaptive brightness visualization
- Traffic & safety analytics panels
- Adaptive dimming slider synced with AI decisions
- Context-based global state management

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Python
- Flask
- OpenCV

### AI / ML
- Ultralytics YOLOv8

---

## 🚦 Getting Started

### Prerequisites

Ensure the following are installed:

- Python **3.10+**
- Node.js **18+**
- Webcam or CCTV feed
- pip & npm

---

## 📦 Installation

### 1. Clone Repository

## Setup Backend
cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

## Setup Frontend
cd frontend
npm install

## ▶ Running the Project
Start Backend Server
cd backend
python app.py

Backend runs on:

http://localhost:5000
Start Frontend Dashboard
cd frontend
npm run dev

Frontend runs on:

http://localhost:5173

Open this URL in your browser to access the dashboard.

## Configuration Options
System behavior can be tuned in the backend configuration.

Accident Detection Sensitivity

Modify:

backend/vision/stream_yolo.py
ACCIDENT_IOU_THRESHOLD = 0.3

Lower value → More sensitive
Higher value → Fewer accident triggers

Accident Persistence Frames

Controls how long an overlap must persist before an accident alert.

PERSISTENCE_FRAMES = 10

Higher values reduce false positives.
```bash
git clone https://github.com/your-username/smart-adaptive-lighting.git
cd smart-adaptive-lighting

