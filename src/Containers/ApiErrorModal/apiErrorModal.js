import React from 'react';
import Modal from '../../Components/Modal';
import { connect } from 'react-redux';
import * as Label from '../../Constants/labels';
import PropTypes from 'prop-types';
import { handleApiFailureModal } from '../../actions/task-actions';

const ApiErrorModal = ({
  showApiFailureModal,
  handleApiFailureModalFn,
  apiFailure,
}) => {
  const onOkClick = () => {
    handleApiFailureModalFn(false);
  };

  return (
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
  );
};

ApiErrorModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ApiErrorModal);
