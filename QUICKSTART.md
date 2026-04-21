# Quick Start Guide

## Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn
- Git

## One-Command Setup

### Windows (PowerShell)
```powershell
# Backend setup
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend setup (in new terminal)
cd ../frontend
npm install
```

### macOS/Linux (Bash)
```bash
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup (in new terminal)
cd ../frontend
npm install
```

## Running the Application

### Terminal 1 - Backend
```bash
cd backend

# Windows
.\venv\Scripts\activate
python main.py

# macOS/Linux
source venv/bin/activate
python main.py
```

Backend runs at: **http://localhost:8000**
- API docs: http://localhost:8000/docs

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Frontend runs at: **http://localhost:3000**

## Verify Everything Works

1. **Check Backend Health**
   ```bash
   curl http://localhost:8000/health
   ```
   Expected: `{"status":"healthy"}`

2. **Check Frontend**
   Open http://localhost:3000 in browser
   - You should see the search bar
   - Try adding keywords and searching

3. **Test Full Flow**
   - Add 2-3 keywords (e.g., "Python", "React")
   - Click "Search Jobs"
   - Wait for results to load
   - You should see a grid of job cards

## Troubleshooting

### Backend won't start
```bash
# Ensure virtual environment is activated
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Try again
python main.py
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install

# Start again
npm run dev
```

### API calls failing (CORS error)
- Ensure backend is running (`http://localhost:8000`)
- Check frontend is on correct URL
- Verify CORS is configured in `backend/main.py`

### No jobs appearing
- Check browser console for errors (F12)
- Verify API endpoint in `frontend/src/store/actions.js`
- Try different keywords

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 8000 already in use | Change port in backend/main.py |
| Port 3000 already in use | Vite will use next available port |
| Module not found | Reinstall dependencies in respective folder |
| Empty results | Try different keywords, verify remoteok.com is accessible |
| CORS errors | Backend and frontend URLs must match config |

## Next Steps

1. Read the main [README.md](README.md)
2. Check [backend/README.md](backend/README.md) for API details
3. Check [frontend/README.md](frontend/README.md) for UI details
4. Explore the codebase and customize as needed

## Project Structure Quick Reference

```
PythonScrapper/
├── backend/          → Python FastAPI server
├── frontend/         → React web application
├── README.md         → Main documentation
└── QUICKSTART.md     → This file
```

Enjoy!
