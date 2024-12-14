import React, { useState, useEffect } from "react";
import "../styles/carrito.css";
import nodisponibleImg from "../assets/nodisponible.png";
import servicioCarrito from "../components/ServicioCarrito";

const Carrito = () => {
    const [carritoProductos, setCarritoProductos] = useState([]);

    // Cargar productos
    useEffect(() => {
        const cargarCarrito = () => {
            try {
                const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
                setCarritoProductos(carritoGuardado);
                const carritoConSubtotales = carritoGuardado.map((producto) => ({
                    ...producto,
                    subtotal: producto.cantidad * producto.precio,
                }));
                setCarritoProductos(carritoConSubtotales);
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
            }
        };

        cargarCarrito();
    }, []);

    // Guardar cambios en el carrito 
    const actualizarCarrito = (nuevoCarrito) => {
        setCarritoProductos(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };

    // Incrementar la cantidad de un producto
    const incrementarCantidad = (index) => {
        const nuevoCarrito = [...carritoProductos];
        if (nuevoCarrito[index].cantidad < nuevoCarrito[index].stock) { // "tenes que agregar esto"
            nuevoCarrito[index].cantidad += 1;
            nuevoCarrito[index].subtotal = nuevoCarrito[index].cantidad * nuevoCarrito[index].precio;
            actualizarCarrito(nuevoCarrito);
        }
    };

    // Decrementar la cantidad de un producto
    const decrementarCantidad = (index) => {
        const nuevoCarrito = [...carritoProductos];
        if (nuevoCarrito[index].cantidad > 1) {
            nuevoCarrito[index].cantidad -= 1;
            nuevoCarrito[index].subtotal = nuevoCarrito[index].cantidad * nuevoCarrito[index].precio;
            actualizarCarrito(nuevoCarrito);
        }
    };

    // Editar directamente la cantidad
    const editarCantidad = (index, cantidad) => {
        const nuevoCarrito = [...carritoProductos];
        const nuevaCantidad = Math.max(1, parseInt(cantidad, 10) || 1);
        nuevoCarrito[index].cantidad = nuevaCantidad;
        nuevoCarrito[index].subtotal = nuevaCantidad * nuevoCarrito[index].precio;
        actualizarCarrito(nuevoCarrito);
    };

    // Eliminar un producto del carrito
    const eliminarProducto = (index) => {
        const nuevoCarrito = carritoProductos.filter((_, i) => i !== index);
        actualizarCarrito(nuevoCarrito);
    };

    // Vaciar todo el carrito
    const vaciarCarrito = () => {
        setCarritoProductos([]);
        localStorage.removeItem("carrito");
    };

    // Realizar la compra
    const realizarCompra = async () => {
        try {
            const pedido = { productos: carritoProductos, fecha: new Date().toISOString() };
            const respuesta = await servicioCarrito.enviar(pedido);
            console.log("Compra realizada:", respuesta);
            alert("Compra realizada con éxito.");
            vaciarCarrito();
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            alert("Ocurrió un error al realizar la compra.");
        }
    };

    return (
        <main className="main-carrito">
            <section className="carrito-products-section">
                <h3>Carrito de Compra</h3>
                {carritoProductos.length === 0 ? (
                    <p>Por el momento no se han agregado productos al carrito de compra.</p>
                ) : (
                    <>
                        <div className="carrito-product-grid">
                            {carritoProductos.map((producto, index) => (
                                <div key={index} className="carrito-product-card">
                                    <img
                                        src={producto.foto}
                                        alt={producto.nombre}
                                        onError={(e) => (e.target.src = nodisponibleImg ? nodisponibleImg : producto.marca)}
                                    />
                                    <h4>{producto.nombre}</h4>
                                    <p>Precio: ${producto.precio}</p>
                                    <p>Cantidad:</p>
                                    <div className="cantidad-controles">
                                        <button onClick={() => decrementarCantidad(index)}
                                            disabled={producto.cantidad === 1}
                                            style={{
                                                opacity: producto.cantidad === 1 ? 0.5 : 1,
                                                cursor: producto.cantidad === 1 ? 'not-allowed' : 'pointer',
                                            }}
                                        >-</button>
                                        <input
                                            type="number"
                                            value={producto.cantidad}
                                            onChange={(e) => editarCantidad(index, e.target.value)}
                                        />
                                        <button onClick={() => incrementarCantidad(index)}
                                            disabled={producto.cantidad >= producto.stock}
                                            style={{
                                                opacity: producto.cantidad >= producto.stock ? 0.5 : 1, 
                                                cursor: producto.cantidad >= producto.stock ? 'not-allowed' : 'pointer', 
                                            }}
                                        >+</button>
                                    </div>
                                    <p>
                                        Subtotal: $
                                        {typeof producto.subtotal === "number"
                                            ? producto.subtotal.toFixed(2)
                                            : "0.00"}
                                    </p>
                                    <button onClick={() => eliminarProducto(index)} className="delete-button">
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={vaciarCarrito} className="clear-button">
                            Vaciar Carrito
                        </button>
                        <button onClick={realizarCompra} className="cta-button">
                            Realizar Compra
                        </button>
                    </>
                )}
            </section>
        </main>
    );
};

export default Carrito;
