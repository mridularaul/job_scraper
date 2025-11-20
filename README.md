# JobScout : Distributed Job Scraping System

A containerized distributed job scraping system using **React**, **FastAPI**, **Celery**, and **RabbitMQ**, orchestrated with **Docker Compose**.

## Core Features

* Parallel scraping with 3 Celery workers
* RabbitMQ-based task queue
* FastAPI backend with `/scrape` endpoint
* React UI with manual trigger button
* Automatic retry (up to 3 times) for failed tasks
* Fully Dockerized

## Tech Stack

* Frontend: React
* Backend: FastAPI
* Workers: Celery
* Broker: RabbitMQ
* Scraping: BeautifulSoup
* Containers: Docker, Docker Compose

## Run with Docker

```bash
docker-compose up --build --scale celery_worker=3
```

## Screenshots

<img width="1895" height="859" alt="Frontend" src="https://github.com/user-attachments/assets/f399f02d-d3ce-4f17-adb2-74b9217eec21" />

<img width="1889" height="854" alt="Frontend" src="https://github.com/user-attachments/assets/8c897020-0204-4aa1-9986-2ee66cebf710" />

<img width="1915" height="1016" alt="Docker" src="https://github.com/user-attachments/assets/561717ac-d280-4450-9422-f59e1a093bee" />

