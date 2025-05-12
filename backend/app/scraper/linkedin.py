import requests
from bs4 import BeautifulSoup

def scrape_linkedin():
    print("[Linkedin] Scraping started...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    }
    url = 'https://internshala.com/internships/work-from-home-ui-ux-internships-in-mumbai/'
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs_list = soup.find('div', class_='internship_list_container')
    
    if not jobs_list:
        return []

    job_containers = jobs_list.find_all('div', class_='individual_internship')
    jobs = []

    for job in job_containers:
        title_tag = job.find('a', class_='job-title-href')
        if not title_tag:
            continue

        title = title_tag.text.strip()
        company = job.find('p', class_='company-name').text.strip() if job.find('p', class_='company-name') else 'N/A'
        location = job.find('div', class_='row-1-item locations').text.strip() if job.find('div', class_='row-1-item locations') else 'N/A'
        row_items = job.find_all('div', class_='row-1-item')
        duration = row_items[1].find('span').text.strip() if len(row_items) > 1 else 'N/A'
        stipend = row_items[2].find('span').text.strip() if len(row_items) > 2 else 'N/A'
        posted = job.find('div', class_='status-success').text.strip() if job.find('div', class_='status-success') else 'N/A'
        link = f"https://internshala.com{title_tag['href']}" if title_tag.has_attr('href') else ''

        jobs.append({
            "Title": title,
            "Company": company,
            "Location": location,
            "Duration": duration,
            "Stipend": stipend,
            "Posted": posted,
            "Link": link
        })

    return jobs
