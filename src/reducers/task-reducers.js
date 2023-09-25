import {
  API_FAILURE,
  DELETE_TASK,
  GET_DASHBOARD_TASKS,
  HANDLE_API_FAILURE_MODAL,
  SAVE_TASK,
  SET_LOADING,
  UPDATE_TASK,
} from '../Constants/action-types';

const initialState = {
  loading: false,
  allTasks: null,
  apiFailure: null,
  showApiFailureModal: false,
};

/**
 * Reducer Function: taskReducer
 * Description: Handles state changes for the task.
 * @param {Array} state - The current state of the task.
 * @param {Object} action - The action object that describes the state change.
 * @returns {Array} - The new state of the task after applying the action.
 */
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_TASKS:
      return {
        ...state,
        allTasks: action.payload,
        showApiFailureModal: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SAVE_TASK:
      return {
        ...state,
        allTasks: null,
        showApiFailureModal: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: null,
        showApiFailureModal: false,
      };
    case UPDATE_TASK:
      return {
        ...state,
        allTasks: null,
        showApiFailureModal: false,
      };
    case API_FAILURE:
      return {
        ...state,
        apiFailure: action.payload,
        showApiFailureModal: true,
      };
    case HANDLE_API_FAILURE_MODAL:
      return {
        ...state,
        apiFailure: null,
        showApiFailureModal: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
