import './navbar.css';
import NavLink from '../../Components/NavLink';
import * as Navigate from '../../Constants/routes';
import * as Label from '../../Constants/labels';
import Modal from '../../Components/Modal';
import { connect } from 'react-redux';
import { handleApiFailureModal } from '../../actions/task-actions';
import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({
  showApiFailureModal,
  handleApiFailureModalFn,
  apiFailure,
}) => {
  const onOkClick = () => {
    handleApiFailureModalFn(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <NavLink
            classOverride={'navbar-brand'}
            label={Label.TASK_MANAGER}
            navigatePath={Navigate.ROOT}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink label={Label.HOME} navigatePath={Navigate.ROOT} />
              </li>
              <li className="nav-item">
                <NavLink
                  label={Label.MANAGE_TASKS}
                  navigatePath={Navigate.TO_MANAGE_TASKS}
                />
              </li>
              <li className="nav-item">
                <NavLink
                  label={Label.COMPLETED_TASK_LIST}
                  navigatePath={Navigate.TO_COMPLETED_TASKS}
                />
              </li>
            </ul>
            <form className="d-flex" role="search">
              <NavLink
                classOverride={'btn btn-outline-primary'}
                label={Label.CREATE_A_TASK}
                navigatePath={Navigate.TO_CREATE_TASK}
                icon={'fa fa-plus'}
              />
            </form>
          </div>
          <Modal
            buttonText={Label.BUTTON_OK}
            buttonFunc={onOkClick}
            buttonClassOverride={'btn-danger'}
            heading={
              apiFailure && apiFailure.status === Label.ERROR_404
                ? apiFailure.status
                : Label.SOMETHING_WENT_WRONG
            }
            headingClassOverride={'text-danger'}
            content={
              apiFailure && apiFailure.status === Label.ERROR_404
                ? apiFailure.message
                : Label.TRY_AGAIN_LATER_OR_CONTACT_ADMIN
            }
            showModal={showApiFailureModal}
            button2Text={Label.BUTTON_CANCEL}
            button2Func={onOkClick}
          />
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  showApiFailureModal: PropTypes.bool.isRequired,
  apiFailure: PropTypes.any,
  handleApiFailureModalFn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { showApiFailureModal, apiFailure } = state;

  return {
    showApiFailureModal,
    apiFailure,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleApiFailureModalFn: (status) => {
    dispatch(handleApiFailureModal(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
