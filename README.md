# Homework Racer

A Flask homework planner that helps students organize assignments, track deadlines, and stay focused with a Pomodoro-style study timer.

**Live:** [https://homework-planner-phi.vercel.app](https://homework-planner-phi.vercel.app)

## Features

- **Home** — Quick entry point into the planner
- **Dashboard** — Overview of total, completed, and pending tasks
- **Homework** — Add, complete, and delete assignments with priority and due dates
- **Calendar** — Deadline-focused view of upcoming work
- **Pomodoro** — Focus / break study timer

Tasks are stored in the browser session for a lightweight demo experience.

## Tech stack

- Python / Flask
- Jinja2 templates + static CSS/JS
- Deployed on Vercel as a Python serverless function (`api/index.py`)

## Project structure

```
.
├── api/index.py          # Vercel serverless entry point
├── app.py                # Flask app and routes
├── config.py             # Environment-based config
├── models.py             # Task model helpers
├── requirements.txt
├── runtime.txt           # Python version for Vercel
├── vercel.json           # Vercel routing / build config
├── static/               # CSS and JS
└── templates/            # Jinja2 pages
```

## Run locally

1. Clone the repo and enter the project folder:

```bash
git clone https://github.com/vatsamalakar/HomeworkPlanner.git
cd HomeworkPlanner
```

2. Create a virtual environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

3. (Optional) Create a `.env` file:

```env
SECRET_KEY=your-secret-key
XAI_API_KEY=your-grok-api-key
```

4. Start the app:

```bash
python app.py
```

5. Open [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Vercel will use `api/index.py` as the serverless entry point and `runtime.txt` for the Python version.
4. Set environment variables in the Vercel project settings if needed (`SECRET_KEY`, `XAI_API_KEY`).

### Important: static files

Route all traffic through the Flask app so CSS/JS load correctly. Use this `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

Do **not** add a separate `/static/(.*)` → `static/$1` route when the only build is `@vercel/python`. That path is not published as a static output, so assets will 404 and the site will look unstyled.

## License

MIT
