import React from "react";
import nodisponibleImg from "../../assets/nodisponible.png";

const ModalProducto = ({ modalData, cerrarModal, agregarAlCarrito }) => {
    if (!modalData) return null;

    return (
        <div className="modal" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={cerrarModal}>
                    &times;
                </span>
                <img
                    src={modalData.foto || nodisponibleImg}
                    alt={modalData.nombre}
                    onError={(e) => (e.target.src = nodisponibleImg)}
                />
                <h2>{modalData.nombre}</h2>
                <p>{modalData.descCorta}</p>
                <p>
                    <strong>Stock:</strong> {modalData.stock}
                </p>
                <p>
                    <strong>Precio:</strong> {modalData.precio}
                </p>
                <p>
                    <strong>Marca:</strong> {modalData.marca}
                </p>
                <p>
                    <strong>Categoria:</strong> {modalData.categoria}
                </p>
                <button
                    className="carrito"
                    onClick={(e) => {
                        e.stopPropagation(); // Evita cerrar el modal al hacer click
                        agregarAlCarrito(modalData);
                    }}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ModalProducto;
