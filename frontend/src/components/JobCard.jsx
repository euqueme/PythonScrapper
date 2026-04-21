import React from 'react';
import '../styles/JobCard.css';

export function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <a href={job.url} target="_blank" rel="noopener noreferrer" className="job-link">
          View Job →
        </a>
      </div>

      <div className="job-details">
        <div className="job-company">
          <strong>Company:</strong>
          <span>{job.company}</span>
        </div>
        <div className="job-location">
          <strong>Location:</strong>
          <span>{job.location}</span>
        </div>
      </div>
    </div>
  );
}
