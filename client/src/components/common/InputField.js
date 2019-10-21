import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputField = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  type
}) => {
  return (
    <div>
      <label htmlFor={name}>
        <b>{label}</b>
      </label>
      <input
        type={type}
        id={name}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

InputField.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};

InputField.defaultProps = {
  error: '',
  type: 'text'
};

export default InputField;
