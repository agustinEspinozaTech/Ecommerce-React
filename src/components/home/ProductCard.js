import React, { useState } from "react";
import ModalInformativo from '../ModalInformativo';
import nodisponibleImg from "../../assets/nodisponible.png";

const ProductCard = ({ producto, mostrarModal }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const mostrarModalInterno = () => setModalVisible(true);
    const cerrarModal = () => setModalVisible(false);

    return (
        <div className="product-card">
            <img
                src={producto.foto || nodisponibleImg}
                alt={producto.nombre}
                onError={(e) => (e.target.src = nodisponibleImg)}
            />
            <h4>{producto.nombre}</h4>
            <p>{producto.marca}</p>
            <p>${producto.precio.toLocaleString('es-ES')}</p>
            <button
                className="buy-button"
                onClick={() => mostrarModal(producto)}
            >
                Ver detalles
            </button>
            <button
                className="cta-button"
                onClick={mostrarModalInterno}
            >
                Comprar
            </button>
            <ModalInformativo visible={modalVisible} onClose={cerrarModal} />
        </div>
    );
};

export default ProductCard;
