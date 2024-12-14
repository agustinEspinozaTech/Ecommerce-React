import axios from "axios"

const url = 'https://674d057354e1fca9290e174c.mockapi.io/productos/'
const getAll = async () => (await axios.get(url)).data
const guardar = async prod => (await axios.post(url, prod)).data
const actualizar = async (id, prod) => (await axios.put(url + id, prod)).data
const eliminar = async id => (await axios.delete(url + id)).data
const productos = await getAll();
console.log('ver productos', productos);

const servicioProductos = {
    getAll,
    guardar,
    actualizar,
    eliminar
}

export default servicioProductos