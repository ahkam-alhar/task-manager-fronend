import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center text-center loading">
      <div className="align-self-center text-secondary">
        <div className="spinner-border" role="status" />
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
