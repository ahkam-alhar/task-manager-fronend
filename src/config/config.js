const IP_ADDRESS = 'http://localhost:8080/api';

export const config = {
  getAllTasks: {
    url: `${IP_ADDRESS}/tasks`,
    method: 'GET',
  },
  saveTask: {
    url: `${IP_ADDRESS}/tasks`,
    method: 'POST',
  },
  deleteTask: {
    url: `${IP_ADDRESS}/tasks/:id`,
    method: 'DELETE',
  },
  updateTask: {
    url: `${IP_ADDRESS}/tasks/:id`,
    method: 'PUT',
  },
};
