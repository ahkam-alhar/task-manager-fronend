import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';
import { useEffect, useState } from 'react';
import * as Label from '../../Constants/labels';
import { deleteTask, getAllTask, updateTask } from '../../actions/task-actions';
import Modal from '../../Components/Modal';
import React from 'react';

const ManageTasks = ({ loading, allTasks, deleteTaskFn, updateTaskFn }) => {
  const [taskList, setTaskList] = useState([]);
  const [updateValue, setUpdateValue] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allTasks === null) dispatch(getAllTask());
  });

  useEffect(() => {
    if (allTasks !== null) {
      /**
       * Sort all tasks based on the time that task is created. (descending order)
       * Then doing some modification based on priority and status
       */
      const sortedTasks = allTasks
        .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
        .map((value) => {
          if (value.priority === parseInt(Label.LOW_VALUE)) {
            value.priorityValue = Label.LOW;
            value.txtCss = 'text-secondary';
          } else if (value.priority === parseInt(Label.MEDIUM_VALUE)) {
            value.priorityValue = Label.MEDIUM;
            value.txtCss = 'text-warning';
          } else if (value.priority === parseInt(Label.HIGH_VALUE)) {
            value.priorityValue = Label.HIGH;
            value.txtCss = 'text-danger';
          }

          if (value.status === parseInt(Label.OPEN_VALUE))
            value.statusValue = Label.OPEN;
          else if (value.status === parseInt(Label.PENDING_VALUE))
            value.statusValue = Label.PENDING;
          else if (value.status === parseInt(Label.COMPLETED_VALUE))
            value.statusValue = Label.COMPLETED;

          // convert timestamp to 'YYYY-MM-DD' format
          value.timestamp = new Date(Date.parse(value.timestamp))
            .toISOString()
            .slice(0, 10);

          value.editMode = false;

          return value;
        });

      setTaskList(sortedTasks);
    }
  }, [allTasks]);

  /**
   * handleEdit - Event handler for form updation.
   * Description: Triggers form updation, performs necessary actions, and prevents default behavior.
   * @param {Event} e - The form updation event.
   */
  const onEdit = (e, index) => {
    e.preventDefault();

    const tasks = [...taskList];
    tasks.map((value) => (value.editMode = false));
    tasks[index].editMode = true;
    setUpdateValue({
      task: tasks[index].task,
      priority: tasks[index].priority,
      status: tasks[index].status,
    });
    setTaskList(tasks);
  };

  /**
   * handleChange - Event handler for input changes.
   * Description: Handles user input changes and updates the component's state accordingly.
   * @param {Event} e - The input change event.
   */
  const onChange = (e) => {
    setUpdateValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * handleCancel - Event handler for cancellation actions.
   * Description: Handles user cancel actions, resets the component or performs relevant actions.
   * @param {Event} e - The cancel event (e.g., button click).
   */
  const onCancel = (e) => {
    e.preventDefault();

    const tasks = [...taskList];
    tasks.map((value) => (value.editMode = false));
    setUpdateValue({});
    setTaskList(tasks);
  };

  /**
   * handleDeleteClick - Event handler for task deletion modal.
   * Description: Once this function is called modal will be loaded
   */
  const onDeleteClick = (e, value) => {
    e.preventDefault();

    setDeleteId(value.id);
    setViewModal(true);
  };

  /**
   * handleModal - Event handler for close modal.
   */
  const closeModal = () => {
    setViewModal(false);
  };

  /**
   * handleDelete - Event handler for task deletion.
   * Description: Handles the deletion of a specific task, updates the state or performs relevant actions.
   * @param {Event} e - The delete event (e.g., button click).
   * @param {string} deleteId - The unique identifier of the item to be deleted.
   */
  const onDelete = (e) => {
    e.preventDefault();

    // Hide the Modal
    setViewModal(false);

    deleteTaskFn(deleteId);
  };

  /**
   * handleUpdate - Event handler for updating a task.
   * Description: Manages the update process for a specific item, triggering state changes or relevant actions.
   * @param {Event} e - The update event (e.g., button click).
   * @param {string} value.id - The unique identifier of the item to be updated.
   */
  const onUpdate = (e, value) => {
    e.preventDefault();

    if (updateValue.task.length !== 0) updateTaskFn(value.id, updateValue);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="main-container viewpoint-height">
        <h2>{Label.MANAGE_TASKS}</h2>
        <div className={`card custom-height`}>
          <div className="card-body overflow-auto">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{Label.TASK}</th>
                  <th scope="col">{Label.PRIORITY}</th>
                  <th scope="col">{Label.STATUS}</th>
                  <th scope="col">{Label.CREATED_DATE}</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      {value.editMode ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={Label.ENTER_TASK_NAME}
                              name="task"
                              maxLength={254}
                              value={updateValue.task}
                              onChange={onChange}
                            />
                            {updateValue.task.length === 0 && (
                              <div className="text-danger">
                                {Label.THIS_IS_REQUIRED_FIELD}
                              </div>
                            )}
                          </td>
                          <td>
                            <select
                              className="form-control"
                              name="priority"
                              value={updateValue.priority}
                              onChange={onChange}
                            >
                              <option value={Label.LOW_VALUE}>
                                {Label.LOW}
                              </option>
                              <option value={Label.MEDIUM_VALUE}>
                                {Label.MEDIUM}
                              </option>
                              <option value={Label.HIGH_VALUE}>
                                {Label.HIGH}
                              </option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              name="status"
                              value={updateValue.status}
                              onChange={onChange}
                            >
                              <option value={Label.OPEN_VALUE}>
                                {Label.OPEN}
                              </option>
                              <option value={Label.PENDING_VALUE}>
                                {Label.PENDING}
                              </option>
                              <option value={Label.COMPLETED_VALUE}>
                                {Label.COMPLETED}
                              </option>
                            </select>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{value.task}</td>
                          <td className={`${value.txtCss}`}>
                            {value.priorityValue}
                          </td>
                          <td>{value.statusValue}</td>
                        </>
                      )}
                      <td>{value.timestamp}</td>
                      {value.editMode ? (
                        <>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={onCancel}
                            >
                              {Label.BUTTON_CANCEL}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={(e) => onUpdate(e, value)}
                            >
                              {Label.BUTTON_UPDATE}
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={(e) => onEdit(e, index)}
                            >
                              {Label.BUTTON_EDIT}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={(e) => onDeleteClick(e, value)}
                            >
                              {Label.BUTTON_DELETE}
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
                {taskList && taskList.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      <h2 className="text-secondary text-center">
                        {Label.NO_DATA_FOUND}
                      </h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        showModal={viewModal}
        heading={Label.ARE_YOU_SURE}
        headingClassOverride={'text-danger'}
        content={Label.DO_YOU_WANT_TO_DELETE_THIS_RECORD}
        buttonFunc={onDelete}
        buttonText={Label.BUTTON_DELETE}
        buttonClassOverride={'btn-danger'}
        button2Text={Label.BUTTON_CANCEL}
        button2Func={closeModal}
      />
    </>
  );
};

ManageTasks.propTypes = {
  loading: PropTypes.bool.isRequired,
  allTasks: PropTypes.array.isRequired,
  deleteTaskFn: PropTypes.func.isRequired,
  updateTaskFn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loading, allTasks } = state;

  return {
    loading,
    allTasks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTaskFn: (id) => {
    dispatch(deleteTask(id));
  },
  updateTaskFn: (id, payload) => {
    dispatch(updateTask(id, payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);
