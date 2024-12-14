import React from 'react';

function TextAreaField({ id, label, value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      ></textarea>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default TextAreaField;
