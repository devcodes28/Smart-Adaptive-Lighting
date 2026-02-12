from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

from .config import YoloTrainingConfig
from .train_yolo import train_model


def run_smoke_inference(weights_path: str, image_path: str | None) -> dict:
    from ultralytics import YOLO

    if not image_path:
        return {"inference": "skipped", "reason": "No --image provided"}

    image = Path(image_path)
    if not image.exists():
        return {"inference": "skipped", "reason": f"Image not found: {image_path}"}

    model = YOLO(weights_path)
    prediction = model.predict(source=str(image), conf=0.35, save=False, verbose=False)
    result = prediction[0]

    return {
        "inference": "ok",
        "image": str(image.resolve()),
        "detections": int(len(result.boxes)),
        "classes": [int(c) for c in result.boxes.cls.tolist()] if result.boxes is not None else [],
    }


def update_model(image_path: str | None, refresh_dataset: bool) -> dict:
    config = YoloTrainingConfig()
    summary = train_model(config=config, refresh_dataset=refresh_dataset)
    smoke_test = run_smoke_inference(weights_path=summary["weights"], image_path=image_path)

    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "training": summary,
        "smoke_test": smoke_test,
    }
    config.model_registry_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return payload


def main() -> None:
    parser = argparse.ArgumentParser(description="Retrain and update YOLO model artifacts.")
    parser.add_argument("--image", type=str, default=None, help="Optional image path for a smoke test inference.")
    parser.add_argument("--refresh-dataset", action="store_true", help="Redownload dataset before training.")
    args = parser.parse_args()

    result = update_model(image_path=args.image, refresh_dataset=args.refresh_dataset)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
