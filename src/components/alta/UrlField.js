import React from 'react';

function UrlField({ id, label, value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type="url"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        accept="image/*"
        autoComplete="off"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default UrlField;
