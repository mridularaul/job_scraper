import requests
from bs4 import BeautifulSoup
import pandas as pd

# Function to extract job data from CareerJet
def extract_careerjet_jobs(page):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
    }
    
    url = f'https://www.careerjet.co.in/search/jobs?s=python+developer&l=Mumbai&start={page}'
    print(f"🌐 Scraping Page: {page} | URL: {url}")
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"❌ Failed to retrieve data: {response.status_code}")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    jobs = soup.find_all('article', class_='job')
    
    job_list = []
    
    for job in jobs:
        try:
            title_tag = job.find('h2', class_='title')
            title = title_tag.text.strip() if title_tag else 'N/A'

            # Only attempt to find link if title_tag exists
            job_link = 'N/A'
            if title_tag:
                link_tag = title_tag.find('a')
                if link_tag and link_tag.get('href'):
                    job_link = f"https://www.careerjet.co.in{link_tag['href']}"

            company_tag = job.find('p', class_='company')
            company = company_tag.text.strip() if company_tag else 'N/A'

            location_tag = job.find('ul', class_='location')
            location = location_tag.text.strip() if location_tag else 'N/A'

            date_tag = job.find('ul', class_='dates')
            date_posted = date_tag.text.strip() if date_tag else 'N/A'

            job_list.append({
                'Title': title,
                'Company': company,
                'Location': location,
                'Date Posted': date_posted,
                'Link': job_link
            })
        except Exception as e:
            print(f"⚠️ Skipping a job due to error: {e}")
            continue
    
    return job_list

# Collecting data from multiple pages
all_jobs = []
for page in range(0, 5):  # Scraping first 5 pages
    jobs = extract_careerjet_jobs(page * 10)
    if not jobs:
        print("No more jobs found or failed to load page.")
        break
    all_jobs.extend(jobs)

# Creating a DataFrame
df_careerjet = pd.DataFrame(all_jobs)

# Displaying the DataFrame
print(df_careerjet.head())

# Saving to CSV
df_careerjet.to_csv('CareerJet_Jobs.csv', index=False)
print("✅ Data saved to CareerJet_Jobs.csv")

