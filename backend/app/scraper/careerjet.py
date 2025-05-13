import requests
from bs4 import BeautifulSoup

def scrape_careerjet():
    print("[CareerJet] Scraping started...")
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/113.0.0.0 Safari/537.36"
        )
    }

    all_jobs = []
    for page in range(0, 5):  # Scrapes 5 pages (0, 10, 20, 30, 40)
        url = f'https://www.careerjet.co.in/search/jobs?s=python+developer&l=Mumbai&start={page * 10}'
        print(f" Scraping Page: {page} | URL: {url}")

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Failed to retrieve data: {response.status_code}")
            continue

        soup = BeautifulSoup(response.content, 'html.parser')
        jobs = soup.find_all('article', class_='job clicky')

        for job in jobs:
            try:
                title_tag = job.find('header').find('a')
                title = title_tag.text.strip() if title_tag else 'N/A'

                company_tag = job.find('p', class_='company')
                company = company_tag.text.strip() if company_tag else 'N/A'

                location_tag = job.find('ul', class_='location')
                location = location_tag.text.strip() if location_tag else 'N/A'

                description_tag = job.find('div', class_='desc')
                description = description_tag.text.strip() if description_tag else 'N/A'

                job_link = "https://www.careerjet.co.in" + job.get('data-url', '')

                all_jobs.append({
                    'Title': title,
                    'Company': company,
                    'Location': location,
                    'Description': description,
                    'Link': job_link
                })

            except Exception as e:
                print(f"Error parsing job: {e}")
                continue

    return all_jobs
