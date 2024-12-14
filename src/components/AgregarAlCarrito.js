import React from "react";
import { useNavigate } from "react-router-dom";

const AgregarAlCarrito = ({ producto }) => {
    const navigate = useNavigate();

    const manejarAgregarAlCarrito = () => {
        try {
            // Obtener el carrito actual desde localStorage
            const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

            // Buscar si el producto ya está en el carrito
            const productoExistente = carritoActual.find((item) => item.id === producto.id);

            if (productoExistente) {
                //incrementar la cantidad
                productoExistente.cantidad += 1;
                productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
            } else {
                //agregar el producto con cantidad inicial
                carritoActual.push({
                    ...producto,
                    cantidad: 1,
                    subtotal: producto.precio,
                });
            }

            // Guardar el carrito actualizado 
            localStorage.setItem("carrito", JSON.stringify(carritoActual));

            // Redirigir a la pantalla del carrito
            navigate("/carrito");
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
        }
    };

    return (
        <button className="carrito" onClick={manejarAgregarAlCarrito}>
            Agregar al carrito
        </button>
    );
};

export default AgregarAlCarrito;
