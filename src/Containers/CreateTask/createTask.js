import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTask, setLoadingStatus } from '../../actions/task-actions';
import * as Label from '../../Constants/labels';

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'task') {
      setShowErrorMsg(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.task.length <= 0) {
      setShowErrorMsg(true);
    } else {
      saveTaskFn(formData);

      setFormData({
        task: '',
        priority: Label.MEDIUM_VALUE,
      });
    }
  };

  const onCancel = (e) => {
    e.preventDefault();

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
              <label for="inputState">{Label.PRIORITY}</label>
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
