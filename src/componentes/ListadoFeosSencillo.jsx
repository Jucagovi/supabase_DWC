import React, { Fragment, useState, useEffect } from "react";
import { supabaseConexion } from "../config/supabase.js";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";

const ListadoFeosSencillo = () => {
  const arrayInicial = [];
  const cadenaCargando = "Cargando datos...";

  const [listadoFeos, setListado] = useState(arrayInicial);
  const [situacion, setSituacion] = useState(cadenaCargando);

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

  useEffect(() => {
    obtenerListadoSencillo();
  }, []);

  return (
    <Fragment>
      <h3>Listado de Feos.</h3>
      <div id='listado'>
        {listadoFeos.length
          ? listadoFeos.map((valor, indice, array) => {
              return <ListadoFeoSencillo key={valor.id} datos={valor} />;
            })
          : situacion}
      </div>
    </Fragment>
  );
};

export default ListadoFeosSencillo;
