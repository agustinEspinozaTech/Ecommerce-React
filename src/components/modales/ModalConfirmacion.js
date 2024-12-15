import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/modalConfirmacion.css'; 

function ModalConfirmacion({ visible, titulo, mensaje, onConfirmar, onCancelar }) {
  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{titulo}</h2>
        <p>{mensaje}</p>
        <div className="modal-actions">
          <button className="btn-accion" onClick={onConfirmar}>
            Confirmar
          </button>
          <button className="btn-accion" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

ModalConfirmacion.propTypes = {
  visible: PropTypes.bool.isRequired,
  titulo: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
  onConfirmar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default ModalConfirmacion;
