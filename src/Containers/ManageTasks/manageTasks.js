import { connect, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import Loader from "../../Components/Loader";
import { useEffect, useState } from "react";
import * as Label from '../../Constants/labels';
import { deleteTask, getAllTask, updateTask } from "../../actions/task-actions";
import ReactModal from "react-modal";

const ManageTasks = ({ loading, allTasks, deleteTaskFn, updateTaskFn }) => {
    const [taskList, setTaskList] = useState([]);
    const [updateValue, setUpdateValue] = useState({});
    const [viewModal, setViewModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (allTasks === null)
            dispatch(getAllTask());
    });

    // useEffect(()=> {
    //     console.log(window.innerHeight);
    // }, []);

    useEffect(() => {
        if (allTasks !== null) {
            const sortedTasks = allTasks
                .sort((a,b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
                .map((value) => {
                    if (value.priority === parseInt(Label.LOW_VALUE)) {
                        value.priorityValue = Label.LOW;
                        value.txtCss = "text-secondary";
                    } else if (value.priority === parseInt(Label.MEDIUM_VALUE)) {
                        value.priorityValue = Label.MEDIUM;
                        value.txtCss = "text-warning";
                    } else if (value.priority === parseInt(Label.HIGH_VALUE)) {
                        value.priorityValue = Label.HIGH;
                        value.txtCss = "text-danger";
                    }

                    if (value.status === parseInt(Label.OPEN_VALUE))
                        value.statusValue = Label.OPEN;
                    else if (value.status === parseInt(Label.PENDING_VALUE))
                        value.statusValue = Label.PENDING;
                    else if (value.status === parseInt(Label.COMPLETED_VALUE))
                        value.statusValue = Label.COMPLETED;

                    value.timestamp = new Date(Date.parse(value.timestamp)).toISOString().slice(0,10);
                    value.editMode = false;

                    return value
                });

            setTaskList(sortedTasks);
        }
    }, [allTasks]);

    const onEdit = (e, index) => {
        e.preventDefault();

        const tasks = [...taskList];
        tasks.map((value) => value.editMode = false);
        tasks[index].editMode = true;
        setUpdateValue({
            task: tasks[index].task,
            priority: tasks[index].priority,
            status: tasks[index].status
        })
        setTaskList(tasks);
    }

    const onChange = (e) => {
        setUpdateValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onCancel = (e) => {
        e.preventDefault();

        const tasks = [...taskList];
        tasks.map((value) => value.editMode = false);
        setUpdateValue({})
        setTaskList(tasks);
    }

    const onDeleteClick = (e, value) => {
        e.preventDefault();

        setDeleteId(value.id);
        setViewModal(true);
    }

    const closeModal = () => {

        setViewModal(false);
    }

    const onDelete = (e) => {
        e.preventDefault();

        setViewModal(false);
        deleteTaskFn(deleteId);
    }

    const onUpdate = (e, value) => {
        e.preventDefault();

        if (updateValue.task.length !== 0)
            updateTaskFn(value.id, updateValue);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };
      

    return (
        <>
            {loading && <Loader/>}
            <div className="main-container viewpoint-height">
                <h2>{Label.MANAGE_TASKS}</h2>
                <div className={`card custom-height`}>
                    <div className="card-body overflow-auto">
                        <table class="table table-hover">
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
                            {taskList.map((value,index) => {
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
                                                        onChange={onChange}/>
                                                        {updateValue.task.length === 0 && <div className="text-danger">{Label.THIS_IS_REQUIRED_FIELD}</div>}
                                                </td>
                                                <td>
                                                    <select className="form-control" name="priority" value={updateValue.priority} onChange={onChange}>
                                                        <option value={Label.LOW_VALUE}>{Label.LOW}</option>
                                                        <option value={Label.MEDIUM_VALUE}>{Label.MEDIUM}</option>
                                                        <option value={Label.HIGH_VALUE}>{Label.HIGH}</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-control" name="status" value={updateValue.status} onChange={onChange}>
                                                        <option value={Label.OPEN_VALUE}>{Label.OPEN}</option>
                                                        <option value={Label.PENDING_VALUE}>{Label.PENDING}</option>
                                                        <option value={Label.COMPLETED_VALUE}>{Label.COMPLETED}</option>
                                                    </select>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{value.task}</td>
                                                <td className={`${value.txtCss}`}>{value.priorityValue}</td>
                                                <td>{value.statusValue}</td>
                                            </>
                                        )}
                                        <td>{value.timestamp}</td>
                                        {value.editMode ? (
                                            <>
                                                <td><button className="btn btn-outline-danger btn-sm" onClick={onCancel}>{Label.BUTTON_CANCEL}</button></td>
                                                <td><button className="btn btn-outline-success btn-sm" onClick={(e) => onUpdate(e, value)}>{Label.BUTTON_UPDATE}</button></td>
                                            </>
                                        ) : (
                                            <>
                                                <td><button className="btn btn-outline-primary btn-sm" onClick={(e) => onEdit(e, index)}>{Label.BUTTON_EDIT}</button></td>
                                                <td><button className="btn btn-outline-danger btn-sm" onClick={(e) => onDeleteClick(e, value)}>{Label.BUTTON_DELETE}</button></td>
                                            </>
                                        ) }
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactModal
                isOpen={viewModal}
                contentLabel="example modal"
                style={customStyles}
                onRequestClose={closeModal}
            >
                <h3 className="text-danger">{Label.ARE_YOU_SURE}</h3>
                <p>{Label.DO_YOU_WANT_TO_DELETE_THIS_RECORD}</p>
                <button className="btn btn-outline-secondary" onClick={closeModal}>{Label.BUTTON_CANCEL}</button>
                <button className="btn btn-danger mx-2" onClick={onDelete}>{Label.BUTTON_DELETE}</button>
            </ReactModal>
        </>
    )
}

ManageTasks.propTypes = {
    loading: PropTypes.bool.isRequired,
    allTasks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    const { loading, allTasks } = state;
  
    return {
      loading,
      allTasks
    };
};

const mapDispatchToProps = (dispatch) => ({
    deleteTaskFn: (id) => {
      dispatch(deleteTask(id));
    },
    updateTaskFn: (id, payload) => {
        dispatch(updateTask(id,payload));
      }
});

export default connect(mapStateToProps, mapDispatchToProps) (ManageTasks);