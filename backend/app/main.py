from fastapi import FastAPI
from app.tasks import (scrape_internshala_task, scrape_careerjet_task)
from celery.result import AsyncResult
import time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Allow all origins (use "*" in dev only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods: GET, POST, etc.
    allow_headers=["*"],  # allow all headers
)

@app.post("/scrape")
def trigger_scraping():
    task1 = scrape_internshala_task.delay()
    task2 = scrape_careerjet_task.delay() 

    while not (task1.ready() and task2.ready()):
        time.sleep(1)

    result = {
        "internshala": task1.result,
        "careerjet": task2.result
    }
    return result
