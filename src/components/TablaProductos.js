import React from 'react';
import '../styles/tablaProductos.css';

function TablaProductos({ productos }) {
  return (
    <section className="tabla-section">
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Detalles</th>
            <th>Foto</th>
            <th>Envío</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td>{producto.marca}</td>
              <td>{producto.categoria}</td>
              <td>{producto.descLarga}</td>
              <td>
                <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
              </td>
              <td>{producto.envio}</td>
              <td>
                <button className="btn-accion">Editar</button>
                <button className="btn-accion">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TablaProductos;
