from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from scraper import scrape_remoteok
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="RemoteOk Scraper API", version="1.0.0")

# Add CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SearchRequest(BaseModel):
    keywords: List[str] = []


class JobResponse(BaseModel):
    title: str
    company: str
    location: str
    url: str


class ScraperResponse(BaseModel):
    success: bool
    total_jobs: int
    jobs: List[JobResponse]
    keywords: Optional[List[str]] = None
    error: Optional[str] = None


@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint"""
    return {"message": "RemoteOk Scraper API is running"}


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/scrape", response_model=ScraperResponse, tags=["Scraper"])
async def scrape_jobs(request: SearchRequest):
    """
    Scrape jobs from remoteok.com with optional keyword filtering.
    
    Args:
        request: SearchRequest with optional keywords (max 5)
    
    Returns:
        ScraperResponse with job listings
    """
    # Limit keywords to 5
    keywords = request.keywords[:5] if request.keywords else None
    
    result = await scrape_remoteok(keywords)
    return ScraperResponse(**result)


@app.get("/scrape", response_model=ScraperResponse, tags=["Scraper"])
async def scrape_jobs_get(keywords: Optional[str] = Query(None)):
    """
    Scrape jobs from remoteok.com with optional keyword filtering (GET method).
    
    Args:
        keywords: Comma-separated keywords (max 5)
    
    Returns:
        ScraperResponse with job listings
    """
    keyword_list = None
    if keywords:
        keyword_list = [kw.strip() for kw in keywords.split(',')][:5]
    
    result = await scrape_remoteok(keyword_list)
    return ScraperResponse(**result)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
