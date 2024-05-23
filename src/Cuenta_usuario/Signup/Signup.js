import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ValidationSign from "./SignupValidation";
import axios from "axios";
import "../Styles/Cuenta.css";

function Signup() {
  const [values, setValues] = useState({
    documento: "",
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    confirmarEmail: "",
    password: "",
    confirmarPassword: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formularioLoginVisible, setFormularioLoginVisible] = useState(true);
  const [formularioRegisterVisible, setFormularioRegisterVisible] = useState(false);
  const [contenedorLeft, setContenedorLeft] = useState("0px");
  const [cajaTraseraRegisterVisible, setCajaTraseraRegisterVisible] = useState(true);
  const [cajaTraseraLoginVisible, setCajaTraseraLoginVisible] = useState(true);
  const [cajaTraseraRegisterOpacity, setCajaTraseraRegisterOpacity] = useState(1);
  const [cajaTraseraLoginOpacity, setCajaTraseraLoginOpacity] = useState(1);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = ValidationSign(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/shopping");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = values;
  
    // Verificar si las credenciales son del administrador
    if (email === "admin@example.com" && password === "admin123") {
      // Redirigir al área de administrador
      navigate("/admin");
    } else {
      // Lógica para el inicio de sesión de usuarios normales
      axios
        .post("http://localhost:8081/login", { email, password })
        .then((res) => {
          navigate("/shopping");
        })
        .catch((err) => {
          console.log(err);
          setErrors({ login: "Credenciales inválidas" });
        });
    }
  };
  

  const iniciarSesion = () => {
    if (window.innerWidth > 850) {
      setFormularioLoginVisible(true);
      setContenedorLeft("10px");
      setFormularioRegisterVisible(false);
      setCajaTraseraRegisterOpacity(1);
      setCajaTraseraLoginOpacity(0);
    } else {
      setFormularioLoginVisible(true);
      setContenedorLeft("0px");
      setFormularioRegisterVisible(false);
      setCajaTraseraRegisterVisible(true);
      setCajaTraseraLoginVisible(false);
    }
  };

  const register = () => {
    if (window.innerWidth > 850) {
      setFormularioRegisterVisible(true);
      setContenedorLeft("410px");
      setFormularioLoginVisible(false);
      setCajaTraseraRegisterOpacity(0);
      setCajaTraseraLoginOpacity(1);
    } else {
      setFormularioRegisterVisible(true);
      setContenedorLeft("0px");
      setFormularioLoginVisible(false);
      setCajaTraseraRegisterVisible(false);
      setCajaTraseraLoginVisible(true);
    }
  };

  const anchoPage = () => {
    if (window.innerWidth > 850) {
      setCajaTraseraRegisterVisible(true);
      setCajaTraseraLoginVisible(true);
    } else {
      setCajaTraseraRegisterVisible(true);
      setCajaTraseraRegisterOpacity(1);
      setCajaTraseraLoginVisible(false);
      setFormularioLoginVisible(true);
      setContenedorLeft("0px");
      setFormularioRegisterVisible(false);
    }
  };

  useEffect(() => {
    anchoPage();
    window.addEventListener("resize", anchoPage);
    return () => {
      window.removeEventListener("resize", anchoPage);
    };
  }, []);

  return (
    <main className="main-container">
      <div className="contenedor__todo">
        <div
          className="caja__trasera"
          style={{
            display: cajaTraseraRegisterVisible || cajaTraseraLoginVisible ? "flex" : "none",
          }}
        >
          <div
            className="caja__trasera-login"
            style={{
              display: cajaTraseraLoginVisible ? "block" : "none",
              opacity: cajaTraseraLoginOpacity,
            }}
          >
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button onClick={iniciarSesion} id="btn__iniciar-sesion">
              Iniciar Sesión
            </button>
          </div>
          <div
            className="caja__trasera-register"
            style={{
              display: cajaTraseraRegisterVisible ? "block" : "none",
              opacity: cajaTraseraRegisterOpacity,
            }}
          >
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button onClick={register} id="btn__registrarse">
              Registrarse
            </button>
          </div>
        </div>

        <div
          className="contenedor__login-register"
          style={{ left: contenedorLeft }}
        >
          <form
            className="formulario__login"
            style={{ display: formularioLoginVisible ? "block" : "none" }}
            onSubmit={handleLogin}
          >
            <h2>Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Correo Electrónico *"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="controls"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
            <input
              type="password"
              placeholder="Contraseña *"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="controls"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
            {errors.login && <span className="text-danger">{errors.login}</span>}
            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>

          <form
            className="formulario__register"
            style={{ display: formularioRegisterVisible ? "block" : "none" }}
            onSubmit={handleSubmit}
          >
            <h2>Registrarse</h2>
            <div className="form-row">
              <input
                type="text"
                placeholder="Documento *"
                name="documento"
                value={values.documento}
                onChange={handleInput}
                className="controls"
              />
              <input
                type="text"
                placeholder="Nombre *"
                name="nombre"
                value={values.nombre}
                onChange={handleInput}
                className="controls"
              />
            </div>
            {errors.documento && <span className="text-danger">{errors.documento}</span>}
            {errors.nombre && <span className="text-danger">{errors.nombre}</span>}
            <div className="form-row">
              <input
                type="text"
                placeholder="Primer Apellido *"
                name="primerApellido"
                value={values.primerApellido}
                onChange={handleInput}
                className="controls"
              />
              <input
                type="text"
                placeholder="Segundo Apellido (opcional)"
                name="segundoApellido"
                value={values.segundoApellido}
                onChange={handleInput}
                className="controls"
              />
            </div>
            {errors.primerApellido && <span className="text-danger">{errors.primerApellido}</span>}
            <div className="form-row">
              <input
                type="text"
                placeholder="Correo *"
                name="email"
                value={values.email}
                onChange={handleInput}
                className="controls"
              />
              <input
                type="text"
                placeholder="Confirmar Correo *"
                name="confirmarEmail"
                value={values.confirmarEmail}
                onChange={handleInput}
                className="controls"
              />
            </div>
            {errors.email && <span className="text-danger">{errors.email}</span>}
            {errors.confirmarEmail && <span className="text-danger">{errors.confirmarEmail}</span>}
            <div className="form-row">
              <input
                type="password"
                placeholder="Contraseña *"
                name="password"
                value={values.password}
                onChange={handleInput}
                className="controls"
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña *"
                name="confirmarPassword"
                value={values.confirmarPassword}
                onChange={handleInput}
                className="controls"
              />
            </div>
            {errors.password && <span className="text-danger">{errors.password}</span>}
            {errors.confirmarPassword && (
              <span className="text-danger">{errors.confirmarPassword}</span>
            )}
            <button type="submit" className="login-button">
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Signup;
