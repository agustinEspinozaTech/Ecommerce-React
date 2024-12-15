import React from 'react';
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
import UseAltaForm from '../components/alta/UseAltaForm';
import Validaciones from '../components/alta/Validaciones';
import TablaProductos from '../components/alta/TablaProductos';


function Alta() {
  const {
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
    setApiError, isLoading, setIsLoading,
  } = UseAltaForm();

  const navigate = useNavigate();
  

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    Validaciones.validarNombre(e.target.value, setNombreError);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
    Validaciones.validarPrecio(e.target.value, setPrecioError);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    Validaciones.validarStock(e.target.value, setStockError);
  };

  const handleMarcaChange = (e) => {
    setMarca(e.target.value);
    Validaciones.validarMarca(e.target.value, setMarcaError);
  };
  const handleEnvioChange = (e) => {
    setEnvio(e.target.checked);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
    Validaciones.validarCategoria(e.target.value, setCategoriaError);
  };

  const handleDescCortaChange = (e) => {
    setDescCorta(e.target.value);
    Validaciones.validarDescCorta(e.target.value, setDescCortaError);
  };

  const handleDescLargaChange = (e) => {
    setDescLarga(e.target.value);
    Validaciones.validarDescLarga(e.target.value, setDescLargaError);
  };

  const handleEdadDesdeChange = (e) => {
    setEdadDesde(e.target.value);
    Validaciones.validarEdadDesde(e.target.value, setEdadDesdeError);
    if (edadHasta) {
      Validaciones.validarEdadHasta(edadHasta, setEdadHastaError, e.target.value);
    }
  };

  const handleEdadHastaChange = (e) => {
    setEdadHasta(e.target.value);
    Validaciones.validarEdadHasta(e.target.value, setEdadHastaError, edadDesde);
  };

  const handleFotoChange = (e) => {
    setFoto(e.target.value);
    Validaciones.validarFoto(e.target.value, setFotoError);
  };


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Validar todos los campos
    if (!Validaciones.validarNombre(nombre, setNombreError)) formIsValid = false;
    if (!Validaciones.validarPrecio(precio, setPrecioError)) formIsValid = false;
    if (!Validaciones.validarStock(stock, setStockError)) formIsValid = false;
    if (!Validaciones.validarMarca(marca, setMarcaError)) formIsValid = false;
    if (!Validaciones.validarCategoria(categoria, setCategoriaError)) formIsValid = false;
    if (!Validaciones.validarDescCorta(descCorta, setDescCortaError)) formIsValid = false;
    if (!Validaciones.validarDescLarga(descLarga, setDescLargaError)) formIsValid = false;
    if (!Validaciones.validarEdadDesde(edadDesde, setEdadDesdeError)) formIsValid = false;
    if (!Validaciones.validarEdadHasta(edadHasta, setEdadHastaError, edadDesde)) formIsValid = false;
    if (!Validaciones.validarFoto(foto, setFotoError)) formIsValid = false;
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

        // Llamar a la API para guardar el producto
        await servicioProductos.guardar(nuevoProducto);

        setProductos((prevProductos) => [...prevProductos, nuevoProducto]);

        navigate('/');


      } catch (error) {
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
      <TablaProductos productos={productos} />
    </main>
  );
}

export default Alta;
