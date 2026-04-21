# RemoteOk Scraper - Frontend

React + Redux frontend for searching and displaying remote job listings.

## Overview

The frontend provides:
- Intuitive UI for keyword management (up to 5)
- Real-time job search and filtering
- Responsive design for all devices
- Efficient state management with Redux
- Beautiful, modern styling

## Architecture

### Components

#### SearchBar Component (`components/SearchBar.jsx`)
- Keyword input field
- Add/remove keyword buttons
- Search button
- Visual feedback for max keywords (5)

#### JobCard Component (`components/JobCard.jsx`)
- Individual job display
- Title, company, and location
- Direct link to job posting
- Hover effects

#### JobList Component (`components/JobList.jsx`)
- Grid of job cards
- Loading state with spinner
- Error message display
- Empty state message
- Results counter

#### App Component (`App.jsx`)
- Main application container
- Redux store integration
- Component orchestration

### Redux Store

#### Actions (`store/actions.js`)
- `SET_KEYWORDS` - Set keywords array
- `ADD_KEYWORD` - Add single keyword
- `REMOVE_KEYWORD` - Remove keyword by index
- `FETCH_JOBS_REQUEST` - Start loading
- `FETCH_JOBS_SUCCESS` - Success with data
- `FETCH_JOBS_FAILURE` - Error occurred
- `CLEAR_JOBS` - Clear results
- `fetchJobs` - Async action for API calls

#### Reducers (`store/reducers.js`)
- Manages keywords state
- Handles job loading/error states
- Enforces 5-keyword limit
- Prevents duplicate keywords

#### Store (`store/index.js`)
- Redux store configuration
- Redux Thunk middleware for async actions

## Styling

### CSS Files

1. **index.css** - Global styles
   - Color scheme and typography
   - Smooth transitions
   - Base element styles

2. **App.css** - Main layout
   - Header, footer, content areas
   - Responsive grid layout

3. **SearchBar.css** - Search component
   - Input and button styles
   - Keyword badges and animations
   - Responsive adjustments

4. **JobList.css** - Results display
   - Grid layout
   - Loading spinner animation
   - Error and empty states

5. **JobCard.css** - Individual jobs
   - Card layout and shadows
   - Hover effects
   - Typography and spacing

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

App runs on `http://localhost:3000` (or next available port)

### 3. Build for Production
```bash
npm run build
```

Output in `dist/` directory

### 4. Preview Production Build
```bash
npm run preview
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # Search input component
│   │   ├── JobCard.jsx         # Single job display
│   │   └── JobList.jsx         # Job results grid
│   ├── store/
│   │   ├── actions.js          # Redux actions and async thunks
│   │   ├── reducers.js         # Redux reducers
│   │   └── index.js            # Store configuration
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   ├── App.css             # App layout
│   │   ├── SearchBar.css       # Search component
│   │   ├── JobList.css         # Results container
│   │   └── JobCard.css         # Job card styling
│   ├── App.jsx                 # Main App component
│   └── main.jsx                # Entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── .gitignore
```

## Usage

### Adding Keywords
1. Type keyword in input field
2. Click "Add Keyword" or press Enter
3. Maximum 5 keywords allowed
4. Click ×on badge to remove

### Searching
1. Add desired keywords
2. Click "Search Jobs"
3. Results display in grid
4. Refresh browser to clear state

### Viewing Jobs
- Each card shows title, company, location
- Click "View Job →" to open in new tab

## State Management Flow

```
User Input
    ↓
dispatch(addKeyword)
    ↓
Reducer updates state.keywords
    ↓
Component re-renders
    ↓
User clicks "Search Jobs"
    ↓
dispatch(fetchJobs(keywords))
    ↓
Async thunk calls API
    ↓
dispatch(fetchJobsSuccess/Failure)
    ↓
Reducer updates jobs state
    ↓
Component displays results
```

## API Integration

### Backend URL
Default: `http://localhost:8000/scrape`

To change:
Edit `store/actions.js`:
```javascript
const response = await fetch('YOUR_API_URL/scrape', {
  // ...
})
```

### Request Format
```javascript
{
  keywords: ['Python', 'React', 'Senior']
}
```

### Response Format
```javascript
{
  success: true,
  total_jobs: 45,
  keywords: ['Python', 'React', 'Senior'],
  jobs: [
    {
      title: 'Senior Python Developer',
      company: 'TechCorp',
      location: 'Remote',
      url: 'https://...'
    }
  ]
}
```

## Responsive Design

### Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Layout Changes
- Grid: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- Input: Row layout (desktop) → Column layout (mobile)
- Components scale text and padding appropriately

## Performance Optimization

- Component memoization (recommended for future)
- Redux selectors for efficient data access
- CSS transitions instead of animations
- Debounced search (can be added)
- Lazy loading of components (future enhancement)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Tools

### Redux DevTools
Install browser extension for debugging:
- Chrome: Redux DevTools
- Firefox: Redux DevTools

Add to store (development):
```javascript
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  jobsReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
```

### Vite Features
- Hot Module Replacement (HMR)
- Instant server start
- Optimized build output
- Native ESM support

## Troubleshooting

### Port Already in Use
```bash
# Vite will automatically use next available port
# Or specify manually in vite.config.js
```

### API Connection Errors
1. Verify backend running on `http://localhost:8000`
2. Check CORS configuration
3. Check browser console for details

### Redux Not Updating
1. Verify Redux DevTools installed
2. Check reducer logic
3. Confirm dispatch calls use correct action type

### Styling Issues
- Clear browser cache
- Rebuild with `npm run build`
- Check CSS file imports in components

## Future Enhancements

- [ ] Infinite scroll pagination
- [ ] Advanced filtering UI
- [ ] Job bookmarking
- [ ] Local storage for saved searches
- [ ] Dark mode toggle
- [ ] Social sharing
- [ ] PWA installation
- [ ] Accessibility improvements
- [ ] Animation improvements

## Dependencies

```json
{
  "react": "^18.2.0",           // UI library
  "react-dom": "^18.2.0",        // DOM rendering
  "redux": "^4.2.1",             // State management
  "react-redux": "^8.1.3",       // React bindings
  "redux-thunk": "^2.4.2",       // Async actions
  "@vitejs/plugin-react": "^4.2.0",  // Vite React support
  "vite": "^5.0.2"               // Build tool
}
```

## Support

For frontend issues:
1. Check the main README.md
2. React documentation: https://react.dev
3. Redux documentation: https://redux.js.org
4. Vite documentation: https://vitejs.dev
