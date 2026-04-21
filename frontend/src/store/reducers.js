import {
  SET_KEYWORDS,
  ADD_KEYWORD,
  REMOVE_KEYWORD,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CLEAR_JOBS
} from './actions';

const initialState = {
  keywords: [],
  jobs: [],
  loading: false,
  error: null,
  totalJobs: 0
};

export function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload.slice(0, 5)
      };

    case ADD_KEYWORD:
      if (state.keywords.length < 5 && !state.keywords.includes(action.payload)) {
        return {
          ...state,
          keywords: [...state.keywords, action.payload]
        };
      }
      return state;

    case REMOVE_KEYWORD:
      return {
        ...state,
        keywords: state.keywords.filter((_, index) => index !== action.payload)
      };

    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs || [],
        totalJobs: action.payload.total_jobs || 0,
        error: null
      };

    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        jobs: []
      };

    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
        totalJobs: 0,
        error: null
      };

    default:
      return state;
  }
}
