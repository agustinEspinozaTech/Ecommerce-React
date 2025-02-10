import axios from "axios";

// Actualiza la URL base para apuntar a tu backend local
const url = 'http://localhost:3000/api/productos/';

// Función para obtener todos los productos
const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

// Función para guardar (crear) un producto
const guardar = async prod => {
  const response = await axios.post(url, prod);
  return response.data;
};

// Función para actualizar un producto dado su ID
const actualizar = async (id, prod) => {
  const response = await axios.put(url + id, prod);
  return response.data;
};

// Función para eliminar un producto dado su ID
const eliminar = async id => {
  const response = await axios.delete(url + id);
  return response.data;
};

const servicioProductos = {
  getAll,
  guardar,
  actualizar,
  eliminar
};


export default servicioProductos;
