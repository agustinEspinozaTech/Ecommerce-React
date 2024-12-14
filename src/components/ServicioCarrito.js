import axios from "axios"

const url = 'https://674d057354e1fca9290e174c.mockapi.io/pedidos/'


const enviar = async pedido => (await axios.post(url, pedido)).data

const servicioCarrito = {
    enviar
}

export default servicioCarrito