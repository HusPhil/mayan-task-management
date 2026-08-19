# Mayan Task Management

A full-stack task management application built with FastAPI and React.

## Tech Stack

### Backend

- **Python 3.13** + **FastAPI**
- **SQLAlchemy 2.0** + **Alembic** (migrations)
- **PostgreSQL 16**
- **Pydantic** (validation)
- **uvicorn** (ASGI server)

### Frontend

- **React 19** + **TypeScript 6**
- **Vite 8** (bundler)
- **Tailwind CSS 4**
- **shadcn/ui** (components)
- **TanStack React Query** (data fetching)

---


## Backend

### Setup (local)

```bash
cd backend
uv sync
cp .env.example .env
# edit .env with your database credentials
```

### Run

```bash
uv run uvicorn app.main:app --reload
```

The API starts at `http://localhost:8000`. Swagger docs available at `http://localhost:8000/docs` in development.

### Database Migrations

```bash
# create a new migration
uv run alembic revision --autogenerate -m "description"

# apply migrations
uv run alembic upgrade head

# rollback
uv run alembic downgrade -1
```

Migrations run automatically on app startup via the `startup_event` in `main.py`.

### API Endpoints

| Method   | Endpoint               | Description        |
| -------- | ---------------------- | ------------------ |
| `POST`   | `/api/tasks/`          | Create a task      |
| `GET`    | `/api/tasks/`          | List all tasks     |
| `GET`    | `/api/tasks/{task_id}` | Get task by ID     |
| `PATCH`  | `/api/tasks/{task_id}` | Update a task      |
| `DELETE` | `/api/tasks/{task_id}` | Delete a task      |

### Lint & Typecheck

```bash
uv run ruff check .
uv run mypy .
```

---

## Frontend

### Setup (local)

```bash
cd frontend
npm install
```

### Run

```bash
npm run dev
```

The frontend starts at `http://localhost:5173`.

### Available Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start Vite dev server        |
| `npm run build`       | Build for production         |
| `npm run preview`     | Preview production build     |
| `npm run lint`        | Run ESLint                   |
| `npm run format`      | Format with Prettier         |
| `npm run typecheck`   | Run TypeScript type checking |

---

### Production

```bash
docker compose up --build
```

| Service  | URL                     |
| -------- | ----------------------- |
| App      | `http://localhost:8000` |

- The production build uses a multi-stage Dockerfile: the frontend is built with Node, then served by FastAPI as static files. No separate frontend container. 
- The `./backend/Dockerfile` serves both the API and the frontend from a single container. It can be used directly on platforms like Render. 

---

## Environment Variables

### Backend

| Variable        | Description                      | Default     |
| --------------- | -------------------------------- | ----------- |
| `HOST`          | Database host                    | —           |
| `DATABASE_NAME` | Database name                    | —           |
| `USER`          | Database user                    | —           |
| `PASSWORD`      | Database password                | —           |
| `SSL_MODE`   | `PostgreSQL SSL mode`    | `production`|
| `ENVIRONMENT`   | `development` or `production`    | `production`|


### Frontend

| Variable        | Description                      | Default     |
| --------------- | -------------------------------- | ----------- |
| `VITE_API_BASE_URL` | API Base URL | `/api/v1`  |


Copy `.env.example` to `.env` and fill in your values. 

