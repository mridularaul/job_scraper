# from fastapi import FastAPI
# from app.tasks import scrape_internshala_task, scrape_linkedin_task, scrape_naukri_task
# from celery.result import AsyncResult
# import time

# app = FastAPI()

# @app.post("/scrape")
# def trigger_scraping():
#     task1 = scrape_internshala_task.delay()
#     task2 = scrape_linkedin_task.delay()
#     task3 = scrape_naukri_task.delay()

#     while not (task1.ready() and task2.ready() and task3.ready()):
#         time.sleep(1)

#     result = {
#         "internshala": task1.result,
#         "linkedin": task2.result,
#         "naukri": task3.result
#     }
#     return result
# main.py
from fastapi import FastAPI
from app.tasks import (
    scrape_internshala_task,
    scrape_careerjet_task  # <-- Import the new task
)
from celery.result import AsyncResult
import time

app = FastAPI()

@app.post("/scrape")
def trigger_scraping():
    task1 = scrape_internshala_task.delay()
    task2 = scrape_careerjet_task.delay()  # <-- Call the task

    while not (task1.ready() and task2.ready()):
        time.sleep(1)

    result = {
        "internshala": task1.result,
        "careerjet": task2.result
    }
    return result
