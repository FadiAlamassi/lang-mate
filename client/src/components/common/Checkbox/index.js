import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Checkbox = ({ id, name, onClick, checkName, checked }) => (
  <div className="checkbox__home">
    <label htmlFor={id} className="checkbox_label">
      <input
        id={id}
        type="checkbox"
        value={name}
        name={checkName}
        checked={checked}
        onChange={onClick}
        className="checkbox"
      />
      <div className="check-value">{name}</div>
    </label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checkName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};
Checkbox.defaultProps = {
  id: 1,
};

export default Checkbox;
