from celery import Celery
from app.scraper.internshala import scrape_internshala
from app.scraper.linkedin import scrape_linkedin
from app.scraper.naukri import scrape_naukri

celery = Celery(
    'job_tasks',
    broker='amqp://guest@rabbitmq//',
    backend='rpc://'
)

@celery.task(bind=True, max_retries=3)
def scrape_internshala_task(self):
    try:
        return scrape_internshala()
    except Exception as e:
        raise self.retry(exc=e, countdown=10)

@celery.task(bind=True, max_retries=3)
def scrape_linkedin_task(self):
    try:
        return scrape_linkedin()
    except Exception as e:
        raise self.retry(exc=e, countdown=10)

@celery.task(bind=True, max_retries=3)
def scrape_naukri_task(self):
    try:
        return scrape_naukri()
    except Exception as e:
        raise self.retry(exc=e, countdown=10)
