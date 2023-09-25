import { connect, useDispatch } from 'react-redux';
import './dashboard.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTask } from '../../actions/task-actions';
import Loader from '../../Components/Loader';
import TaskCard from '../../Components/TaskCard';
import { PieChart } from 'react-minimal-pie-chart';
import * as Label from '../../Constants/labels';
import React from 'react';

const Dashboard = ({ loading, allTasks }) => {
  const [highPrioPendingTasks, setHighPrioPendingTasks] = useState([]);
  const [lowMedPrioPendingTasks, setLowMedPrioPendingTasks] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
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

      // Categorizing pending and open tasks based on prioritization and status
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

      // Categorizing pending tasks and count based on prioritization
      const pieData = [];
      pieData.push({
        title: Label.HIGH,
        value: highPrioPendingTaskList.length,
        color: '#dc3545',
      });
      pieData.push({
        title: Label.MEDIUM,
        value: mediumPrioPendingTaskList.length,
        color: '#ffc107',
      });
      pieData.push({
        title: Label.LOW,
        value: lowPrioPendingTaskList.length,
        color: '#adb5bd',
      });

      // Remove 0 length pending tasks
      const filteredPieData = pieData.filter((task) => task.value !== 0);

      setPieChartData(filteredPieData);
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
              <h6 className="text-dark">
                {Label.CURRENT_PENDING_TASKS_SUMMARY}
              </h6>
              {pieChartData && pieChartData.length !== 0 && (
                <PieChart
                  data={pieChartData}
                  lineWidth={60}
                  label={(chartProps) => {
                    const { percentage, title, value } = chartProps.dataEntry;
                    return `${title} - ${value}(${percentage.toFixed(0)}%)`;
                  }}
                  labelStyle={{
                    fontSize: '7px',
                    fill: '#121212',
                  }}
                />
              )}
              {pieChartData && pieChartData.length === 0 && (
                <h3 className="text-secondary text-center my-5">
                  {Label.CHART_NOT_AVAILABLE_DUE_TO_NO_DATA}
                </h3>
              )}
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
  allTasks: PropTypes.array,
};

const mapStateToProps = (state) => {
  const { loading, allTasks } = state;

  return {
    loading,
    allTasks,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
