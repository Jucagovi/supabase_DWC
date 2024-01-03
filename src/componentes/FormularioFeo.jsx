import React, { Fragment } from "react";
import useFeos from "../hooks/useFeos.js";
import ValorObjeto from "./desarrollo/ValorObjeto.jsx";

const FormularioFeo = () => {
  const { feo, error, actualizarDato, actualizarFeo } = useFeos();

  return (
    <Fragment>
      <div id='act-formulario'>
        <h3>Formulario feo.</h3>
        {error ? (
          error
        ) : (
          <div>
            <p>
              <label htmlFor='name'>Nombre: </label>
              <input
                type='text'
                name='name'
                value={feo.name || ""}
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
            </p>
            <p>
              <label htmlFor='phone'>Teléfono: </label>
              <input
                type='text'
                name='phone'
                value={feo.phone || ""}
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
            </p>
            <p>
              <label htmlFor='email'>Correo electrónico: </label>
              <input
                type='text'
                name='email'
                value={feo.email || ""}
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
            </p>
            <p>
              <label htmlFor='address'>Dirección:</label>
              <input
                type='text'
                name='address'
                value={feo.address || ""}
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
            </p>
            <p>
              <label htmlFor='country'>País: </label>
              <input
                type='text'
                name='country'
                value={feo.country || ""}
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
            </p>
            <p>
              <button
                onClick={(e) => {
                  actualizarFeo(e);
                }}
              >
                Actualizar Feo
              </button>
            </p>
          </div>
        )}
        <ValorObjeto objeto={feo} />
      </div>
    </Fragment>
  );
};

export default FormularioFeo;
