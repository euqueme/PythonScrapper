import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addKeyword, removeKeyword, fetchJobs } from './store/actions';
import { SearchBar } from './components/SearchBar';
import { JobList } from './components/JobList';
import './styles/App.css';

function App() {
  const dispatch = useDispatch();
  const { keywords, jobs, loading, error, totalJobs } = useSelector(state => state);

  const handleAddKeyword = (keyword) => {
    dispatch(addKeyword(keyword));
  };

  const handleRemoveKeyword = (index) => {
    dispatch(removeKeyword(index));
  };

  const handleSearch = (keywords) => {
    dispatch(fetchJobs(keywords));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>RemoteOk Job Scraper</h1>
          <p>Find remote jobs by keywords</p>
        </div>
      </header>

      <main className="app-main">
        <SearchBar
          keywords={keywords}
          onAddKeyword={handleAddKeyword}
          onRemoveKeyword={handleRemoveKeyword}
          onSearch={handleSearch}
          loading={loading}
        />

        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          totalJobs={totalJobs}
        />
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 RemoteOk Scraper | Jobs from remoteok.com</p>
      </footer>
    </div>
  );
}

export default App;
