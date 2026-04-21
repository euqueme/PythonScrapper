import aiohttp
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import asyncio
from urllib.parse import urljoin

class RemoteOkScraper:
    BASE_URL = "https://remoteok.com"
    
    def __init__(self):
        self.session = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_page(self) -> Optional[str]:
        """Fetch the main remoteok.com page"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            async with self.session.get(self.BASE_URL, headers=headers, timeout=10) as response:
                if response.status == 200:
                    return await response.text()
        except Exception as e:
            print(f"Error fetching page: {e}")
        return None
    
    def parse_jobs(self, html: str) -> List[Dict]:
        """Parse job listings from HTML"""
        jobs = []
        try:
            soup = BeautifulSoup(html, 'html.parser')
            
            # RemoteOk uses various selectors, try common ones
            job_containers = soup.find_all('div', class_='job')
            
            if not job_containers:
                # Alternative selector
                job_containers = soup.find_all('tr', class_='job')
            
            for job in job_containers:
                try:
                    # Extract job details based on remoteok.com structure
                    title_elem = job.find('h2', class_='job-title') or job.find('a', class_='company-link')
                    company_elem = job.find('a', class_='company') or job.find('span', class_='company')
                    location_elem = job.find('span', class_='location')
                    
                    # Try alternative selectors if primary ones fail
                    if not title_elem:
                        title_elem = job.find('a')
                    if not company_elem:
                        company_elem = job.find('td', class_='company')
                    
                    title = title_elem.text.strip() if title_elem else 'N/A'
                    company = company_elem.text.strip() if company_elem else 'N/A'
                    location = location_elem.text.strip() if location_elem else 'Remote'
                    
                    # Get job URL
                    url = 'N/A'
                    if title_elem and title_elem.get('href'):
                        url = urljoin(self.BASE_URL, title_elem.get('href'))
                    
                    jobs.append({
                        'title': title,
                        'company': company,
                        'location': location,
                        'url': url,
                    })
                except Exception as e:
                    print(f"Error parsing individual job: {e}")
                    continue
            
            return jobs
        except Exception as e:
            print(f"Error parsing jobs: {e}")
            return []
    
    def filter_by_keywords(self, jobs: List[Dict], keywords: List[str]) -> List[Dict]:
        """Filter jobs by keywords in title and company"""
        if not keywords:
            return jobs
        
        filtered_jobs = []
        keywords_lower = [kw.lower() for kw in keywords]
        
        for job in jobs:
            title_lower = job['title'].lower()
            company_lower = job['company'].lower()
            
            # Check if any keyword matches in title or company
            for keyword in keywords_lower:
                if keyword in title_lower or keyword in company_lower:
                    filtered_jobs.append(job)
                    break
        
        return filtered_jobs
    
    async def scrape(self, keywords: Optional[List[str]] = None) -> Dict:
        """Main scrape method"""
        try:
            html = await self.fetch_page()
            if not html:
                return {'success': False, 'error': 'Failed to fetch page', 'jobs': []}
            
            jobs = self.parse_jobs(html)
            
            if keywords:
                jobs = self.filter_by_keywords(jobs, keywords)
            
            return {
                'success': True,
                'total_jobs': len(jobs),
                'jobs': jobs,
                'keywords': keywords
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'jobs': []
            }


async def scrape_remoteok(keywords: Optional[List[str]] = None) -> Dict:
    """Helper function to scrape remoteok.com"""
    async with RemoteOkScraper() as scraper:
        return await scraper.scrape(keywords)
