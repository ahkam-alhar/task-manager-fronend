import { connect, useDispatch } from 'react-redux';
import Loader from '../../Components/Loader/Loader';
import TaskCard from '../../Components/TaskCard';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllTask } from '../../actions/task-actions';
import * as Label from '../../Constants/labels';
import React from 'react';

const CompletedTask = ({ loading, allTasks }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allTasks === null) dispatch(getAllTask());
  });

  useEffect(() => {
    if (allTasks !== null) {
      /**
       * Geting only Completed tasks.
       * Then sort all tasks based on the time that task is created (descending order)
       */
      const filteredData = allTasks
        .filter((value) => value.status === parseInt(Label.COMPLETED_VALUE))
        .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

      setCompletedTasks(filteredData);
    }
  }, [allTasks]);

  return (
    <>
      {loading && <Loader />}
      <div className="main-container viewpoint-height">
        <TaskCard
          classOverride={'border-success'}
          textClassOverride={'text-success'}
          cardHeading={'Completed Tasks'}
          cardData={completedTasks}
        />
      </div>
    </>
  );
};

CompletedTask.propTypes = {
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

export default connect(mapStateToProps, null)(CompletedTask);
