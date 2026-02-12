from __future__ import annotations

import json
from datetime import datetime, timezone

from .config import YoloTrainingConfig


DEFAULT_REGISTRY = {
    "updated_at": None,
    "message": "Model not trained yet. Run python -m vision.model.train_yolo --refresh-dataset",
}


def get_model_summary() -> dict:
    config = YoloTrainingConfig()
    if not config.model_registry_path.exists():
        summary = dict(DEFAULT_REGISTRY)
    else:
        summary = json.loads(config.model_registry_path.read_text(encoding="utf-8"))

    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "config": config.as_dict(),
        "latest": summary,
        "commands": {
            "train": "python -m vision.model.train_yolo --refresh-dataset",
            "update": "python -m vision.model.update_model --refresh-dataset --image <path_to_image>",
        },
    }
