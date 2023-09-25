import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import React from 'react';

const Modal = ({
  showModal,
  heading,
  headingClassOverride,
  content,
  buttonFunc,
  buttonText,
  buttonClassOverride,
  button2Text,
  button2Func,
}) => {
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
    <ReactModal isOpen={showModal} style={customStyles} ariaHideApp={false}>
      <h3 className={`${headingClassOverride}`}>{heading}</h3>
      <p>{content}</p>
      <button className="btn btn-outline-secondary" onClick={button2Func}>
        {button2Text}
      </button>
      <button
        className={`btn ${buttonClassOverride} mx-2`}
        onClick={buttonFunc}
      >
        {buttonText}
      </button>
    </ReactModal>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  headingClassOverride: PropTypes.string,
  content: PropTypes.string,
  buttonFunc: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonClassOverride: PropTypes.string,
  button2Func: PropTypes.func,
  button2Text: PropTypes.string,
};

Modal.defaultProps = {
  content: '',
  headingClassOverride: '',
  buttonClassOverride: 'btn-primary',
  button2Text: '',
  button2Func: () => {},
};

export default Modal;
