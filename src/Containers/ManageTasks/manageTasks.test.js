import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ManageTasks from './manageTasks';

const mockStore = configureStore([thunk]);

const initState = {
  loading: false,
  allTasks: [
    {
      id: '18eba160-5232-487a-afc8-53fd850b8504',
      task: 'atmm',
      priority: 0,
      status: 0,
      timestamp: '2023-09-18T03:33:08.925+00:00',
    },
    {
      id: '1b6835d2-646d-4ed4-a59b-6fe7449063b0',
      task: 'atmmm',
      priority: 0,
      status: 0,
      timestamp: '2023-09-18T03:33:28.033+00:00',
    },
    {
      id: '2065b42a-db31-4f73-9129-33f05d69f02c',
      task: 'Medium Pending',
      priority: 0,
      status: 1,
      timestamp: '2023-09-17T10:13:28.937+00:00',
    },
  ],
};

describe('Test suite for manage task container', () => {
  let wrapper;

  beforeAll(() => {
    const store = mockStore(initState);
    wrapper = mount(
      <Provider store={store}>
        <ManageTasks {...{ store }} />
      </Provider>
    );
  });

  it('Test case to render Manage Tasks', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
