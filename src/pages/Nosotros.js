import React, { useState, useEffect } from "react";
import "../styles/nosotros.css";

const Nosotros = () => {
    const secciones = [
        {
          titulo: "Sobre Nosotros",
          contenido: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic cumque rerum sunt vel iusto, consequatur
            tenetur perspiciatis. Harum vel maxime consequatur aspernatur error hic, dolorem blanditiis,
            veritatis delectus fugiat amet nostrum dolor in cumque beatae tenetur eos velit ut, aperiam ex ab
            nobis laboriosam quisquam. Quos quas molestias minus sunt, illo, placeat perferendis ducimus officia
            veritatis amet est pariatur reprehenderit dolor, autem iste doloremque alias totam omnis! Dolor
            debitis autem alias saepe magni aperiam, unde officia modi cum soluta iusto dolore praesentium
            quibusdam ab, reiciendis deserunt fugiat omnis illo aliquid architecto accusamus quidem? Ad
            explicabo officia ut assumenda sint sit porro maiores dolor illo ea nesciunt non nostrum repellat
            amet, alias ipsa praesentium eos debitis unde! At fugiat quisquam esse temporibus! Repellendus dolor
            architecto reprehenderit quia, deleniti placeat corporis totam magni, deserunt distinctio rerum ad
            ipsa fugit ducimus eius est blanditiis veniam harum voluptatem nostrum animi ut iure!
          `,
        },
        {
          titulo: "Nuestra Historia",
          contenido: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi cupiditate corrupti laborum eligendi
            tempore dolore voluptate corporis vel, accusamus temporibus esse cum, consectetur, dolores a. Error,
            iure esse iusto quas, tempore qui nam unde ut voluptate accusamus quae fuga repellat similique nisi
            neque! Ex aut iure officiis laudantium. Eius, corrupti. Molestias natus facere laboriosam.
            Architecto neque iure assumenda ullam quas ea eligendi laboriosam iste quo, animi molestias amet? Ea
            quibusdam, eos tempore molestiae voluptate nesciunt repellendus dolores animi fugit temporibus
            voluptates perspiciatis dolor facilis doloremque ut fugiat est, accusantium recusandae praesentium
            deleniti voluptatum? Nihil sequi nobis, quia vero placeat possimus sapiente illum iusto commodi nam
            culpa quae blanditiis voluptatum laudantium velit eligendi eveniet. Aspernatur accusamus maxime
            obcaecati sapiente tenetur aliquid harum.
          `,
        },
        {
          titulo: "Propósito",
          contenido: `
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero eaque ex id a ipsam velit repellat
            nulla. Inventore mollitia sint obcaecati eveniet totam est, in aspernatur harum voluptatem ipsa
            sunt, quis omnis corrupti. Perspiciatis eos quae odit aliquid nisi quas. Molestias est veniam culpa!
            Delectus aperiam eos, perferendis ut doloribus cum expedita? Reiciendis exercitationem nemo ut in
            iste beatae voluptate quia doloribus ratione! Sequi earum maiores adipisci sit tempore similique?
            Maiores debitis magnam vel pariatur dolore iste adipisci, nisi fugiat vitae placeat similique nemo
            reiciendis deserunt veniam in rerum ut non numquam! Corrupti fugiat quam, eligendi at repellat omnis
            debitis.
          `,
        },
        {
          titulo: "Valores",
          contenido: `
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit veritatis, magnam excepturi cumque
            similique consequuntur hic quisquam ipsa maiores. Cumque excepturi animi, ratione quia autem
            officiis eum deserunt magni repellendus totam accusamus sequi amet facilis vitae soluta tenetur
            similique quo vero error aspernatur neque. Sit distinctio possimus, deleniti cumque deserunt veniam
            debitis, alias ut minus et quod quibusdam ipsam.
          `,
        },
      ];
      

  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prevIndice) => (prevIndice + 1) % secciones.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [secciones.length]);

  const mostrarSiguienteSeccion = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % secciones.length);
  };

  const mostrarSeccionAnterior = () => {
    setIndiceActual(
      (prevIndice) => (prevIndice - 1 + secciones.length) % secciones.length
    );
  };

  return (
    <main className="nosotros">
      <section id="contenido">
        <div className="seccion activa">
          <h2>{secciones[indiceActual].titulo}</h2>
          <p>{secciones[indiceActual].contenido}</p>
        </div>
      </section>

      <div id="navegacion">
        <button id="previo" onClick={mostrarSeccionAnterior}>
          ⟨ Anterior
        </button>
        <button id="siguiente" onClick={mostrarSiguienteSeccion}>
          Siguiente ⟩
        </button>
      </div>
    </main>
  );
};

export default Nosotros;
