import React from 'react';

function CheckboxField({ id, label, checked, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default CheckboxField;
