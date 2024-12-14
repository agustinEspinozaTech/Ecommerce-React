import React from 'react';

function SelectField({ id, label, value, onChange, options, error }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <select id={id} name={id} value={value} onChange={onChange}>
        <option value="">Seleccioná una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default SelectField;
