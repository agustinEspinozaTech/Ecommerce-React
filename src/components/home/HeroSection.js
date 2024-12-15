import React, { useState, useEffect } from "react";
import nodisponibleImg from "../../assets/nodisponible.png";
import ModalInformativo from '../ModalInformativo';
const HeroSection = ({ anuncios }) => {
    const [indiceActual, setIndiceActual] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setIndiceActual((prev) => (prev + 1) % anuncios.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [anuncios.length]);

    if (anuncios.length === 0) return null;

    const mostrarModal = () => setModalVisible(true);
    const cerrarModal = () => setModalVisible(false);

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h2>{anuncios[indiceActual].texto}</h2>
                <img
                    src={anuncios[indiceActual].imagen}
                    alt="Anuncio"
                    onError={(e) => (e.target.src = nodisponibleImg)}
                />
                 <button className="cta-button" onClick={mostrarModal}>
                Comprar ahora
            </button>
            </div>
            <ModalInformativo visible={modalVisible} onClose={cerrarModal} />
        </section>
    );
};

export default HeroSection;
