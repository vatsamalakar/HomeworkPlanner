import pytest

from app import app, db


@pytest.fixture
def client():
    app.config.update(TESTING=True, SQLALCHEMY_DATABASE_URI="sqlite:///test_homeworkplanner.db")
    with app.app_context():
        db.drop_all()
        db.create_all()
    with app.test_client() as client:
        yield client


def test_home_page_loads(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"StudyFlow" in response.data


def test_register_and_create_task(client):
    register_response = client.post(
        "/register",
        data={"name": "Ava", "email": "ava@example.com", "password": "secret123"},
        follow_redirects=True,
    )
    assert register_response.status_code == 200

    task_response = client.post(
        "/homework",
        data={"title": "Math revision", "due_date": "2026-07-25", "priority": "high"},
        follow_redirects=True,
    )
    assert task_response.status_code == 200
    assert b"Math revision" in task_response.data
