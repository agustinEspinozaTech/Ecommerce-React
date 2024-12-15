import React from 'react';
import PropTypes from 'prop-types';
import '../styles/modalInformativo.css'; 
import tool from "../assets/tool.png";

function ModalInformativo({ visible, onClose }) {
  if (!visible) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'infoModal') {
      onClose();
    }
  };

  return (
    <div id="infoModal" className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>¡Funcionalidad en construcción!</h2>
        <img id="tool" src={tool} alt="Sitio en desarrollo" />
        <p>La opción seleccionada se encuentra en desarrollo, por favor intentá más tarde.</p>
      </div>
    </div>
  );
}

ModalInformativo.propTypes = {
  visible: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
};

export default ModalInformativo;
