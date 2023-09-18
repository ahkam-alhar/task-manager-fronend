import axios from 'axios';
import {
  DELETE_TASK,
  GET_DASHBOARD_TASKS,
  SAVE_TASK,
  SET_LOADING,
  UPDATE_TASK,
} from '../Constants/action-types';
import { config } from '../config/config';

export const getDashboardTasks = (data) => {
  return {
    type: GET_DASHBOARD_TASKS,
    payload: data,
  };
};

export const setLoadingStatus = (loading) => {
  return {
    type: SET_LOADING,
    payload: { loading },
  };
};

export const changeSaveTaskCount = (data) => {
  return {
    type: SAVE_TASK,
    payload: data,
  };
};

export const successDeleteTask = (data) => {
  return {
    type: DELETE_TASK,
    payload: data,
  };
};

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
  // dispatch(setLoadingStatus(true));

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
