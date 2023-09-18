import { connect, useDispatch } from 'react-redux';
import './dashboard.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTask } from '../../actions/task-actions';
import Loader from '../../Components/Loader';
import TaskCard from '../../Components/TaskCard';

const Dashboard = ({ loading, allTasks }) => {
  const [highPrioPendingTasks, setHighPrioPendingTasks] = useState([]);
  const [lowMedPrioPendingTasks, setLowMedPrioPendingTasks] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  // const [data, setData] = useState([{ x: 'Cats', y: 35 }, { x: 'Dogs', y: 55 }, { x: 'Birds', y: 10 }]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allTasks === null) dispatch(getAllTask());
  });

  useEffect(() => {
    if (allTasks) {
      const highPrioPendingTaskList = [];
      const lowPrioPendingTaskList = [];
      const mediumPrioPendingTaskList = [];

      const highPrioOpenTaskList = [];
      const mediumPrioOpenTaskList = [];
      const lowPrioOpenTaskList = [];

      allTasks.map((task) => {
        const { priority, status } = task;

        if (priority === 1) {
          if (status === 1) highPrioPendingTaskList.push(task);
          else if (status === 0) highPrioOpenTaskList.push(task);
        } else if (priority === 0) {
          if (status === 1) mediumPrioPendingTaskList.push(task);
          else if (status === 0) mediumPrioOpenTaskList.push(task);
        } else if (priority === -1) {
          if (status === 1) lowPrioPendingTaskList.push(task);
          else if (status === 0) lowPrioOpenTaskList.push(task);
        }

        return task;
      });

      setHighPrioPendingTasks(highPrioPendingTaskList);
      setLowMedPrioPendingTasks([
        ...mediumPrioPendingTaskList,
        ...lowPrioPendingTaskList,
      ]);
      setOpenTasks([
        ...highPrioOpenTaskList,
        ...mediumPrioOpenTaskList,
        ...lowPrioOpenTaskList,
      ]);
    }
  }, [allTasks]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-container">
          <div className="sub-container d-flex justify-content-start">
            <div className="left-sub-container">
              <TaskCard
                classOverride={'border-danger'}
                textClassOverride={'text-danger'}
                cardHeading={'Top Priority Pending Tasks'}
                cardData={highPrioPendingTasks}
              />
            </div>
            <div className="right-sub-container">
              {/* <Doughnut 
                            data={data}
                            width='500'
                            height='500'
                            legendPosition='left'
                            constrainToVisibleArea='true'
                        /> */}
            </div>
          </div>
          <hr />
          <div className="sub-container bottom-sub-con d-flex justify-content-between">
            <div className="bottom-sub-container">
              <TaskCard
                classOverride={'border-warning'}
                textClassOverride={'text-warning'}
                cardHeading={'Medium and Low Priority Pending Tasks'}
                cardData={lowMedPrioPendingTasks}
              />
            </div>
            <div className="bottom-sub-container">
              <TaskCard
                classOverride={'border-secondary'}
                textClassOverride={'text-secondary'}
                cardHeading={'Open Tasks'}
                cardData={openTasks}
                // additionalTag={<button className='btn btn-outline-primary btn-sm'>Start</button>}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  allTasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { loading, allTasks } = state;

  return {
    loading,
    allTasks,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
