from dataclasses import dataclass


@dataclass
class Task:
    title: str
    due_date: str = "No deadline"
    priority: str = "medium"
    completed: bool = False
    id: int | None = None

