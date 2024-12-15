import React, { useEffect, useState } from 'react';
import servicioProductos from '../servicios/Productos';
import MensajeExito from '../modales/MensajeExitoso';
import ModalConfirmacion from '../modales/ModalConfirmacion';
import '../../styles/tablaProductos.css';

function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosObtenidos = await servicioProductos.getAll();
        setProductos(productosObtenidos);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await servicioProductos.eliminar(id);
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      cerrarModal();
      mostrarMensaje('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const mostrarMensaje = (mensaje) => {
    setMensaje(mensaje);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setModalVisible(false);
  };

  return (
    <section className="tabla-section">
      <MensajeExito mensaje={mensaje} visible={mensajeVisible} />
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
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toLocaleString('es-ES')}</td>
                <td>{producto.stock}</td>
                <td>{producto.marca}</td>
                <td>{producto.categoria}</td>
                <td>{producto.descCorta}</td>
                <td>
                  <img
                    src={producto.foto}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                </td>
                <td>{producto.envio? 'Envío sin cargo' : 'Envío con cargo'}</td>
                <td>
                  <button
                    className="btn-accion"
                    onClick={() => abrirModal(producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      <ModalConfirmacion
        visible={modalVisible}
        titulo="Confirmar"
        mensaje={`¿Estás seguro que deseas eliminar el producto "${productoSeleccionado?.nombre}"?`}
        onConfirmar={() => eliminarProducto(productoSeleccionado.id)}
        onCancelar={cerrarModal}
      />
    </section>
  );
}

export default TablaProductos;
