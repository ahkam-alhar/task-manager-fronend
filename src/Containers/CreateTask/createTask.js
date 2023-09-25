import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTask, setLoadingStatus } from '../../actions/task-actions';
import * as Label from '../../Constants/labels';
import React from 'react';

const CreateTask = ({ loading, saveTaskFn }) => {
  const [formData, setFormData] = useState({
    task: '',
    priority: Label.MEDIUM_VALUE,
  });
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingStatus(false));
  });

  /**
   * handleChange - Event handler for input and dropdown changes.
   * Description: Handles user input changes and updates the component's state accordingly.
   * @param {Event} event - The input change event.
   */
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // This is removing the error label of the task input field
    if (e.target.name === 'task') {
      setShowErrorMsg(false);
    }
  };

  /**
   * handleSubmit - Event handler for form submissions.
   * Description: Triggers form submission, performs necessary actions, and prevents default behavior.
   * @param {Event} event - The form submission event.
   */
  const onSubmit = (e) => {
    e.preventDefault();

    // validate the task input field is empty or not
    if (formData.task.length <= 0) {
      setShowErrorMsg(true);
    } else {
      // submit the form payload to the back end via action
      saveTaskFn(formData);

      setFormData({
        task: '',
        priority: Label.MEDIUM_VALUE,
      });
    }
  };

  /**
   * handleCancel - Event handler for cancellation actions.
   * Description: Handles user cancel actions, resets the component or performs relevant actions.
   * @param {Event} event - The cancel event (e.g., button click).
   */
  const onCancel = (e) => {
    e.preventDefault();

    // reset the field as default
    setFormData({
      task: '',
      priority: Label.MEDIUM_VALUE,
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="main-container viewpoint-height">
        <div>
          <form>
            <div className="form-group my-3">
              <label>{Label.TASK}</label>
              <input
                type="text"
                className="form-control"
                placeholder={Label.ENTER_TASK_NAME}
                name="task"
                maxLength={254}
                value={formData.task}
                onChange={onChange}
                required
              />
              {showErrorMsg && (
                <div className="text-danger">
                  {Label.THIS_IS_REQUIRED_FIELD}
                </div>
              )}
            </div>
            <div className="form-group my-3">
              <label>{Label.PRIORITY}</label>
              <select
                className="form-control"
                name="priority"
                value={formData.priority}
                onChange={onChange}
              >
                <option value={Label.LOW_VALUE}>{Label.LOW}</option>
                <option value={Label.MEDIUM_VALUE}>{Label.MEDIUM}</option>
                <option value={Label.HIGH_VALUE}>{Label.HIGH}</option>
              </select>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                {Label.BUTTON_SUBMIT}
              </button>
              <button
                type="reset"
                className="btn btn-outline-danger mx-2"
                onClick={onCancel}
              >
                {Label.BUTTON_RESET}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

CreateTask.propTypes = {
  loading: PropTypes.bool.isRequired,
  saveTaskFn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loading } = state;

  return {
    loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveTaskFn: (data) => {
    dispatch(saveTask(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
