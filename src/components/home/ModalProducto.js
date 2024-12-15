import React, { useState, useEffect } from "react";
import nodisponibleImg from "../../assets/nodisponible.png";

const ModalProducto = ({ modalData, cerrarModal, agregarAlCarrito }) => {
    const [stock, setStock] = useState(0);

    useEffect(() => {
        if (modalData) {
            setStock(Number(modalData.stock));
        }
    }, [modalData]);

    if (!modalData) return null;

    const stockDisponible = stock > 0;

    const handleAgregarAlCarrito = () => {
        if (stockDisponible) {
            agregarAlCarrito(modalData);
            setStock((prevStock) => prevStock - 1);
            modalData.stock = stock - 1; // Sincroniza con modalData para reflejar cambios
        }
    };

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
                    <strong>Stock:</strong> {stock}
                </p>
                <p>
                    <strong>Precio:</strong> {modalData.precio.toLocaleString('es-ES')}
                </p>
                <p>
                    <strong>Marca:</strong> {modalData.marca}
                </p>
                <p>
                    <strong>Categoría:</strong> {modalData.categoria}
                </p>
                <button
                    className={`carrito ${!stockDisponible ? "disabled" : ""}`}
                    style={
                        { opacity: stockDisponible ? "1" : "0.6" }
                    }
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAgregarAlCarrito();
                    }}
                    disabled={!stockDisponible}

                >
                    {stockDisponible ? "Agregar al carrito" : "Sin stock"}
                </button>
            </div>
        </div>
    );
};

export default ModalProducto;
