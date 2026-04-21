import React from 'react';
import { JobCard } from './JobCard';
import '../styles/JobList.css';

export function JobList({ jobs, loading, error, totalJobs }) {
  if (loading) {
    return (
      <div className="jobs-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="jobs-container">
        <div className="empty-state">
          <p>No jobs found. Start by adding keywords and searching!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <div className="results-header">
        <h3>Found {totalJobs} job{totalJobs !== 1 ? 's' : ''}</h3>
      </div>
      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}
