import React from 'react';

function InputField({ id, label, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        autoComplete="off"
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default InputField;
