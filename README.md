# Homework Planner

A simple Flask-based homework planner that helps students organize tasks, track deadlines, and stay focused with a built-in study dashboard.

## Features
- Dashboard overview with task stats
- Homework list with add, complete, and delete actions
- Calendar-style deadline view
- Pomodoro-style study timer page
- AI helper placeholder page

## Run locally
1. Install dependencies: `pip install -r requirements.txt`
2. Start the app: `python app.py`
3. Open: `http://127.0.0.1:5000/`

## Deploy to Vercel
1. Push this project to GitHub.
2. Import it into Vercel.
3. Set the build command to `pip install -r requirements.txt` if needed.
4. Vercel will use the provided serverless entry point in `api/index.py`.
