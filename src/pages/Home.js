import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../styles/barraCarga.css";
import servicioProductos from "../components/Productos";
import ModalProducto from "../components/ModalProducto";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import nodisponibleImg from "../assets/nodisponible.png";

const Home = () => {
    // Estados
    const [modalData, setModalData] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anuncios, setAnuncios] = useState([]);
    const navigate = useNavigate();

    // Anuncios dinámicos
    useEffect(() => {
        const fetchAnuncios = async () => {
            try {
                const data = await servicioProductos.getAll();
                const primerosProductos = data.slice(0, 5);
                setAnuncios(
                    [
                        { texto: `Descuento especial en ${primerosProductos[0]?.nombre || "calzados"}.`, imagen: primerosProductos[0]?.foto || nodisponibleImg },
                        { texto: `Envío gratis en compras mayores a $50.000,00. Descubre ${primerosProductos[1]?.nombre || "nuestros productos"}.`, imagen: primerosProductos[1]?.foto || nodisponibleImg },
                        { texto: `Hasta 12 cuotas sin interés en toda la colección de ${primerosProductos[2]?.nombre || "ropa"}.`, imagen: primerosProductos[2]?.foto || nodisponibleImg },
                        { texto: `Rebajas imperdibles: 30% de descuento en ${primerosProductos[3]?.nombre || "electrodomésticos seleccionados"}.`, imagen: primerosProductos[3]?.foto || nodisponibleImg },
                        { texto: `Compra hoy y paga en 6 cuotas sin interés en ${primerosProductos[4]?.nombre || "juguetes"}.`, imagen: primerosProductos[4]?.foto || nodisponibleImg },
                    ]
                );
            } catch (error) {
                console.error("Error al cargar los anuncios:", error);
            }
        };

        fetchAnuncios();
    }, []);

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
            navigate("/carrito");
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <h1>Cargando productos...</h1>
                <div className="loading-circle"></div>
            </div>
        );
    }

    return (
        <main className="home">
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
