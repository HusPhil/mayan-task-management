# Task management app

## Project structure
- backend (fastapi + alembic + postgres)
- frontend (reactvite + shadcn)
- database (postgres)

## Core features (typical CRUD)
- create tasks
- edit tasks
- delete tasks
- mark tasks as done
- mark tasks as undone

## Data models
### Task
| Field | Type | Description |
| --- | --- | --- |
| id | int | uuid primary key |
| title | str | task title |
| description | str | task description |
| status | str | task status (complete, uncomplete) |
| created_at | datetime | task creation date |
| completed_at | datetime | task update date |
