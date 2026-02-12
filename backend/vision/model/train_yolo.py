from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

from .config import YoloTrainingConfig
from .dataset_manager import download_kaggle_dataset


def train_model(config: YoloTrainingConfig, refresh_dataset: bool) -> dict:
    from ultralytics import YOLO  # Lazy import to avoid forcing ultralytics for API-only flows.

    config.artifact_dir.mkdir(parents=True, exist_ok=True)

    if refresh_dataset or not config.dataset_root.exists():
        download_kaggle_dataset(config)

    model = YOLO(config.model_name)
    results = model.train(
        data=str(config.data_yaml_path),
        epochs=config.epochs,
        imgsz=config.image_size,
        batch=config.batch_size,
        project=str(config.project_root / "runs"),
        name="accident_detection",
        exist_ok=True,
    )

    best_checkpoint = Path(results.save_dir) / "weights" / "best.pt"
    summary = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "dataset": config.dataset_slug,
        "dataset_root": str(config.dataset_root),
        "data_yaml": str(config.data_yaml_path),
        "weights": str(best_checkpoint),
        "run_dir": str(results.save_dir),
        "epochs": config.epochs,
        "batch_size": config.batch_size,
        "image_size": config.image_size,
    }

    config.model_registry_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return summary


def main() -> None:
    parser = argparse.ArgumentParser(description="Train YOLO model using a Kaggle dataset.")
    parser.add_argument("--refresh-dataset", action="store_true", help="Redownload dataset before training.")
    args = parser.parse_args()

    config = YoloTrainingConfig()
    summary = train_model(config=config, refresh_dataset=args.refresh_dataset)
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
