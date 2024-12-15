import React, { useState, useEffect } from "react";
import "../styles/home.css";
import "../styles/barraCarga.css";
import servicioProductos from "../components/servicios/Productos";
import ModalProducto from "../components/home/ModalProducto";
import ProductCard from "../components/home/ProductCard";
import HeroSection from "../components/home/HeroSection";
import LoadingSpinner from "../components/home/LoadingSpinner";
import useFetchAnuncios from "../components/home/useFetchAnuncios";
import MensajeExito from '../components/MensajeExitoso';
import nodisponibleImg from "../assets/nodisponible.png";

const Home = () => {
    // Estados
    const [modalData, setModalData] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensajeVisible, setMensajeVisible] = useState(false); 
    const [mensaje, setMensaje] = useState(""); 
   

    // Anuncios dinámicos
    const anuncios = useFetchAnuncios(servicioProductos, nodisponibleImg); 


    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await servicioProductos.getAll();
                setProductos(data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);


    // Función para mostrar el modal
    const mostrarModal = (producto) => {
        setModalData(producto);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalData(null);
    };

    const mostrarMensaje = (mensaje) => {
        setMensaje(mensaje);
        setMensajeVisible(true);
        setTimeout(() => setMensajeVisible(false), 3000); // Desaparece después de 3 segundos
    };

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        try {
            const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
            const productoExistente = carritoActual.find((item) => item.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad += 1;
                productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
            } else {
                carritoActual.push({
                    ...producto,
                    cantidad: 1,
                    subtotal: producto.precio,
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carritoActual));
            cerrarModal();
            mostrarMensaje("Producto agregado al carrito exitosamente");
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
        }
    };

    if (loading) {
        return <LoadingSpinner mensaje="Cargando productos..." />; 
    }
    

    return (
        <main className="home">
             <MensajeExito mensaje={mensaje} visible={mensajeVisible} /> 
            <HeroSection anuncios={anuncios} /> 


            <section className="products-section">
                <h3>¡Productos destacados!</h3>
                <div className="product-grid">
                    {productos.map((producto) => (
                        <ProductCard 
                            key={producto.id}
                            producto={producto}
                            mostrarModal={mostrarModal}
                        />
                    ))}

                </div>
            </section>

            <ModalProducto
                modalData={modalData}
                cerrarModal={cerrarModal}
                agregarAlCarrito={agregarAlCarrito}
            />
        </main>
    );
};

export default Home;
