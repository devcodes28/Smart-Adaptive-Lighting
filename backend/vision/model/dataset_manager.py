from __future__ import annotations

import shutil
from pathlib import Path

from .config import YoloTrainingConfig


def download_kaggle_dataset(config: YoloTrainingConfig) -> Path:
    """Download a Kaggle dataset using kagglehub and normalize it to the expected folder."""

    import kagglehub  # Lazy import: optional dependency for runtime training flow.

    downloaded_path = Path(kagglehub.dataset_download(config.dataset_slug)).resolve()
    target_path = config.dataset_root.resolve()
    target_path.parent.mkdir(parents=True, exist_ok=True)

    if target_path.exists():
        shutil.rmtree(target_path)

    shutil.copytree(downloaded_path, target_path)
    return target_path
