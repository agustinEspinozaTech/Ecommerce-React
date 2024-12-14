import React, { useState } from "react";
import "../styles/formularios.css";

const Contacto = () => {
  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comentarios: "",
  });

  // Estado para los mensajes de error
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    comentarios: "",
  });

  // Expresiones regulares para validaciones
  const validaciones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,25}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    comentarios: /^.{3,30}$/,
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validación en tiempo real
    validateField(name, value);
  };

  // Validar un campo
  const validateField = (name, value) => {
    const isValid = validaciones[name].test(value);

    // Actualizar estado de errores
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid ? "" : `Formato inválido para ${name}`,
    }));

    // Aplicar estilos dinámicos
    const inputElement = document.querySelector(`[name="${name}"]`);
    if (inputElement) {

      inputElement.style.borderColor = isValid ? "" : "red";
    }
  };

  // Validar todo el formulario
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    for (const field in formData) {
      const isValid = validaciones[field].test(formData[field]);
      newErrors[field] = isValid ? "" : `Formato inválido para ${field}`;
      if (!isValid) formIsValid = false;

      // Aplicar estilos dinámicos
      const inputElement = document.querySelector(`[name="${field}"]`);
      if (inputElement) {
        inputElement.style.borderColor = isValid ? "" : "red";
      }
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Formulario enviado correctamente.");
      setFormData({
        nombre: "",
        email: "",
        comentarios: "",
      });
    }
  };

  return (
    <main className="formularios">
      <section className="form-section">
        <div>
          <h2>Formulario de Contacto</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.nombre && <div style={{ color: "red" }}>{errors.nombre}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo@gmail.com"
              autoComplete="off"
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="comentarios">Comentarios:</label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
            />
            {errors.comentarios && (
              <div style={{ color: "red" }}>{errors.comentarios}</div>
            )}
          </div>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
};

export default Contacto;
