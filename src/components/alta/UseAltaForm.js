import { useState } from 'react';

export default function useAltaForm() {
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [productos, setProductos] = useState([]);

  const [precio, setPrecio] = useState('');
  const [precioError, setPrecioError] = useState('');

  const [stock, setStock] = useState('');
  const [stockError, setStockError] = useState('');

  const [marca, setMarca] = useState('');
  const [marcaError, setMarcaError] = useState('');

  const [categoria, setCategoria] = useState('');
  const [categoriaError, setCategoriaError] = useState('');

  const [descCorta, setDescCorta] = useState('');
  const [descCortaError, setDescCortaError] = useState('');

  const [descLarga, setDescLarga] = useState('');
  const [descLargaError, setDescLargaError] = useState('');

  const [envio, setEnvio] = useState(false);

  const [edadDesde, setEdadDesde] = useState('');
  const [edadDesdeError, setEdadDesdeError] = useState('');

  const [edadHasta, setEdadHasta] = useState('');
  const [edadHastaError, setEdadHastaError] = useState('');

  const [foto, setFoto] = useState('');
  const [fotoError, setFotoError] = useState('');

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return {
    productos, setProductos, nombre, setNombre, nombreError, setNombreError,
    precio, setPrecio, precioError, setPrecioError,
    stock, setStock, stockError, setStockError,
    marca, setMarca, marcaError, setMarcaError,
    categoria, setCategoria, categoriaError, setCategoriaError,
    descCorta, setDescCorta, descCortaError, setDescCortaError,
    descLarga, setDescLarga, descLargaError, setDescLargaError,
    envio, setEnvio,
    edadDesde, setEdadDesde, edadDesdeError, setEdadDesdeError,
    edadHasta, setEdadHasta, edadHastaError, setEdadHastaError,
    foto, setFoto, fotoError, setFotoError,
    apiError, setApiError, isLoading, setIsLoading,
  };
}
