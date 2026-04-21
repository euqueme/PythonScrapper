# RemoteOk Scraper - Backend

FastAPI-based backend for scraping job listings from remoteok.com with keyword filtering.

## Overview

The backend provides a RESTful API that:
- Fetches job listings from remoteok.com
- Filters jobs by keywords
- Returns structured job data
- Handles async operations efficiently

## Architecture

### Components

1. **main.py** - FastAPI Application
   - Defines API endpoints
   - CORS middleware configuration
   - Request/response models

2. **scraper.py** - Web Scraper
   - `RemoteOkScraper` class for scraping logic
   - Async HTTP requests
   - HTML parsing with BeautifulSoup
   - Keyword filtering

## API Endpoints

### Health Check
```
GET /
GET /health
```

### Scraping Endpoint

#### POST /scrape
Search jobs with keyword filtering

**Request Body**:
```json
{
  "keywords": ["Python", "React", "Senior"]
}
```

**Response**:
```json
{
  "success": true,
  "total_jobs": 45,
  "keywords": ["Python", "React", "Senior"],
  "jobs": [
    {
      "title": "Senior Python Developer",
      "company": "TechCorp Inc",
      "location": "Remote",
      "url": "https://remoteok.com/..."
    }
  ]
}
```

#### GET /scrape
Alternative GET endpoint with query parameters

**Query Parameters**:
- `keywords` (optional): Comma-separated keywords
  Example: `/scrape?keywords=Python,React,Senior`

## Dependencies

```
fastapi==0.104.1       # Web framework
uvicorn==0.24.0        # ASGI server
beautifulsoup4==4.12.2 # HTML parsing
requests==2.31.0       # HTTP requests
python-dotenv==1.0.0   # Environment variables
httpx==0.25.0          # Async HTTP
aiohttp==3.9.1         # Async HTTP client
```

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
source venv/Scripts/activate  # Windows
source venv/bin/activate      # macOS/Linux
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment (Optional)
```bash
cp .env.example .env
# Edit .env as needed
```

### 4. Run Development Server
```bash
python main.py
```

Server runs on `http://localhost:8000`

### 5. Access API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Usage Examples

### Using curl

```bash
# Health check
curl http://localhost:8000/health

# Search with keywords (POST)
curl -X POST http://localhost:8000/scrape \
  -H "Content-Type: application/json" \
  -d '{"keywords": ["Python", "React"]}'

# Search with keywords (GET)
curl "http://localhost:8000/scrape?keywords=Python,React"
```

### Using Python

```python
import requests

# POST request
response = requests.post(
    'http://localhost:8000/scrape',
    json={'keywords': ['Python', 'React']}
)
jobs = response.json()
```

## Configuration

### CORS Settings

The API accepts requests from:
- `http://localhost:3000` (Frontend dev)
- `http://localhost:5173` (Vite dev server)

To add more origins, edit `main.py`:
```python
allow_origins=["http://your-domain.com"]
```

### Timeout Settings

The scraper has a 10-second timeout for fetching pages. To modify:
```python
# In scraper.py, modify fetch_page method
timeout=10  # Change this value
```

## Performance

- **Async Operations**: Non-blocking I/O with asyncio
- **Timeout**: 10 seconds per request
- **Keyword Limit**: 5 keywords max
- **Caching**: Currently not implemented (future enhancement)

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK` - Successful request
- `422 Unprocessable Entity` - Invalid request data
- `500 Internal Server Error` - Server-side error

Response format on error:
```json
{
  "success": false,
  "error": "Error description",
  "jobs": []
}
```

## Debugging

### Enable Debug Logging
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Common Issues

1. **Failed to fetch page**
   - Check internet connection
   - Verify remoteok.com is accessible
   - Check user-agent headers

2. **Empty results**
   - RemoteOk HTML structure may have changed
   - Update selectors in `scraper.py`
   - Check if keywords are valid

3. **CORS errors**
   - Verify CORS middleware is configured
   - Check frontend URL is in allow_origins

## Testing

To test the scraper manually:

```python
import asyncio
from scraper import scrape_remoteok

# Test without keywords
result = asyncio.run(scrape_remoteok())
print(f"Found {result['total_jobs']} jobs")

# Test with keywords
result = asyncio.run(scrape_remoteok(['Python', 'React']))
print(f"Found {result['total_jobs']} jobs matching keywords")
```

## Deployment

### Production Server
```bash
# Using gunicorn with uvicorn workers
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Docker (Optional)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Future Enhancements

- [ ] Database for job caching
- [ ] Rate limiting
- [ ] Job deduplication
- [ ] Advanced filtering (salary, experience level)
- [ ] Pagination support
- [ ] Email notifications
- [ ] Job availability tracking

## Support

For issues or questions about the backend, check:
1. The main README.md
2. FastAPI documentation: https://fastapi.tiangolo.com
3. BeautifulSoup documentation: https://www.crummy.com/software/BeautifulSoup/
