import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/mensajeExitoso.css';

function MensajeExito({ mensaje, visible }) {
    return (
      <div className={`mensaje-popup ${visible ? 'visible' : ''}`}>
        {mensaje}
      </div>
    );
  }
  
  MensajeExito.propTypes = {
    mensaje: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  };
  
  export default MensajeExito;