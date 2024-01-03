import React, { Fragment, useState } from "react";
import { supabaseConexion } from "../config/supabase.js";
import ValorObjeto from "../componentes/desarrollo/ValorObjeto.jsx";

function CreadoFeo() {
  /**
   * Valores iniciales es un objeto con claves coincidentes
   * a las columnas de la tabla en donde se pretenden insertar los datos.
   * */
  const valoresInicialesFeo = {
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
  };
  const cadenaInicial = "";

  const [feo, setFeo] = useState(valoresInicialesFeo);
  const [error, setError] = useState(cadenaInicial);

  const actualizarDato = (evento) => {
    // Se deconstruye el objeto evento.target para obtener las propiedades name y value.
    const { name, value } = evento.target;
    /**
     * Se modifica el estado haciendo una copia
     * (...feo) y modificando por el valor del input.
     * Para ello se le pasa el nombre del input.
     * */
    setFeo({ ...feo, [name]: value });
    // Para expandir la variable "name" se utilizan los corchetes.
  };

  const crearFeo = async () => {
    // Se intenta insertar los datos.
    try {
      const respuesta = await supabaseConexion.from("Feos").insert(feo);
      /**
       * El insert devuelve el resultado de la operación en un objeto.
       * Se puede utilizar su objeto "error" para la gestión de errores
       * de forma manual, pero ya se dispone de try-catch.
       * */
      console.log(respuesta);
      // Si todo ha ido bien, se borra el formulario controlado.
      setFeo(valoresInicialesFeo);
    } catch (error) {
      setError(error.message);
    }
  };

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
        <div
        /**
         * Para simplificar la gestión del objeto es necesario que
         * el nombre de los inputs coincida con el nombre
         * de la columna de la tabla a la que va el dato.
         * */
        >
          <p>
            <label htmlFor='name'>Nombre: </label>
            <input
              type='text'
              name='name'
              /**
               * Cuando se use el estado para los valores de un formulario,
               * no deben ser "undefined", por eso se utiliza "valoresInciales".
               * Además, para que nunca contenga ese valor, se utiliza el operador
               * lógico "or" (de forma reducida).
               * */
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
              /**
               * El evento onChange repite la misma función "actualizarDato(e)",
               * en cada input del formulario: ¿se debe usar delegación de eventos?
               */
              onChange={(e) => {
                actualizarDato(e);
              }}
            />
          </p>
          <p>
            <button
              onClick={(e) => {
                /**
                 * Cuando se pulse el botón se insertan los datos en Supabase.
                 * Huelga decir que antes deben ser comprobados.
                 */
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
