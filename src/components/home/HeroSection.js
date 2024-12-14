import React, { useState, useEffect } from "react";
import nodisponibleImg from "../../assets/nodisponible.png";

const HeroSection = ({ anuncios }) => {
    const [indiceActual, setIndiceActual] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndiceActual((prev) => (prev + 1) % anuncios.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [anuncios.length]);

    if (anuncios.length === 0) return null;

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h2>{anuncios[indiceActual].texto}</h2>
                <img
                    src={anuncios[indiceActual].imagen}
                    alt="Anuncio"
                    onError={(e) => (e.target.src = nodisponibleImg)}
                />
                <button className="cta-button">Comprar ahora</button>
            </div>
        </section>
    );
};

export default HeroSection;
