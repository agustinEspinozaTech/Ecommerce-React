import React from 'react';

function NumberField({ id, label, value, onChange, error, min, max }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default NumberField;
