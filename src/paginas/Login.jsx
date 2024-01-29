import React, { Fragment } from "react";
import "./Login.css";
import useUsuarios from "../hooks/useUsuarios.js";

const Login = () => {
  const { iniciarSesionMagicLink, actualizarDato, errorUsuario, crearCuenta } =
    useUsuarios();
  return (
    <Fragment>
      <div className='inicioSesion'>
        <div className='cuentaUsuario'>
          <h3>Iniciar sesión</h3>
          <label htmlFor='email'>Correo electrónico</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Su correo electrónico.'
            onChange={(e) => {
              actualizarDato(e);
            }}
          />
          <button
            className='botonSesion'
            onClick={(e) => {
              iniciarSesionMagicLink();
            }}
          >
            Iniciar sesión
          </button>
        </div>
        <div className='cuentaUsuario'>
          <h3>Crea una nueva cuenta</h3>
          <label htmlFor='email'>Correo electrónico</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Su correo electrónico.'
            onChange={(e) => {
              actualizarDato(e);
            }}
          />
          <label htmlFor='password'>Contraseña</label>

          <input
            type='password'
            name='password'
            id='password'
            placeholder='Su correo electrónico.'
            onChange={(e) => {
              actualizarDato(e);
            }}
          />
          <button
            className='botonSesion'
            onClick={(e) => {
              crearCuenta();
            }}
          >
            Crear cuenta
          </button>
        </div>
      </div>
      <div className='errorLogin'>{errorUsuario}</div>
    </Fragment>
  );
};

export default Login;
