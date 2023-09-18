// TODO: Change the port number based on the Spring Project
const IP_ADDRESS = 'http://localhost:{YOUR_SPRING_PROJECT_PORT}/api';

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
