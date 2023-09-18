import {
  DELETE_TASK,
  GET_DASHBOARD_TASKS,
  SAVE_TASK,
  SET_LOADING,
  UPDATE_TASK,
} from '../Constants/action-types';

const initialState = {
  loading: true,
  allTasks: null,
  saveCount: 0,
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
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case SAVE_TASK:
      return {
        ...state,
        allTasks: null,
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: null,
        loading: false,
      };
    case UPDATE_TASK:
      return {
        ...state,
        allTasks: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default taskReducer;
