# Smart Adaptive Lighting

## Computer Vision model workflow (YOLO + Kaggle)

New backend modules have been added to support a full training/update pipeline:

- `backend/vision/model/config.py`: central YOLO config and artifact paths.
- `backend/vision/model/dataset_manager.py`: Kaggle dataset download handler.
- `backend/vision/model/train_yolo.py`: YOLO training entrypoint.
- `backend/vision/model/update_model.py`: retraining + smoke inference update flow.
- `backend/vision/model/service.py`: API-facing model summary service.
- `backend/scripts/update_vision_model.py`: convenience script for updates.

### Train from Kaggle dataset

```bash
cd backend
python -m vision.model.train_yolo --refresh-dataset
```

### Update model and run smoke inference

```bash
cd backend
python scripts/update_vision_model.py --refresh-dataset --image path/to/sample.jpg
```

### Frontend demonstration integration

- Backend endpoint: `GET /api/vision/model/summary`
- Frontend page `VisionAnalytics` now displays:
  - Backend health
  - Kaggle dataset slug
  - last update timestamp
  - train/update command references
