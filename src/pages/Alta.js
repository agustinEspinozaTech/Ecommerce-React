import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/formularios.css";
import servicioProductos from '../components/servicios/Productos';
import InputField from '../components/alta/InputField';
import SelectField from '../components/alta/SelectField';
import TextAreaField from '../components/alta/TextAreaField';
import CheckboxField from '../components/alta/CheckboxField';
import NumberField from '../components/alta/NumberField';
import UrlField from '../components/alta/UrlField';
import SubmiButton from '../components/alta/SubmiButton';

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
          <InputField
            id="nombre"
            label="Nombre"
            value={nombre}
            onChange={handleNombreChange}
            error={nombreError}
          />


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

          <SelectField
            id="categoria"
            label="Categoría"
            value={categoria}
            onChange={handleCategoriaChange}
            options={['Tecnología', 'Ropa y accesorios', 'Hogar y decoración', 'Juguetes', 'Calzado']}
            error={categoriaError}
          />
          <TextAreaField
            id="descCorta"
            label="Descripción corta"
            value={descCorta}
            onChange={handleDescCortaChange}
            error={descCortaError}
          />
          <TextAreaField
            id="descLarga"
            label="Descripción larga"
            value={descLarga}
            onChange={handleDescLargaChange}
            error={descLargaError}
          />
          <CheckboxField
            id="envio"
            label="Envío sin cargo"
            checked={envio}
            onChange={handleEnvioChange}
          />
          <NumberField
            id="edadDesde"
            label="Edad desde"
            value={edadDesde}
            onChange={handleEdadDesdeChange}
            error={edadDesdeError}
            min={18}
            max={150}
          />
          <NumberField
            id="edadHasta"
            label="Edad hasta"
            value={edadHasta}
            onChange={handleEdadHastaChange}
            error={edadHastaError}
            min={18}
            max={150}
          />
          <UrlField
            id="foto"
            label="Imagen del producto"
            value={foto}
            onChange={handleFotoChange}
            error={fotoError}
            placeholder="Ingresá la url de la imagen"
          />
          <SubmiButton isLoading={isLoading} label="Agregar Producto" />

        </form>
      </section>
    </main>
  );
}

export default Alta;
