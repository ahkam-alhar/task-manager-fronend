import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const NavLink = (props) => {
  const { classOverride, navigatePath, label, icon } = props;

  return (
    <>
      <Link className={classOverride} to={navigatePath}>
        {icon ? <i className={icon} /> : null}
        {label}
      </Link>
    </>
  );
};

NavLink.propTypes = {
  classOverride: PropTypes.string,
  navigatePath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

NavLink.defaultProps = {
  classOverride: 'nav-link',
  icon: '',
};

export default NavLink;
