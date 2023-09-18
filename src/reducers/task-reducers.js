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
        saveCount: state.saveCount + 1,
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
