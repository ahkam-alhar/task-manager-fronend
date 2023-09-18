import axios from 'axios';
import {
  DELETE_TASK,
  GET_DASHBOARD_TASKS,
  SAVE_TASK,
  SET_LOADING,
  UPDATE_TASK,
} from '../Constants/action-types';
import { config } from '../config/config';

/**
 * Action Type: ActionTypes.GET_DASHBOARD_TASKS
 * Description: Dispatched when get all tasks from task table.
 */
export const getDashboardTasks = (data) => {
  return {
    type: GET_DASHBOARD_TASKS,
    payload: data,
  };
};

/**
 * Action Type: ActionTypes.SET_LOADING
 * Description: Dispatched when page loading.
 */
export const setLoadingStatus = (loading) => {
  return {
    type: SET_LOADING,
    payload: { loading },
  };
};

/**
 * Action Type: ActionTypes.SAVE_TASK
 * Description: Dispatched when a new task is added to the task table.
 */
export const changeSaveTaskCount = (data) => {
  return {
    type: SAVE_TASK,
    payload: data,
  };
};

/**
 * Action Type: ActionTypes.DELETE_TASK
 * Description: Dispatched when delete a task from task table.
 */
export const successDeleteTask = (data) => {
  return {
    type: DELETE_TASK,
    payload: data,
  };
};

/**
 * Action Type: ActionTypes.UPDATE_TASK
 * Description: Dispatched when update a task from task table.
 */
export const successUpdateTask = (data) => {
  return {
    type: UPDATE_TASK,
    payload: data,
  };
};

export const getAllTask = () => (dispatch) => {
  const { url, method } = config.getAllTasks;

  return axios({
    url,
    method,
  }).then((response) => {
    dispatch(getDashboardTasks(response.data));
  });
};

export const saveTask = (data) => (dispatch) => {
  const { url, method } = config.saveTask;

  return axios({
    url,
    method,
    data,
  }).then((response) => {
    dispatch(changeSaveTaskCount(response));
  });
};

export const deleteTask = (id) => (dispatch) => {
  const { url, method } = config.deleteTask;

  return axios({
    url: url.replace(':id', id),
    method,
  }).then((response) => {
    dispatch(successDeleteTask(response));
    dispatch(getAllTask());
  });
};

export const updateTask = (id, data) => (dispatch) => {
  const { url, method } = config.updateTask;

  return axios({
    url: url.replace(':id', id),
    method,
    data,
  }).then((response) => {
    dispatch(successUpdateTask(response));
    dispatch(getAllTask());
  });
};
