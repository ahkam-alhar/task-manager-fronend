import './App.css';
import Dashboard from './Containers/Dashboard/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as Navigate from './Constants/routes';
import Navbar from './Containers/NavBar/navbar';
import CreateTask from './Containers/CreateTask/createTask';
import { Provider } from 'react-redux';
import store from './Store/store';
import CompletedTask from './Containers/CompletedTask/completedTask';
import ManageTasks from './Containers/ManageTasks/manageTasks';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path={Navigate.ROOT} element={<Dashboard />} />
            <Route path={Navigate.TO_CREATE_TASK} element={<CreateTask />} />
            <Route
              path={Navigate.TO_COMPLETED_TASKS}
              element={<CompletedTask />}
            />
            <Route path={Navigate.TO_MANAGE_TASKS} element={<ManageTasks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
