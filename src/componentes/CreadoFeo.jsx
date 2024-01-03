import React, { Fragment } from "react";
import ValorObjeto from "../componentes/desarrollo/ValorObjeto.jsx";
import useFeos from "../hooks/useFeos.js";

function CreadoFeo() {
  const { feo, error, actualizarDato, crearFeo } = useFeos();

  /**
   * NOTA: inserción múltiple *****************************
   * Cuando sea necesario la inserción de varias filas a la vez,
   * tan sólo será necesario pasarle un array con objetos del
   * tipo "feo":
   * const { data, error } = await supabase.from('Feos')
   *                                    .insert([
   *                                        { Feo1 },
   *                                        { Feo2 },
   *                                        { Feo3 }
   *                                       ]);
   */

  return (
    <Fragment>
      <h2>Guardar un feo.</h2>
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
                crearFeo(e);
              }}
            >
              Guardar Feo
            </button>
          </p>
        </div>
      )}

      <ValorObjeto objeto={feo} />
    </Fragment>
  );
}

export default CreadoFeo;
