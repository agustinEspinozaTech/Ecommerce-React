import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/formularios.css";
import servicioProductos from '../components/Productos'; 

function Alta() {
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState('');

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


  const navigate = useNavigate();

  // Expresiones regulares para validaciones
  const validacionInputLetras = /^[\wáéíóúÁÉÍÓÚñÑ!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~\s]{3,25}$/;
  const validacionInputPrecio = /^(?!0\d)(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
  const validacionInputStock = /^[1-9]\d*$/;
  const validacionInputEdad = /^(1[89]|[2-9]\d|1[0-4]\d|150)$/;
  const validacionInputMarca = /^(?!\s*$).{1,100}$/;
  const validacionInputDescCorta = /^[^\s][\s\S]{10,25}$/;
  const validacionInputDescLarga = /^[^\s][\s\S]{15,30}$/;
  const validacionInputURL = /^(ftp|http|https):\/\/[^ "]+$/;


  const validarNombre = (value) => {
    if (!validacionInputLetras.test(value)) {
      setNombreError('El formato es inválido.');
      return false;
    } else {
      setNombreError('');
      return true;
    }
  };

  const validarPrecio = (value) => {
    if (!validacionInputPrecio.test(value)) {
      setPrecioError('El formato es inválido.');
      return false;
    } else {
      setPrecioError('');
      return true;
    }
  };

  const validarStock = (value) => {
    if (!validacionInputStock.test(value)) {
      setStockError('Debe ser un número entero positivo.');
      return false;
    } else {
      setStockError('');
      return true;
    }
  };

  const validarMarca = (value) => {
    if (!validacionInputMarca.test(value)) {
      setMarcaError('Formato inválido.');
      return false;
    } else {
      setMarcaError('');
      return true;
    }
  };

  const validarCategoria = (value) => {
    if (value === '') {
      setCategoriaError('Debe seleccionar una categoría*');
      return false;
    } else {
      setCategoriaError('');
      return true;
    }
  };

  const validarDescCorta = (value) => {
    if (!validacionInputDescCorta.test(value)) {
      setDescCortaError('Debe contener entre 10 y 25 caracteres.');
      return false;
    } else {
      setDescCortaError('');
      return true;
    }
  };

  const validarDescLarga = (value) => {
    if (!validacionInputDescLarga.test(value)) {
      setDescLargaError('Debe contener entre 15 y 30 caracteres.');
      return false;
    } else {
      setDescLargaError('');
      return true;
    }
  };

  const validarEdadDesde = (value) => {
    if (!validacionInputEdad.test(value)) {
      setEdadDesdeError('Debe ser mayor de 18 años.');
      return false;
    } else {
      setEdadDesdeError('');
      return true;
    }
  };

  const validarEdadHasta = (value) => {
    if (!validacionInputEdad.test(value) || Number(value) < Number(edadDesde)) {
      setEdadHastaError(`La edad debe estar entre ${edadDesde} y 150 años.`);
      return false;
    } else {
      setEdadHastaError('');
      return true;
    }
  };

  const validarFoto = (value) => {
    if (!validacionInputURL.test(value)) {
      setFotoError('Debe ingresar una URL válida.');
      return false;
    } else {
      setFotoError('');
      return true;
    }
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    validarNombre(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
    validarPrecio(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    validarStock(e.target.value);
  };

  const handleMarcaChange = (e) => {
    setMarca(e.target.value);
    validarMarca(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
    validarCategoria(e.target.value);
  };

  const handleDescCortaChange = (e) => {
    setDescCorta(e.target.value);
    validarDescCorta(e.target.value);
  };

  const handleDescLargaChange = (e) => {
    setDescLarga(e.target.value);
    validarDescLarga(e.target.value);
  };

  const handleEnvioChange = (e) => {
    setEnvio(e.target.checked);
  };

  const handleEdadDesdeChange = (e) => {
    setEdadDesde(e.target.value);
    validarEdadDesde(e.target.value);
    if (edadHasta) {
      validarEdadHasta(edadHasta);
    }
  };

  const handleEdadHastaChange = (e) => {
    setEdadHasta(e.target.value);
    validarEdadHasta(e.target.value);
  };

  const handleFotoChange = (e) => {
    setFoto(e.target.value);
    validarFoto(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Validar todos los campos
    if (!validarNombre(nombre)) formIsValid = false;
    if (!validarPrecio(precio)) formIsValid = false;
    if (!validarStock(stock)) formIsValid = false;
    if (!validarMarca(marca)) formIsValid = false;
    if (!validarCategoria(categoria)) formIsValid = false;
    if (!validarDescCorta(descCorta)) formIsValid = false;
    if (!validarDescLarga(descLarga)) formIsValid = false;
    if (!validarEdadDesde(edadDesde)) formIsValid = false;
    if (!validarEdadHasta(edadHasta)) formIsValid = false;
    if (!validarFoto(foto)) formIsValid = false;

    if (formIsValid) {
      const nuevoProducto = {
        nombre: nombre,
        precio: parseFloat(precio),
        stock: stock,
        marca: marca,
        categoria: categoria,
        descCorta: descCorta,
        descLarga: descLarga,
        envio: envio ? 'Envío sin cargo' : 'Envío con cargo',
        edadDesde: edadDesde,
        edadHasta: edadHasta,
        foto: foto,
      };

      try {
        setIsLoading(true); // Iniciar estado de carga
        setApiError(''); 

        // Llamar a la API para guardar el producto
        await servicioProductos.guardar(nuevoProducto);



        navigate('/');


      } catch (error) {
        console.error('Error al guardar el producto:', error);
        setApiError('Hubo un error al guardar el producto. Por favor, intenta nuevamente.');
      } finally {
        setIsLoading(false); // Finalizar carga
      }
    }
  };

  return (
    <main className='formularios'>
      <section className="form-section">
        <div>
          <h2>Alta de Producto</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              autoComplete="off"
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleNombreChange}
            />
            {nombreError && <div style={{ color: 'red' }}>{nombreError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio:</label>
            <input
              placeholder="Ingresá un formato válido xxx.xxx,xx"
              autoComplete="off"
              type="text"
              id="precio"
              name="precio"
              value={precio}
              onChange={handlePrecioChange}
            />
            {precioError && <div style={{ color: 'red' }}>{precioError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={handleStockChange}
            />
            {stockError && <div style={{ color: 'red' }}>{stockError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="marca">Marca:</label>
            <input
              autoComplete="off"
              type="text"
              id="marca"
              name="marca"
              value={marca}
              onChange={handleMarcaChange}
            />
            {marcaError && <div style={{ color: 'red' }}>{marcaError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
            >
              <option value="">Seleccioná una categoría</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Ropa y accesorios">Ropa y accesorios</option>
              <option value="Hogar y decoración">Hogar y decoración</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Calzado">Calzado</option>
            </select>
            {categoriaError && (
              <div style={{ color: 'red' }}>{categoriaError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="descCorta">Descripción corta:</label>
            <textarea
              id="descCorta"
              name="descCorta"
              value={descCorta}
              onChange={handleDescCortaChange}
            ></textarea>
            {descCortaError && (
              <div style={{ color: 'red' }}>{descCortaError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="descLarga">Descripción larga:</label>
            <textarea
              id="descLarga"
              name="descLarga"
              value={descLarga}
              onChange={handleDescLargaChange}
            ></textarea>
            {descLargaError && (
              <div style={{ color: 'red' }}>{descLargaError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="envio">Envío sin cargo:</label>
            <input
              type="checkbox"
              id="envio"
              name="envio"
              checked={envio}
              onChange={handleEnvioChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edadDesde">Edad desde:</label>
            <input
              type="number"
              id="edadDesde"
              name="edadDesde"
              value={edadDesde}
              onChange={handleEdadDesdeChange}
            />
            {edadDesdeError && (
              <div style={{ color: 'red' }}>{edadDesdeError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edadHasta">Edad hasta:</label>
            <input
              type="number"
              id="edadHasta"
              name="edadHasta"
              value={edadHasta}
              onChange={handleEdadHastaChange}
            />
            {edadHastaError && (
              <div style={{ color: 'red' }}>{edadHastaError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="foto">Imagen del producto:</label>
            <input
              autoComplete="off"
              placeholder="Ingresá la url de la imagen"
              type="url"
              id="foto"
              name="foto"
              accept="image/*"
              value={foto}
              onChange={handleFotoChange}
            />
            {fotoError && <div style={{ color: 'red' }}>{fotoError}</div>}
          </div>
          {apiError && <div style={{ color: 'red', marginBottom: '10px' }}>{apiError}</div>}

          {/* Carga */}
          {isLoading && <div>Guardando producto...</div>}

          {/* Boton de Envío */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Agregar Producto'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Alta;
