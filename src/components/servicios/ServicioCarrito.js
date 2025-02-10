import axios from "axios";


const url = 'http://localhost:3000/api/carrito/';

const enviar = async (pedido) => {

  try {
    const response = await axios.post(url, pedido);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    throw error;
  }
};

const servicioCarrito = {
  enviar,
};

export default servicioCarrito;
