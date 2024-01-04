import React, { Fragment, useState, useEffect } from "react";
import { supabaseConexion } from "../config/supabase.js";
import "./ListadoFeosSencillo.css";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";

const ListadoFeosSencillo = () => {
  const arrayInicial = [];
  const cadenaCargando = "No hay datos.";
  const cadenaInicial = "";

  const [listadoFeos, setListado] = useState(arrayInicial);
  const [situacion, setSituacion] = useState(cadenaCargando);
  const [filtro, setFiltro] = useState(cadenaInicial);

  /**
   * Función para obtener el listado de "feos"
   * usando la conexión al servicio supabase.
   */
  const obtenerListadoSencillo = async () => {
    try {
      const { data, error } = await supabaseConexion.from("Feos").select("*");
      setListado(data);
    } catch (fallo) {
      setSituacion(fallo.message);
    }
  };

  const filtrarFeos = async () => {
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("id, name")
        .eq("country", "Burkina Faso");
      setFeos(data);
    } catch (error) {
      throw error;
    } finally {
      setFeo("");
    }
  };

  const ordenarFeos = async (orden) => {
    try {
      const { data, error } = await supabaseConexion
        .from("Feos")
        .select("id, name")
        .order("name", { ascending: orden });
      setFeos(data);
    } catch (error) {
      throw error;
    } finally {
      setFeo("");
    }
  };

  useEffect(() => {
    /**
     * Si es necesario que los datos se muestren al cargar la aplicación
     * se debe colocar aquí con el array de dependencias vacío.
     */
    //obtenerListadoSencillo();
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
          <button>Cargar feos</button>
          <button>Ordenar feos ascendentemente</button>
          <button>Ordenar feos descendentemente</button>
          <div>
            <button>Filtrar feos</button> <input type='text' />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListadoFeosSencillo;
