import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_remoteok():
    url = "https://remoteok.com/remote-jobs-in-india"
    
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/123.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.google.com"
    }

    print(f"🌐 Scraping: {url}")
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"❌ Failed to retrieve data: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    job_rows = soup.find_all('tr', class_='job')

    jobs = []

    for job in job_rows:
        try:
            company = job.get('data-company')
            title = job.get('data-position')
            location = job.get('data-location') or 'Remote'
            job_link = "https://remoteok.com" + job.get('data-href')

            tags = job.find_all("div", class_="tag")
            tag_list = [tag.text.strip() for tag in tags]

            jobs.append({
                "Company": company,
                "Title": title,
                "Location": location,
                "Tags": ', '.join(tag_list),
                "Link": job_link
            })

        except Exception as e:
            print(f"⚠️ Error parsing a job: {e}")
            continue

    return jobs

# Run scraper
job_list = scrape_remoteok()

# Save to DataFrame and CSV
df = pd.DataFrame(job_list)
print(df.head())

df.to_csv("RemoteOK_Jobs.csv", index=False)
print("✅ Data saved to RemoteOK_Jobs.csv")
