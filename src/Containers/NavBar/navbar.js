import './navbar.css';
import NavLink from '../../Components/NavLink';
import * as Navigate from '../../Constants/routes';
import * as Label from '../../Constants/labels';
import React from 'react';

const Navbar = () => {
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
