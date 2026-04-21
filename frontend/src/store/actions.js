// Action types
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';
export const CLEAR_JOBS = 'CLEAR_JOBS';
export const ADD_KEYWORD = 'ADD_KEYWORD';
export const REMOVE_KEYWORD = 'REMOVE_KEYWORD';

// Action creators
export function setKeywords(keywords) {
  return {
    type: SET_KEYWORDS,
    payload: keywords
  };
}

export function addKeyword(keyword) {
  return {
    type: ADD_KEYWORD,
    payload: keyword
  };
}

export function removeKeyword(index) {
  return {
    type: REMOVE_KEYWORD,
    payload: index
  };
}

export function fetchJobsRequest() {
  return {
    type: FETCH_JOBS_REQUEST
  };
}

export function fetchJobsSuccess(data) {
  return {
    type: FETCH_JOBS_SUCCESS,
    payload: data
  };
}

export function fetchJobsFailure(error) {
  return {
    type: FETCH_JOBS_FAILURE,
    payload: error
  };
}

export function clearJobs() {
  return {
    type: CLEAR_JOBS
  };
}

// Async action
export function fetchJobs(keywords = []) {
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
      const response = await fetch('http://localhost:8000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keywords })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      dispatch(fetchJobsSuccess(data));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };
}
