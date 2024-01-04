import React, { Fragment, useState, useEffect } from "react";
import { supabaseConexion } from "../config/supabase.js";
import "./ListadoFeosSencillo.css";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";

const ListadoFeosSencillo = () => {
  const arrayInicial = [];
  const cadenaCargando = "No hay datos.";

  const [listadoFeos, setListadoFeos] = useState(arrayInicial);
  const [situacion, setSituacion] = useState(cadenaCargando);

  /**
   * Función para obtener el listado de "feos"
   * usando la conexión al servicio supabase.
   */
  const obtenerListadoSencillo = async () => {
    /**
     * Se crea la consulta con el método "from()" del objeto
     * "supabaseConexion". Es una promesa, por lo que siempre
     * devuelve algo, en esta ocasión es un objeto cuyo
     * contenido dependerá del método utilizado.
     */
    try {
      // Se realiza la consulta.
      const respuesta = await supabaseConexion.from("Feos").select("*");
      // Se espera a su respuesta (se imprime el objeto para ver su contenido).
      console.log(respuesta);
      // Si todo ha ido bien, se actualiza el estado.
      setListadoFeos(respuesta.data);
    } catch (fallo) {
      // Si se ha producido algún fallo, cambio el estado de situación.
      setSituacion(fallo.message);
    }
  };

  /**
   * Al tratarse de una base de datos SQL es posible realizar consultas
   * mucho más complejas usando estas claúsulas:
   *  ->  .eq('columna', 'igual a')
   *  ->  .gt('columna', 'mayor quen')
   *  ->  .lt('columna', 'menor que')
   *  ->  .gte('columna', 'mayor o igual que')
   *  ->  .lte('columna', 'menor o igual que')
   *  ->  .like('columna', '%CaseSensitive%')
   *  ->  .ilike('columna', '%CaseInsensitive%')
   *  ->  .is('columna', null)
   *  ->  .in('columna', [array de valores'])
   *  ->  .neq('columna', 'no igual a')
   *
   *  Todas estas cláusulas se pueden anidar equivaliendo al operador
   *  lógico AND. Para usar el OR, mira en este enlace
   *  https://supabase.com/docs/reference/javascript/or.
   *
   */

  /**
   * Función para filtrar el listado de "feos"
   * usando el operador eq().
   */
  const filtrarFeos = async () => {
    try {
      // En esta ocasión deconstruyo el objeto "respuesta" directamente. Práctica recomendada.
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("*")
        .eq("country", "Burkina Faso");
      setListadoFeos(data);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  /**
   * Función para ordenar el listado de "feos"
   * usando la cláusula order.
   */
  const ordenarFeos = async (orden) => {
    try {
      // Es posible parametrizar las consultas con valores externos.
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("*")
        .order("name", { ascending: orden });
      setListadoFeos(data);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  useEffect(() => {
    /**
     * Si es necesario que los datos se muestren al cargar la aplicación
     * se debe colocar aquí con el array de dependencias vacío.
     */
    obtenerListadoSencillo();
  }, []);

  return (
    <Fragment>
      <div id='listadoSencillo'>
        <div className='lis-caja'>
          <h3>Listado de Feos.</h3>
          {listadoFeos.length
            ? listadoFeos.map((valor, indice, array) => {
                return <ListadoFeoSencillo key={valor.id} datos={valor} />;
              })
            : situacion}
        </div>
        <div className='lis-caja'>
          <button
            onClick={() => {
              obtenerListadoSencillo();
            }}
          >
            Cargar feos
          </button>
          <button
            onClick={() => {
              ordenarFeos(true);
            }}
          >
            Ordenar feos ascendentemente
          </button>
          <button
            onClick={() => {
              ordenarFeos(false);
            }}
          >
            Ordenar feos descendentemente
          </button>
          <button
            onClick={() => {
              filtrarFeos();
            }}
          >
            Filtrar feos de Burkina Faso
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ListadoFeosSencillo;
