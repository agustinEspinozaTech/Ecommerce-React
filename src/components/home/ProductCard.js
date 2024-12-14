import React from "react";
import nodisponibleImg from "../../assets/nodisponible.png";

const ProductCard = ({ producto, mostrarModal }) => {
    return (
        <div className="product-card">
            <img
                src={producto.foto || nodisponibleImg}
                alt={producto.nombre}
                onError={(e) => (e.target.src = nodisponibleImg)}
            />
            <h4>{producto.nombre}</h4>
            <p>{producto.marca}</p>
            <p>${producto.precio}</p>
            <button
                className="buy-button"
                onClick={() => mostrarModal(producto)}
            >
                Ver detalles
            </button>
            <button className="cta-button">Comprar</button>
        </div>
    );
};

export default ProductCard;
