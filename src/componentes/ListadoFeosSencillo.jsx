import React, { Fragment } from "react";
import ListadoFeoSencillo from "./ListadoFeoSencillo.jsx";
import useFeos from "../hooks/useFeos.js";

const ListadoFeosSencillo = () => {
  const { listadoFeos, situacion } = useFeos();

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
