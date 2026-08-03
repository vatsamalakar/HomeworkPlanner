import os
from flask import Flask, flash, redirect, render_template, request, session, url_for
import requests

from config import Config
from models import Task


app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = app.config["SECRET_KEY"]


def get_tasks():
    return session.setdefault("tasks", [])


def get_task_stats(tasks):
    total = len(tasks)
    completed = sum(1 for task in tasks if task.get("completed"))
    pending = total - completed
    return {"total": total, "completed": completed, "pending": pending}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/dashboard")
def dashboard():
    tasks = get_tasks()
    return render_template("dashboard.html", stats=get_task_stats(tasks), tasks=tasks)


@app.route("/homework", methods=["GET", "POST"])
def homework():
    tasks = get_tasks()
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        due_date = request.form.get("due_date", "")
        priority = request.form.get("priority", "medium")

        if not title:
            flash("Please provide a homework title.", "error")
        else:
            tasks.append({
                "id": len(tasks) + 1,
                "title": title,
                "due_date": due_date or "No deadline",
                "priority": priority,
                "completed": False,
            })
            session["tasks"] = tasks
            flash("Homework task added successfully.", "success")

        return redirect(url_for("homework"))

    return render_template("homework.html", tasks=tasks, stats=get_task_stats(tasks))


@app.route("/toggle_task/<int:task_id>", methods=["POST"])
def toggle_task(task_id):
    tasks = get_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            break
    session["tasks"] = tasks
    flash("Task updated.", "success")
    return redirect(url_for("homework"))


@app.route("/delete_task/<int:task_id>", methods=["POST"])
def delete_task(task_id):
    tasks = [task for task in get_tasks() if task["id"] != task_id]
    session["tasks"] = tasks
    flash("Task removed.", "success")
    return redirect(url_for("homework"))


@app.route("/calendar")
def calendar():
    tasks = get_tasks()
    return render_template("calendar.html", tasks=tasks, stats=get_task_stats(tasks))


@app.route("/timer")
def timer():
    return render_template("timer.html")


def ask_grok(prompt):
    api_key = app.config.get("XAI_API_KEY", "")
    if not api_key:
        return "No Grok API key detected. Add XAI_API_KEY to your .env file."

    try:
        payload = {
            "messages": [{"role": "user", "content": f"You are a helpful homework planner assistant. {prompt}"}],
            "model": "grok-2-1212",
            "temperature": 0.7,
        }
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        response = requests.post("https://api.x.ai/v1/chat/completions", json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]
    except Exception as exc:
        return f"Unable to reach Grok right now: {exc}"



if __name__ == "__main__":
    app.run(debug=True)
