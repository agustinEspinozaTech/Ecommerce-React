import { useState, useEffect } from "react";

const useFetchAnuncios = (servicioProductos, nodisponibleImg) => {
    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        const fetchAnuncios = async () => {
            try {
                const data = await servicioProductos.getAll();
                const primerosProductos = data.slice(0, 5);
                setAnuncios([
                    { texto: `Descuento especial en ${primerosProductos[0]?.nombre || "calzados"}.`, imagen: primerosProductos[0]?.foto || nodisponibleImg },
                    { texto: `Envío gratis en compras mayores a $50.000,00. Descubre ${primerosProductos[1]?.nombre || "nuestros productos"}.`, imagen: primerosProductos[1]?.foto || nodisponibleImg },
                    { texto: `Hasta 12 cuotas sin interés en toda la colección de ${primerosProductos[2]?.nombre || "ropa"}.`, imagen: primerosProductos[2]?.foto || nodisponibleImg },
                    { texto: `Rebajas imperdibles: 30% de descuento en ${primerosProductos[3]?.nombre || "electrodomésticos seleccionados"}.`, imagen: primerosProductos[3]?.foto || nodisponibleImg },
                    { texto: `Compra hoy y paga en 6 cuotas sin interés en ${primerosProductos[4]?.nombre || "juguetes"}.`, imagen: primerosProductos[4]?.foto || nodisponibleImg },
                ]);
            } catch (error) {
                console.error("Error al cargar los anuncios:", error);
            }
        };

        fetchAnuncios();
    }, [servicioProductos, nodisponibleImg]);

    return anuncios;
};

export default useFetchAnuncios;
