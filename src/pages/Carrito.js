import React, { useState, useEffect } from "react";
import "../styles/carrito.css";
import nodisponibleImg from "../assets/nodisponible.png";
import MensajeExito from '../components/MensajeExitoso';
import ModalConfirmacion from '../components/ModalConfirmacion';
import ModalInformativo from '../components/ModalInformativo';


const Carrito = () => {
    const [carritoProductos, setCarritoProductos] = useState([]);
    const [mensajeVisible, setMensajeVisible] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInformativoVisible, setModalInformativoVisible] = useState(false);


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
        if (nuevoCarrito[index].cantidad < nuevoCarrito[index].stock) { 
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

    const mostrarMensaje = (mensaje) => {
        setMensaje(mensaje);
        setMensajeVisible(true);
        setTimeout(() => setMensajeVisible(false), 3000);
    };

    // Eliminar un producto del carrito
    const eliminarProducto = (index) => {
        const nuevoCarrito = carritoProductos.filter((_, i) => i !== index);
        actualizarCarrito(nuevoCarrito);
        mostrarMensaje("Se ha eliminado el producto del carrito de compra.");
    };

    // Vaciar todo el carrito
    const vaciarCarrito = () => {
        setCarritoProductos([]);
        localStorage.removeItem("carrito");
        cerrarModal();
        mostrarMensaje("Se ha vaciado el carrito de compra.");
    };

    // Realizar la compra
    const abrirModalInformativo = () => {
        setModalInformativoVisible(true);
    };

    const cerrarModalInformativo = () => {
        setModalInformativoVisible(false);
    };

    const abrirModalVaciarCarrito = () => {
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };


    return (
        <main className="main-carrito">
            <MensajeExito mensaje={mensaje} visible={mensajeVisible} />
            <ModalConfirmacion
                visible={modalVisible}
                titulo="Confirmar"
                mensaje="¿Estás seguro que deseas vaciar el carrito de compra?"
                onConfirmar={vaciarCarrito}
                onCancelar={cerrarModal}
            />
             <ModalInformativo
                visible={modalInformativoVisible}
                onClose={cerrarModalInformativo}
            />
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
                                    <p>Precio: ${producto.precio.toLocaleString('es-ES')}</p>
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
                                            ? producto.subtotal.toLocaleString('es-ES')
                                            : "0.00"}
                                    </p>
                                    <button onClick={() => eliminarProducto(index)} className="delete-button">
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={abrirModalVaciarCarrito} className="clear-button">
                            Vaciar Carrito
                        </button>
                        <button onClick={abrirModalInformativo} className="cta-button">
                            Realizar Compra
                        </button>
                    </>
                )}
            </section>
        </main>
    );
};

export default Carrito;
