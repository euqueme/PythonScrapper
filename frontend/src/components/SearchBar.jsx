import React from 'react';
import '../styles/SearchBar.css';

export function SearchBar({ keywords, onAddKeyword, onRemoveKeyword, onSearch, loading }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleAddKeyword = () => {
    if (inputValue.trim() && keywords.length < 5) {
      onAddKeyword(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-section">
        <h2>Search for Remote Jobs</h2>
        <p className="subtitle">Add up to 5 keywords to filter job listings</p>

        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter keyword (e.g., Python, React, Senior)"
            disabled={loading || keywords.length >= 5}
            className="keyword-input"
          />
          <button
            onClick={handleAddKeyword}
            disabled={loading || keywords.length >= 5 || !inputValue.trim()}
            className="add-btn"
          >
            Add Keyword
          </button>
        </div>

        <div className="keywords-container">
          {keywords.map((keyword, index) => (
            <div key={index} className="keyword-badge">
              <span>{keyword}</span>
              <button
                onClick={() => onRemoveKeyword(index)}
                className="remove-btn"
                disabled={loading}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => onSearch(keywords)}
          disabled={loading}
          className={`search-btn ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </div>
    </div>
  );
}
