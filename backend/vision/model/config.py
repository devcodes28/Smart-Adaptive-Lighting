from __future__ import annotations

from dataclasses import dataclass, asdict
from pathlib import Path


@dataclass(frozen=True)
class YoloTrainingConfig:
    """Central configuration used by dataset, training, and update flows."""

    project_root: Path = Path(__file__).resolve().parents[2]
    dataset_slug: str = "roboflow/road-accident-detection"
    dataset_dirname: str = "road-accident-yolo"
    model_name: str = "yolov8n.pt"
    image_size: int = 640
    epochs: int = 50
    batch_size: int = 16

    @property
    def dataset_root(self) -> Path:
        return self.project_root / "datasets" / self.dataset_dirname

    @property
    def data_yaml_path(self) -> Path:
        return self.dataset_root / "data.yaml"

    @property
    def artifact_dir(self) -> Path:
        return Path(__file__).resolve().parent / "artifacts"

    @property
    def model_registry_path(self) -> Path:
        return self.artifact_dir / "model_registry.json"

    def as_dict(self) -> dict:
        payload = asdict(self)
        payload["project_root"] = str(self.project_root)
        payload["dataset_root"] = str(self.dataset_root)
        payload["data_yaml_path"] = str(self.data_yaml_path)
        payload["artifact_dir"] = str(self.artifact_dir)
        payload["model_registry_path"] = str(self.model_registry_path)
        return payload
