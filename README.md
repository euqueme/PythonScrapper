# RemoteOk Job Scraper

A full-stack web application for scraping job listings from remoteok.com with keyword filtering. Features a Python FastAPI backend and a React + Redux frontend.

## Features

- 🔍 Search remote jobs with up to 5 keywords
- ⚡ Real-time job scraping from remoteok.com
- 🎨 Beautiful, responsive UI
- 📊 Redux state management for efficient data handling
- 🔌 RESTful API backend
- 🚀 Fast async operations with FastAPI

## Project Structure

```
PythonScrapper/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── scraper.py        # Web scraper logic
│   ├── requirements.txt   # Python dependencies
│   ├── .env.example       # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store (actions, reducers)
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Node dependencies
│   ├── vite.config.js     # Vite configuration
│   └── .gitignore
└── README.md
```

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Web Scraper**: BeautifulSoup4, Requests
- **Async**: AsyncIO, AIOHTTP
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **State Management**: Redux + Redux Thunk
- **Build Tool**: Vite
- **HTTP Client**: Fetch API

## Getting Started

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   # or
   source venv/bin/activate      # On macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

5. **API Documentation**
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## API Endpoints

### POST /scrape
Scrape jobs with optional keyword filtering

**Request**:
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
      "company": "TechCorp",
      "location": "Remote",
      "url": "https://remoteok.com/..."
    }
  ]
}
```

### GET /scrape
Alternative GET method with query parameters

**Query Parameters**:
- `keywords`: Comma-separated keywords (e.g., `Python,React,Senior`)

## Usage

1. **Add Keywords**: Enter job keywords (up to 5) in the search bar
2. **Search**: Click "Search Jobs" to scrape and filter results
3. **View Results**: Browse the job cards with title, company, and location
4. **Visit Jobs**: Click "View Job →" to visit the original job posting

## How It Works

1. **Frontend**: User enters keywords and clicks search
2. **Redux Action**: Dispatches async action to fetch jobs
3. **API Call**: Sends POST request to `/scrape` endpoint with keywords
4. **Backend Scraping**: FastAPI fetches remoteok.com and scrapes job listings
5. **Filtering**: Jobs are filtered by keywords (title and company)
6. **Response**: Filtered results returned to frontend
7. **Redux Update**: State updated with new jobs
8. **UI Render**: Results displayed in responsive grid

## Features in Detail

### Keyword Management
- Add up to 5 keywords
- Remove keywords individually
- Keywords are case-insensitive
- Prevent duplicate keywords

### Search Results
- Display total jobs found
- Show job title, company, and location
- Direct links to job postings
- Responsive card layout
- Loading states and error handling

### State Management
The Redux store maintains:
- `keywords`: Currently selected keywords
- `jobs`: Fetched job listings
- `loading`: Loading state during fetch
- `error`: Error messages
- `totalJobs`: Count of results

## Error Handling

The application handles:
- Network errors
- Invalid API responses
- Empty search results
- Keyword validation
- Form validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Async scraping for non-blocking operations
- Keyword limit (5) for reasonable search scopes
- Debounced requests
- Optimized Redux selectors
- Lazy loading of components

## Future Enhancements

- [ ] Save favorite jobs
- [ ] Email notifications
- [ ] Advanced filtering (salary range, experience level)
- [ ] Job comparison
- [ ] Search history
- [ ] Database integration
- [ ] Authentication
- [ ] Pagination

## Troubleshooting

### Backend won't start
- Ensure Python 3.7+ is installed
- Check virtual environment is activated
- Verify all dependencies are installed

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node.js version (14+ recommended)

### CORS errors
- Ensure backend is running on `http://localhost:8000`
- Frontend should be on `http://localhost:3000`
- CORS is configured in FastAPI

### Scraper returns no results
- RemoteOk.com HTML structure may have changed
- Check browser console for errors
- Visit https://remoteok.com directly to verify site is accessible

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please refer to the GitHub repository.
