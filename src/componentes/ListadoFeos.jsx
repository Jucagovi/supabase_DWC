import React, { Fragment } from "react";
import useFeos from "../hooks/useFeos.js";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";

const ListadoFeos = () => {
  const { listadoFeos, situacion, obtenerFeo } = useFeos();
  return (
    <Fragment>
      <div
        id='act-listado'
        /**
         * Aquí se utiliza la delegación de eventos.
         * Se coloca el evento en el contenedor para evitar repetirlo.
         * La función pasará el "id" de cada lista a la función "obtenerFeo"
         * para que actualice el estado "feo" y se pasen los datos
         * al formulario.
         */
        onClick={(e) => {
          if (e.target.classList.contains("feo")) obtenerFeo(e.target.id);
        }}
      >
        <h3>Listado feos.</h3>
        {listadoFeos.length
          ? listadoFeos.map((valor, indice, array) => {
              return <ListadoFeoSencillo key={valor.id} datos={valor} />;
            })
          : situacion}
      </div>
    </Fragment>
  );
};

export default ListadoFeos;
