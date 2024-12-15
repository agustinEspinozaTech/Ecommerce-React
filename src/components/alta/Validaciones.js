class Validaciones {
    static validacionInputLetras = /^[\wáéíóúÁÉÍÓÚñÑ!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~\s]{3,25}$/;
    static validacionInputPrecio = /^(?!0\d)(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
    static validacionInputStock = /^[1-9]\d*$/;
    static validacionInputEdad = /^(1[89]|[2-9]\d|1[0-4]\d|150)$/;
    static validacionInputMarca = /^(?!\s*$).{1,100}$/;
    static validacionInputDescCorta = /^[^\s][\s\S]{10,25}$/;
    static validacionInputDescLarga = /^[^\s][\s\S]{15,30}$/;
    static validacionInputURL = /^(ftp|http|https):\/\/[^ "]+$/;
  
    static validarNombre(value, setError) {
      if (!this.validacionInputLetras.test(value)) {
        setError('El formato es inválido.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarPrecio(value, setError) {
      if (!this.validacionInputPrecio.test(value)) {
        setError('El formato es inválido.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarStock(value, setError) {
      if (!this.validacionInputStock.test(value)) {
        setError('Debe ser un número entero positivo.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarMarca(value, setError) {
      if (!this.validacionInputMarca.test(value)) {
        setError('Formato inválido.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarCategoria(value, setError) {
      if (value === '') {
        setError('Debe seleccionar una categoría*');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarDescCorta(value, setError) {
      if (!this.validacionInputDescCorta.test(value)) {
        setError('Debe contener entre 10 y 25 caracteres.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarDescLarga(value, setError) {
      if (!this.validacionInputDescLarga.test(value)) {
        setError('Debe contener entre 15 y 30 caracteres.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarEdadDesde(value, setError) {
      if (!this.validacionInputEdad.test(value)) {
        setError('Debe ser mayor de 18 años.');
        return false;
      }
      setError('');
      return true;
    }
  
    static validarEdadHasta(value, setError, edadDesde) {
      if (!this.validacionInputEdad.test(value) || Number(value) < Number(edadDesde)) {
        setError(`La edad debe estar entre ${edadDesde} y 150 años.`);
        return false;
      }
      return !this.validacionInputEdad.test(value) || Number(value) < Number(edadDesde)
    ? (setError(`La edad debe estar entre ${edadDesde} y 150 años.`), false)
    : (setError(''), true);
    }
  
    static validarFoto(value, setError) {
      if (!this.validacionInputURL.test(value)) {
        setError('Debe ingresar una URL válida.');
        return false;
      }
      setError('');
      return true;
    }
  }
  
  export default Validaciones;
  