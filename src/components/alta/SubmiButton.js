import React from 'react';

function SubmitButton({ isLoading, label }) {
  return (
    <button type="submit" disabled={isLoading}>
      {isLoading ? 'Guardando...' : label}
    </button>
  );
}

export default SubmitButton;
