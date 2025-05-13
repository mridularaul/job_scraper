# from celery import Celery
from app.scraper.internshala import scrape_internshala
from app.scraper.careerjet import scrape_careerjet  # <-- Import CareerJet Scraper

# Initialize Celery
celery = Celery(
    'job_tasks',
    broker='amqp://guest@rabbitmq//',
    backend='rpc://'
)

# ---------- Internshala Scraper Task ----------
@celery.task(bind=True, max_retries=3)
def scrape_internshala_task(self):
    try:
        return scrape_internshala()
    except Exception as e:
        raise self.retry(exc=e, countdown=10)

# ---------- CareerJet Scraper Task ----------
@celery.task(bind=True, max_retries=3, name='scrape_careerjet_task')
def scrape_careerjet_task(self):
    try:
        return scrape_careerjet()  # <-- Call the scraper function
    except Exception as e:
        raise self.retry(exc=e, countdown=10)
