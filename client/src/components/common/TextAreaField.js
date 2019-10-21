import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaField = ({
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
      <label>
        <b>{label}</b>
      </label>
      <textarea
        type={type}
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

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string
};

TextAreaField.defaultProps = {
  error: ''
};

export default TextAreaField;
